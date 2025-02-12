import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Doc } from '../../../../convex/_generated/dataModel';
import { FileTextIcon, GanttChartIcon, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { ReactNode } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatRelative } from 'date-fns';
import { FileActions } from './file-actions';
import Image from 'next/image';
// import { restoreFile } from '../../../../convex/files';
// import Image from 'next/image';
// import { deleteFile } from '../../convex/files';

// TODO
// function getFileUrl(fileId: Id<"_storage">): string {
//     // const fileUrl = useQuery(api.files.getFileUrl, { fileId: fileId });
//     return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
// }

// Definine file is of type Doc<"files">
export function FileCard({
    file,
}: {
    file: Doc<'files'> ;
}) {
    const typeIcons = {
        image: <ImageIcon />,
        pdf: <FileTextIcon />,
        csv: <GanttChartIcon />,
    } as Record<Doc<'files'>['type'], ReactNode>;
    const userProfile = useQuery(api.users.getUserProfile, {
        userId: file.userId,
    });

    const downloadFile = async (file: Doc<'files'>) => {
        if (!file.url) return;

        const response = await fetch(file.url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Card>
            <CardHeader className='relative'>
                <CardTitle className='mr-2 flex items-center gap-2 text-base font-normal'>
                    <p>{typeIcons[file.type]}</p>
                    {file.name}
                    {/* <FileCardActions /> */}
                </CardTitle>
                <div className='absolute right-2 top-2'>
                    <FileActions file={file} />
                </div>
                <p className='text-xs text-neutral-500'>
                    Uploaded On:{' '}
                    {formatRelative(new Date(file._creationTime), new Date())}
                </p>
            </CardHeader>
            <CardContent className='h-[150px] flex items-center justify-center'>
                {/* {file.type === 'image' && (
                    // <Image src={getFileUrl(file.fileId)} alt={file.name} width={100} height={100} />
                    <Image src={fileUrl} alt={file.name} width={100} height={100} />
                )} */}
                {file.type === 'csv' && (
                    <GanttChartIcon className='w-16 h-16' />
                )}
                {file.type === 'pdf' && <FileTextIcon className='w-16 h-16' />}
                {file.type === 'image' && file.url && <Image src={file.url} alt={file.name} width={100} height={100} />}
                {/* {file.type === 'image' && <ImageIcon className='w-16 h-16' />} */}
            </CardContent>
            <CardFooter className='flex justify-center'>
                {/* {userProfile?.name} */}
                {/* {userProfile?.image} */}
                <div className='flex flex-col items-center'>
                    <div className='flex items-center gap-2 mb-2 text-sm'>
                        <Avatar className='w-8 h-8'>
                            <AvatarImage src={userProfile?.image} />
                            <AvatarFallback></AvatarFallback>
                        </Avatar>
                        {userProfile?.name}
                    </div>
                    <Button
                        size='sm'
                        onClick={() => {
                            downloadFile(file);

                            // if (!file.url) return;
                            // window.open(file.url);
                        }}
                    >
                        Download
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}


