// Backend code for app -- a convex "mutation" is an endpoint/function that can be called from the frontend
import { ConvexError, v } from 'convex/values';
import { mutation, MutationCtx, query, QueryCtx } from './_generated/server';
import { getUser } from './users';
import { fileTypes } from './schema';

// Upload file to convex storage
export const generateUploadUrl = mutation(async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
        throw new ConvexError('Log in to upload files');
    }
    return await ctx.storage.generateUploadUrl();
});

async function hasAccessToOrg(
    ctx: QueryCtx | MutationCtx,
    tokenIdentifier: string,
    orgId: string
) {
    const user = await getUser(ctx, tokenIdentifier);
    const hasAccess =
        user.orgIds.includes(orgId) || user.tokenIdentifier.includes(orgId);
    return hasAccess;
}
// create file/table in your db
export const createFile = mutation({
    args: {
        name: v.string(),
        fileId: v.id('_storage'), // convex built in type for file storage
        orgId: v.string(),
        type: fileTypes,
    },
    async handler(ctx, args) {
        // authenticating on the backend, and ensuring user has access to org
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError('Log in to upload files');
        }
        const hasAccess = await hasAccessToOrg(
            ctx,
            identity.tokenIdentifier,
            args.orgId
        );

        if (!hasAccess) {
            throw new ConvexError("You don't have access to this org");
        }

        // if (!user.orgIds.includes(args.orgId) && user.tokenIdentifier !== identity.tokenIdentifier) {
        //     throw new ConvexError("You don't have access to this org");
        // }

        await ctx.db.insert('files', {
            name: args.name,
            orgId: args.orgId,
            fileId: args.fileId,
            type: args.type,
        });
    },
});

// get all files/table in your db
export const getFiles = query({
    args: {
        orgId: v.string(),
        query: v.optional(v.string()),
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            return [];
        }

        const hasAccess = await hasAccessToOrg(
            ctx,
            identity.tokenIdentifier,
            args.orgId
        );

        if (!hasAccess) {
            return [];
        }

        const files = await ctx.db
            .query('files')
            .withIndex('by_orgId', (q) => q.eq('orgId', args.orgId))
            .collect();

        const query = args.query;

        if (query) {
            return files.filter(
                // (file) => file.name.includes(query)
                (file) =>
                    file.name.toLowerCase().includes(query.toLowerCase()) ||
                    file.type.toLowerCase().includes(query.toLowerCase())
            );
        } else {
            return files;
        }
    },
});

export const deleteFile = mutation({
    args: {
        fileId: v.id('files'),
        // orgId: v.string(),
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError('Log in to delete files');
        }

        const file = await ctx.db.get(args.fileId);

        if (!file) {
            throw new ConvexError('File not found');
        }

        const hasAccess = await hasAccessToOrg(
            ctx,
            identity.tokenIdentifier,
            file.orgId // want the orgId of the file, not the user
        );

        if (!hasAccess) {
            throw new ConvexError("You don't have access to this org");
        }

        await ctx.db.delete(args.fileId);
    },
});

// export const getFileUrl = query({
//     args: {
//         fileId: v.id('_storage'),
//     },
//     async handler(ctx, args) {
//         // return `https://quick-capybara-655.convex.cloud/api/storage/${args.fileId}`
//         if args.fileId.type
//         return await ctx.storage.getUrl(args.fileId);
//     },
// });
