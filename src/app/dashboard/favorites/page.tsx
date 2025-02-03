import { useQuery } from "convex/react";
import FileBrowser from "../_components/file-browser";
import { api } from "../../../../convex/_generated/api";

export default function FavoritesPage() {
    return (
        <main className='w-full'>
            <FileBrowser title='Your Favorites' favorites />
        </main>
    );
}