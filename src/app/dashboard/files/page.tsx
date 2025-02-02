// 'use client';
// import CreateFileModal from '@/components/createFileModal';
// import SearchBar from '@/components/searchBar';
// import { FileCard } from '@/components/fileCard';
// import imageFolder from '/public/imagefolder.svg';
// import zeroSearchResults from '/public/searchEngines.svg';
// import { Loader2 } from 'lucide-react';
// import Image from 'next/image';
// import { useOrganization, useUser } from '@clerk/nextjs';
// import { useQuery } from 'convex/react';
// import { api } from '../../../../convex/_generated/api';
// import { useState } from 'react';
import FileBrowser from '../_components/file-browser';

export default function FilesPage() {
    // const [query, setQuery] = useState('');
    // let orgId: string | undefined = undefined;
    // // let orgId: string | undefined;
    // // const createFile = useMutation(api.files.createFile);
    // const organization = useOrganization();
    // const user = useUser();

    // // if user is logged in, get orgId from user or their organization
    // if (organization.isLoaded && user.isLoaded) {
    //     orgId = organization.organization?.id ?? user.user?.id;
    // }
    // const getFiles = useQuery(
    //     api.files.getFiles,
    //     orgId ? { orgId, query } : 'skip'
    // );
    // const isLoading = getFiles === undefined;
    // console.log(query);
    // console.log(getFiles);

    return (
        <main className='w-full'>
            <FileBrowser title='Your Files'/>
        </main>
    );
}

// function noFilesFound(
//     orgId: string | undefined,
//     placeholderType: string = 'no files'
// ) {
//     const imagePlaceholder =
//         placeholderType === 'search' ? zeroSearchResults : imageFolder;
//     const stringOutput =
//         placeholderType === 'search'
//             ? 'No files found'
//             : 'No files found. Upload a file to get started.';
//     return (
//         <div>
//             {/* <div className="flex justify-end">{CreateFileModal(orgId)}</div> */}
//             <div className='flex flex-col justify-center align-middle mt-12'>
//                 <div className='flex flex-col items-center justify-center gap-4'>
//                     <Image
//                         src={imagePlaceholder}
//                         alt='image folder'
//                         width={300}
//                         height={300}
//                     />
//                     <p className='text-center text-gray-500 text-xl'>
//                         {stringOutput}
//                     </p>
//                     {placeholderType === 'no files' && (
//                         <div>
//                             <CreateFileModal orgId={orgId} />
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
