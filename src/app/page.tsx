"use client";
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from "convex/react";
import { api } from '../../convex/_generated/api';
import { useOrganization } from '@clerk/nextjs';

export default function Home() {
  const createFile = useMutation(api.files.createFile); 
  const { organization } = useOrganization();
  const getFiles = useQuery(api.files.getFiles, organization?.id ? { orgId: organization.id } : 'skip');
  
  
    return (
        <div className='flex flex-col items-center'>
            <Button onClick={() => {
              if (!organization) return;
              createFile({
                name: "hello world 2",
                orgId: organization.id,
              })
            }}>Create File</Button>
            <div>
              {getFiles?.map((file) => {return <p key={file._id}>{file.name}</p>})}
            </div>
        </div>
    );
}
