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
    FormDescription,
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

// Schema of the form
const formSchema = z.object({
    title: z.string().min(1).max(200),
    file: z.custom<File | null>((val) => val instanceof File, 'Required'),
});

export default function CreateFileBtn(createFile, orgId: string | undefined) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            file: null,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>, createFile) {
        console.log(values);

        // if (!orgId) return;
        // createFile(name: 'hello world 2',orgId);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline'>Upload File</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload your file</DialogTitle>
                    <DialogDescription>
                        Upload your file here to your organization.
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
                                    <FormDescription>
                                        This is the title of your file.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='file'
                            render={({ field: { onChange }, ...field }) => (
                                <FormItem>
                                    <FormLabel>File</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='file'
                                            {...field}
                                            onChange={(event) => {
                                                if (!event.target.files) return;
                                                onChange(event.target.files[0]);
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your File to upload.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='mx-auto'>
                            Submit
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
