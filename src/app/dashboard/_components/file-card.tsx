import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Doc } from '../../../../convex/_generated/dataModel';
import {
    FileTextIcon,
    GanttChartIcon,
    ImageIcon,
    MoreVertical,
    StarIcon,
    TrashIcon,
    UndoIcon,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useToast } from '@/hooks/use-toast';
import { ReactNode } from 'react';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';

// import { restoreFile } from '../../../../convex/files';
// import Image from 'next/image';
// import { deleteFile } from '../../convex/files';

function FileCardActions({ file }: { file: Doc<'files'> }) {
    const deleteFile = useMutation(api.files.deleteFile);
    const restoreFile = useMutation(api.files.restoreFile);
    const toggleFavorite = useMutation(api.files.toggleFavorite);
    const { toast } = useToast();

    // async function onDelete() {
    //     await deletFile({ fileId: file._id });
    // }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVertical className='h-5 w-5' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    className='flex gap-1 items-center cursor-pointer'
                    onClick={async () => {
                        const isFavorite = await toggleFavorite({
                            fileId: file._id,
                        });
                        if (isFavorite) {
                            toast({
                                variant: 'default',
                                title: 'File favorited',
                                description: 'File added to your favorites',
                            });
                        } else {
                            toast({
                                variant: 'default',
                                title: 'File unfavorited',
                                description: 'File removed from your favorites',
                            });
                        }
                    }}
                >
                    <StarIcon className='h-4 w-4' />
                    Favorite
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className='flex gap-1 items-center cursor-pointer'
                    onClick={async () => {
                        if (file.markedForDeletion) {
                            restoreFile({ fileId: file._id });
                            toast({
                                variant: 'default',
                                title: 'File Restored',
                                description: 'Your file has been restored',
                            });
                        } else {
                            deleteFile({ fileId: file._id });
                            toast({
                                variant: 'default',
                                title: 'File Deleted',
                                description:
                                    'Your file has been moved to trash',
                            });
                        }
                    }}
                >
                    {file.markedForDeletion ? (
                        <div className='flex gap-1 items-center cursor-pointer text-green-500'>
                            <UndoIcon className='h-4 w-4' /> Restore{' '}
                        </div>
                    ) : (
                        <div className='flex gap-1 items-center cursor-pointer text-red-500'>
                            <TrashIcon className='h-4 w-4' /> Delete
                        </div>
                    )}
                    {/* <TrashIcon className='h-4 w-4' /> */}
                    {/* Delete */}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// TODO
// function getFileUrl(fileId: Id<"_storage">): string {
//     // const fileUrl = useQuery(api.files.getFileUrl, { fileId: fileId });
//     return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
// }

// Definine file is of type Doc<"files">
export function FileCard({ file }: { file: Doc<'files'> }) {
    const typeIcons = {
        image: <ImageIcon />,
        pdf: <FileTextIcon />,
        csv: <GanttChartIcon />,
    } as Record<Doc<'files'>['type'], ReactNode>;
    const userProfile = useQuery(api.users.getUserProfile, {
        userId: file.userId,
    });

    // const getFileUrl = useQuery(api.files.getFileUrl, { fileId: file.fileId });
    // const fileUrl = useQuery(api.files.getFileUrl, { fileId: file.fileId });

    return (
        <Card>
            <CardHeader className='relative'>
                <CardTitle className='mr-2 flex items-center gap-2 text-base font-normal'>
                    <p>{typeIcons[file.type]}</p>
                    {file.name}
                    {/* <FileCardActions /> */}
                </CardTitle>
                <div className='absolute right-2 top-2'>
                    <FileCardActions file={file} />
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
                {file.type === 'image' && <ImageIcon className='w-16 h-16' />}
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
                    <Button size='sm'>Download</Button>
                </div>
                {/* <Button onClick={() => {window.open(getFileUrl(file.fileId, "_blank"))}}>Download</Button> */}
            </CardFooter>
        </Card>
    );
}
