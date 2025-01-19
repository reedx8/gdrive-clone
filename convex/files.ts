// Backend code for app -- a convex "mutation" is an endpoint/function that can be called from the frontend
import { ConvexError, v } from 'convex/values';
import { mutation, MutationCtx, query, QueryCtx } from './_generated/server';
import { getUser } from './users';

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
        });
    },
});

// get all files/table in your db
export const getFiles = query({
    args: {
        orgId: v.string(),
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

        return ctx.db
            .query('files')
            .withIndex('by_orgId', (q) => q.eq('orgId', args.orgId))
            .collect();
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
