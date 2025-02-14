import { Doc } from '../../../../convex/_generated/dataModel';
import { MoreVertical, StarIcon, TrashIcon, UndoIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
// import { Protect } from '@clerk/nextjs';

// import { restoreFile } from '../../../../convex/files';
// import Image from 'next/image';
// import { deleteFile } from '../../convex/files';

export function FileActions({
    file,
    trash,
}: {
    file: Doc<'files'>;
    trash?: boolean;
}) {
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
                {!trash && (
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
                                    description:
                                        'File removed from your favorites',
                                });
                            }
                        }}
                    >
                        <StarIcon className='h-4 w-4' />
                        Favorite
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                {/* <Protect role='org:admin'> */}
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
                {/* </Protect> */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
