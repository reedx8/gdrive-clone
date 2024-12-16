"use client";
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { useMutation, useQuery } from "convex/react";
import { api } from '../../convex/_generated/api';

export default function Home() {
  const createFile = useMutation(api.files.createFile); 
  const getFiles = useQuery(api.files.getFiles);
  
    return (
        <div className='flex flex-col items-center'>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <Button onClick={() => {
              createFile({
                name: "hello world 2",
              })
            }}>Create File</Button>
            <div>
              {getFiles?.map((file) => {return <p key={file._id}>{file.name}</p>})}
            </div>
        </div>
    );
}
