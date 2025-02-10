'use client';
import CreateFileModal from './createFileModal';
import SearchBar from '@/app/dashboard/_components/search-bar';
import { FileCard } from '@/app/dashboard/_components/file-card';
import imageFolder from '/public/imagefolder.svg';
import zeroSearchResults from '/public/searchEngines.svg';
import { LayoutGrid, List, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useOrganization, useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useState } from 'react';
import FileTable from './file-table';
import { columns } from './columns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function FileBrowser({
    title,
    favorites,
    trash,
}: {
    title: string;
    favorites?: boolean;
    trash?: boolean;
}) {
    const [query, setQuery] = useState('');
    // const [view, setView] = useState('cards');
    let orgId: string | undefined = undefined;
    // let orgId: string | undefined;
    // const createFile = useMutation(api.files.createFile);
    const organization = useOrganization();
    const user = useUser();

    // if user is logged in, get orgId from user or their organization
    if (organization.isLoaded && user.isLoaded) {
        orgId = organization.organization?.id ?? user.user?.id;
    }

    // Fetch files from the convex api depending on type of file requested (all files, favorite files, or files in trash)
    const getFiles = useQuery(
        api.files.getFiles,
        orgId ? { orgId, query, favorites, trash } : 'skip'
    );
    // const isLoading = getFiles === undefined;
    // console.log(query);
    // console.log(getFiles);

    return (
        <main className='w-full'>
            <div>
                <div className='flex flex-col justify-between'>
                    <div className='flex justify-between mb-2'>
                        <h1 className='text-4xl font-bold'>{title}</h1>
                        {/* <div>{CreateFileModal(orgId)}</div> */}
                        <SearchBar query={query} setQuery={setQuery} />
                        <div>
                            <CreateFileModal orgId={orgId} />
                        </div>
                    </div>
                    <Tabs defaultValue='grid'>
                        <TabsList className='mb-2 bg-myOffblack'>
                            <TabsTrigger value='grid'>
                                <LayoutGrid size={16} />
                            </TabsTrigger>
                            <TabsTrigger value='table'>
                                <List size={16} />
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value='grid'>
                            <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                                {getFiles?.map((file) => {
                                    return (
                                        <FileCard file={file} key={file._id} />
                                    );
                                })}
                            </div>
                        </TabsContent>
                        <TabsContent value='table'>
                            {getFiles && (
                                <FileTable columns={columns} files={getFiles} />
                            )}
                        </TabsContent>
                    </Tabs>
                    {query &&
                        getFiles?.length === 0 &&
                        noFilesFound(orgId, 'search')}
                    {/* </div> */}
                    {getFiles === undefined && (
                        <div className='flex flex-col items-center'>
                            {/* <div className='flex items-center'> */}
                            <Loader2 className='animate-spin h-32 w-32 text-black' />
                            {/* </div> */}
                        </div>
                    )}
                </div>
                {getFiles &&
                    !query &&
                    getFiles?.length === 0 &&
                    !favorites &&
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
