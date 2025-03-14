import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    // FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, SearchIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const querySchema = z.object({
    query: z.string().min(0).max(200),
});

export default function SearchBar({query, setQuery}: {query?: string, setQuery: React.Dispatch<React.SetStateAction<string>>}) {
    const form = useForm<z.infer<typeof querySchema>>({
        resolver: zodResolver(querySchema),
        defaultValues: {
            query: "",
        },
    });

    async function onSubmit(values: z.infer<typeof querySchema>) {
        // console.log(values.query)
        setQuery(values.query);
    }
    function handleClear(form: UseFormReturn<z.infer<typeof querySchema>>) {
        form.reset();
        setQuery('');
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex items-center gap-2'
                    onReset={() => handleClear(form)}
                >
                    <FormField
                        control={form.control}
                        name='query'
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel>Search</FormLabel> */}
                                <FormControl>
                                    <Input
                                        placeholder='Search by name or file type'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {query && query?.trim() !== '' && ( <Button type='reset' variant='outline' size="sm">
                        <XIcon/>
                    </Button>)}
                    {/* To get spinning loader in shadcn button while submitting, add disabled={form.formState.isSubmitting} */}
                    <Button
                        size="sm"
                        type='submit'
                        className='flex gap-1'
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting && (
                            <Loader2 className='animate-spin h-5 w-5 text-white' />
                        )}
                        <SearchIcon/> Search
                    </Button>

                </form>
            </Form>
        </div>
    );
}
