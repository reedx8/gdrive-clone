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
            <Link href='/dashboard/files' className='flex gap-2'>
                <Button
                    variant={'link'}
                    className={clsx(
                        'text-sm',
                        currentPath === '/dashboard/files' &&
                            'font-bold text-blue-500'
                    )}
                >
                    <FileIcon className='transform scale-150' /> All Files
                    {/* <FileIcon className={'h-20 w-20'}/> All Files */}
                </Button>
            </Link>
            <Link href='/dashboard/favorites' className='flex gap-2'>
                <Button
                    variant={'link'}
                    className={clsx(
                        'text-sm',
                        currentPath === '/dashboard/favorites' &&
                            'font-bold text-blue-500'
                    )}
                >
                    <StarIcon className='transform scale-150' /> Favorites
                </Button>
            </Link>
            <Link href='/dashboard/trash' className='flex gap-2'>
                <Button
                    variant={'link'}
                    className={clsx(
                        'text-sm',
                        currentPath === '/dashboard/trash' &&
                            'font-bold text-blue-500'
                    )}
                >
                    <Trash2 className='transform scale-150' /> Trash
                </Button>
            </Link>
        </div>
    );
}
