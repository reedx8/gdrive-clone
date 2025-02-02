import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Doc } from '../../convex/_generated/dataModel';
import {
    FileTextIcon,
    GanttChartIcon,
    ImageIcon,
    MoreVertical,
    TrashIcon,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useToast } from '@/hooks/use-toast';
import { ReactNode } from 'react';
// import Image from 'next/image';
// import { deleteFile } from '../../convex/files';

function FileCardActions({ file }: { file: Doc<'files'> }) {
    const deleteFile = useMutation(api.files.deleteFile);
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
                    className='flex gap-1 text-red-600 items-center cursor-pointer'
                    onClick={async () => {
                        deleteFile({ fileId: file._id });
                        toast({
                            variant: 'default',
                            title: 'File deleted',
                            description: 'File deleted successfully',
                        });
                    }}
                >
                    <TrashIcon className='h-4 w-4' />
                    Delete
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

    // const getFileUrl = useQuery(api.files.getFileUrl, { fileId: file.fileId });
    // const fileUrl = useQuery(api.files.getFileUrl, { fileId: file.fileId });

    return (
        <Card>
            <CardHeader className='relative'>
                <CardTitle className='mr-2 flex items-center gap-2 text-lg'>
                    <p>{typeIcons[file.type]}</p>{file.name}
                    {/* <FileCardActions /> */}
                </CardTitle>
                <div className='absolute right-2 top-2'>
                    <FileCardActions file={file} />
                </div>
            </CardHeader>
            <CardContent className='h-[200px] flex items-center justify-center'>
                {/* {file.type === 'image' && (
                    // <Image src={getFileUrl(file.fileId)} alt={file.name} width={100} height={100} />
                    <Image src={fileUrl} alt={file.name} width={100} height={100} />
                )} */}
                {file.type === 'csv' && <GanttChartIcon className="w-20 h-20" />}
                {file.type === 'pdf' && <FileTextIcon className="w-20 h-20" />}
                {file.type === 'image' && <ImageIcon className="w-20 h-20" />}
            </CardContent>
            <CardFooter className='flex justify-center'>
                <Button>Download</Button>
                {/* <Button onClick={() => {window.open(getFileUrl(file.fileId, "_blank"))}}>Download</Button> */}
            </CardFooter>
        </Card>
    );
}
