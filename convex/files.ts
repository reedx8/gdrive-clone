// Backend code for app -- a convex "mutation" is an endpoint/function that can be called from the frontend
import { ConvexError, v } from 'convex/values';
import { mutation, MutationCtx, query, QueryCtx } from './_generated/server';
import { getUser } from './users';
import { fileTypes } from './schema';
import { Id } from './_generated/dataModel';

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
        const access = await hasAccessToFile(ctx, args.fileId);
        if (!access) {
            throw new ConvexError("You don't have access to this file");
        }
        // const { file } = access;

        await ctx.db.delete(args.fileId);
    },
});

export const toggleFavorite = mutation({
    args: {
        fileId: v.id('files'),
    },
    async handler(ctx, args) {
        const access = await hasAccessToFile(ctx, args.fileId);
        if (!access) {
            throw new ConvexError("You don't have access to this file");
        }
        const { user, file } = access;

        const favorite = await ctx.db
            .query('favorites')
            .withIndex('by_userId__orgId_fileid', (q) =>
                q
                    .eq('userId', user._id)
                    .eq('orgId', file.orgId)
                    .eq('fileId', file._id)
            )
            .first();
        if (!favorite) {
            await ctx.db.insert('favorites', {
                fileId: file._id,
                orgId: file.orgId,
                userId: user._id,
            });
            return true;
        } else {
            await ctx.db.delete(favorite._id);
            return false;
        }
    },
});

async function hasAccessToFile(
    ctx: QueryCtx | MutationCtx,
    fileId: Id<'files'>
) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
        return false;
    }

    const file = await ctx.db.get(fileId);
    if (!file) {
        return false;
    }

    const hasAccess = await hasAccessToOrg(
        ctx,
        identity.tokenIdentifier,
        file.orgId // want the orgId of the file, not the user
    );
    if (!hasAccess) {
        return false;
    }

    const user = await ctx.db
        .query('users')
        .withIndex('by_tokenIdentifier', (q) =>
            q.eq('tokenIdentifier', identity.tokenIdentifier)
        )
        .first();
    if (!user) {
        return false;
    }
    return { user, file };
    // const hasAccess = user.orgIds.includes(file.orgId);
    // return hasAccess;
}

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
