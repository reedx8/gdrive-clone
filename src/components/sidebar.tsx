import { FileIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Sidebar() {
    return (
        <div className='w-32 flex flex-col gap-4'>
            <Link href='/dashboard/files' className='flex gap-1'>
                <Button variant={'link'} className='text-xs'>
                    <FileIcon /> All Files
                </Button>
            </Link>
            <Link href='/dashboard/favorites'>
                <Button variant={'link'} className='text-xs'><StarIcon /> Favorites</Button>
            </Link>
        </div>
    );
}
