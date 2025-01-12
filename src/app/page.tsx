'use client';
import { ReactMutation, useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useOrganization, useUser } from '@clerk/nextjs';
import { FunctionReference } from 'convex/server';
import CreateFileBtn from '@/components/createFileModal';

export default function Home() {
    const createFile = useMutation(api.files.createFile);
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
                <h1 className='text-4xl font-bold'>Your files</h1>
                <div>
                    {getFiles?.map((file) => {
                        return <p key={file._id}>{file.name}</p>;
                    })}
                </div>
            </div>
            <div>
              {CreateFileBtn(createFile, orgId)}
                {/* <Button
                    className='mx-auto'
                    onClick={() => {
                        if (!orgId) return;
                        createFile({
                            name: 'hello world 2',
                            orgId,
                        });
                    }}
                >
                    Create File
                </Button> */}
            </div>
        </main>
    );
}
