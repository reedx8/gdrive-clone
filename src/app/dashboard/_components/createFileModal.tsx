import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from 'convex/react';
// import { api } from '../../convex/_generated/api';
import { api } from '../../../../convex/_generated/api';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Doc } from '../../../../convex/_generated/dataModel';
// import { Doc } from '../../convex/_generated/dataModel';
// import createFile from '../../convex/files';

// Schema of the form
const formSchema = z.object({
    title: z.string().min(1).max(200),
    file: z
        .custom<FileList>((val) => val instanceof FileList, 'Required')
        .refine((val) => val.length > 0, 'Required'),
    // file: z.instanceof(FileList),
    // file: z.custom<File | null>((val) => val instanceof File, 'Required'),
});

// type Props =  {
//     orgId: string | undefined
// };

export default function CreateFileModal({
    orgId,
}: {
    orgId: string | undefined;
}) {
    const createFile = useMutation(api.files.createFile);
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            file: undefined,
        },
    });

    const fileRef = form.register('file');

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log(values);
        // console.log(values.file);
        if (!orgId) return;

        const postUrl = await generateUploadUrl(); // Calls backend, and gives us a url to upload to
        const fileType = values.file[0].type;
        const result = await fetch(postUrl, {
            method: 'POST',
            headers: { 'Content-Type': fileType },
            body: values.file[0],
        });
        const { storageId } = await result.json();

        const types = {
            "image/png": "image",
            "text/csv": "csv",
            "application/pdf": "pdf"
        } as Record<string, Doc<"files">["type"]>;

        try {
            await createFile({
                name: values.title,
                fileId: storageId,
                orgId,
                type: types[fileType],
            });
            form.reset();
            setIsModalOpen(false);

            toast({
                variant: 'default',
                title: 'File Uploaded',
                description: 'Your file has been uploaded successfully',
            });
        } catch {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'There was an error uploading your file',
            });
        }
    }

    return (
        <Dialog
            open={isModalOpen}
            onOpenChange={(isOpen) => {
                setIsModalOpen(isOpen);
                form.reset();
            }}
        >
            <DialogTrigger asChild>
                <Button variant='default'>Upload File</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>File Upload</DialogTitle>
                    <DialogDescription className='text-neutral-400'>
                        Upload your file here to your organization
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8'
                    >
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Title of file'
                                            {...field}
                                        />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is the title of your file.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='file'
                            render={() => (
                                <FormItem>
                                    <FormLabel>File <span className='text-neutral-400'>(PNG, PDF, or CSV only)</span></FormLabel>
                                    <FormControl>
                                        <Input type='file' {...fileRef} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* To get spinning loader in shadcn button while submitting, add disabled={form.formState.isSubmitting} */}
                        <Button
                            type='submit'
                            className='flex gap-1'
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting && (
                                <Loader2 className='animate-spin h-5 w-5 text-white' />
                            )}
                            Submit
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
