import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Doc } from '../../convex/_generated/dataModel';
import { MoreVertical, TrashIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
// import { deleteFile } from '../../convex/files';

function FileCardActions({ file }: { file: Doc<'files'> }) {
    const deleteFile = useMutation(api.files.deleteFile);

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
                    className='flex gap-1 text-red-600 items-center cursor-pointer'
                    onClick={() => deleteFile({ fileId: file._id })}
                >
                    <TrashIcon className='h-4 w-4' />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// Definine file is of type Doc<"files">
export function FileCard({ file }: { file: Doc<'files'> }) {
    return (
        <Card>
            <CardHeader className='relative'>
                <CardTitle className="mr-2">
                    {file.name}
                    {/* <FileCardActions /> */}
                </CardTitle>
                <div className='absolute right-2 top-2'>
                    <FileCardActions file={file} />
                </div>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <Button>Download</Button>
            </CardFooter>
        </Card>
    );
}
