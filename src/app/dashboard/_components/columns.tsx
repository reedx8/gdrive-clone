'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Doc, Id } from '../../../../convex/_generated/dataModel';
import { formatRelative } from 'date-fns';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileActions } from './file-actions';

function UserCell({ userId }: { userId: Id<'users'> }) {
    const userProfile = useQuery(api.users.getUserProfile, {
        userId: userId,
    });
    return (
        <div className='flex items-center gap-2 text-neutral-500'>
            <Avatar className='w-5 h-5'>
                <AvatarImage src={userProfile?.image} />
                <AvatarFallback></AvatarFallback>
            </Avatar>
            {userProfile?.name}
        </div>
    );
}
// DNU: Doc type (AI: its a convex type, which is a type that represents a document in your database)
export const columns: ColumnDef<Doc<'files'>>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'type',
        header: 'Type',
    },
    {
        header: 'User',
        cell: ({ row }) => {
            return <UserCell userId={row.original.userId} />;
        },
    },
    {
        header: 'Uploaded On',
        cell: ({ row }) => {
            const formattedDate = formatRelative(
                new Date(row.original._creationTime),
                new Date()
            );
            return <div className='text-neutral-500'>{formattedDate}</div>;
        },
    },
    {
        header: 'Actions',
        cell: ({ row }) => {
            return <div className='w-1'><FileActions file={row.original} /></div>;
        },
    }
];
