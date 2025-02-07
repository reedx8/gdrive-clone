import FileBrowser from "../_components/file-browser";

export default function TrashPage() {
    return (
        <main className='w-full'>
            <FileBrowser title='Trash' trash />
        </main>
    );
}