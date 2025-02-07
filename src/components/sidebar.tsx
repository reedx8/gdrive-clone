'use client';
import { FileIcon, StarIcon, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

export default function Sidebar() {
    const [currentPath, setCurrentPath] = useState('');
    const pathname = usePathname();
    useEffect(() => {
        setCurrentPath(pathname);
    }, [pathname]);

    return (
        <div className='w-32 flex flex-col gap-4'>
            <Link href='/dashboard/files' className='flex gap-1'>
                <Button
                    variant={'link'}
                    className={clsx(
                        'text-xs',
                        currentPath === '/dashboard/files' &&
                            'font-bold text-blue-500'
                    )}
                >
                    <FileIcon /> All Files
                </Button>
            </Link>
            <Link href='/dashboard/favorites'>
                <Button
                    variant={'link'}
                    className={clsx(
                        'text-xs',
                        currentPath === '/dashboard/favorites' &&
                            'font-bold text-blue-500'
                    )}
                >
                    <StarIcon /> Favorites
                </Button>
            </Link>
            <Link href='/dashboard/trash'>
                <Button
                    variant={'link'}
                    className={clsx(
                        'text-xs',
                        currentPath === '/dashboard/trash' &&
                            'font-bold text-blue-500'
                    )}
                >
                    <Trash2 /> Trash
                </Button>
            </Link>
        </div>
    );
}
