'use client';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useOrganization, useUser } from '@clerk/nextjs';
// import { FunctionReference } from 'convex/server';
import CreateFileModal from '@/components/createFileModal';
import { FileCard } from '@/components/fileCard';


export default function Home() {
    // const createFile = useMutation(api.files.createFile);
    const organization = useOrganization();
    const user = useUser();
    let orgId: string | undefined = undefined;

    // if user is logged in, get orgId from user or their organization
    if (organization.isLoaded && user.isLoaded) {
        orgId = organization.organization?.id ?? user.user?.id;
    }

    const getFiles = useQuery(api.files.getFiles, orgId ? { orgId } : 'skip');

    return (
        <main className='flex mx-4 justify-between mt-4'>
            <div>
                <h1 className='text-4xl font-bold'>Your Files</h1>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4'>
                    {getFiles?.map((file) => {
                        return (
                            <FileCard file={file} key={file._id} />
                        )
                    })}
                </div>
            </div>
            <div>
              {CreateFileModal(orgId)}
            </div>
        </main>
    );
}
