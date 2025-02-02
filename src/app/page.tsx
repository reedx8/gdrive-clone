'use client';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useOrganization, useUser } from '@clerk/nextjs';
// import { FunctionReference } from 'convex/server';
import CreateFileModal from '@/components/createFileModal';
import { FileCard } from '@/components/fileCard';
import imageFolder from '../../public/imagefolder.svg';
import zeroSearchResults from '/public/searchEngines.svg';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import SearchBar from '@/components/searchBar';
import { useState } from 'react';
import { get } from 'http';
import Sidebar from '@/components/sidebar';
{
    /* <Loader2 className='animate-spin h-5 w-5 text-white' /> */
}

export default function Home() {
    const [query, setQuery] = useState('');
    let orgId: string | undefined = undefined;
    // let orgId: string | undefined;
    // const createFile = useMutation(api.files.createFile);
    const organization = useOrganization();
    const user = useUser();

    // if user is logged in, get orgId from user or their organization
    if (organization.isLoaded && user.isLoaded) {
        orgId = organization.organization?.id ?? user.user?.id;
    }
    const getFiles = useQuery(
        api.files.getFiles,
        orgId ? { orgId, query } : 'skip'
    );
    // const isLoading = getFiles === undefined;
    // console.log(query);
    // console.log(getFiles);

    return (
        <main className='flex mx-4 mt-6'>
            <Sidebar />
            <div className='w-full'>
                {getFiles && (
                    <div className='flex flex-col justify-between'>
                        <div className='flex justify-between mb-2'>
                            <h1 className='text-4xl font-bold'>Your Files</h1>
                            {/* <div>{CreateFileModal(orgId)}</div> */}
                            <div>
                                <CreateFileModal orgId={orgId} />
                            </div>
                        </div>
                        <SearchBar query={query} setQuery={setQuery} />
                        {query &&
                            getFiles?.length === 0 &&
                            noFilesFound(orgId, 'search')}
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4'>
                            {getFiles?.map((file) => {
                                return <FileCard file={file} key={file._id} />;
                            })}
                        </div>
                    </div>
                )}
                {getFiles === undefined && (
                    <div className='flex flex-col items-center'>
                        {/* <div className='flex items-center'> */}
                        <Loader2 className='animate-spin h-32 w-32 text-black' />
                        {/* </div> */}
                    </div>
                )}
                {getFiles &&
                    !query &&
                    getFiles?.length === 0 &&
                    noFilesFound(orgId)}
            </div>
        </main>
    );
}

function noFilesFound(
    orgId: string | undefined,
    placeholderType: string = 'no files'
) {
    const imagePlaceholder =
        placeholderType === 'search' ? zeroSearchResults : imageFolder;
    const stringOutput =
        placeholderType === 'search'
            ? 'No files found'
            : 'No files found. Upload a file to get started.';
    return (
        <div>
            {/* <div className="flex justify-end">{CreateFileModal(orgId)}</div> */}
            <div className='flex flex-col justify-center align-middle mt-12'>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <Image
                        src={imagePlaceholder}
                        alt='image folder'
                        width={300}
                        height={300}
                    />
                    <p className='text-center text-gray-500 text-xl'>
                        {stringOutput}
                    </p>
                    {placeholderType === 'no files' && (
                        <div>
                            <CreateFileModal orgId={orgId} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
