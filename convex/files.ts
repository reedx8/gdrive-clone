import { ConvexError, v } from 'convex/values';
import { mutation, MutationCtx, query, QueryCtx } from './_generated/server';
import { getUser } from './users';

async function hasAccessToOrg( ctx: QueryCtx | MutationCtx, tokenIdentifier: string, orgId: string ) {
    const user = await getUser(ctx, tokenIdentifier);
    const hasAccess = user.orgIds.includes(orgId) || user.tokenIdentifier.includes(orgId);
    return hasAccess;
}
// create file/table in your db
export const createFile = mutation({
    args: {
        name: v.string(),
        orgId: v.string(),
    },
    async handler(ctx, args) {
        // authenticating on the backend, and ensuring user has access to org
        const identity = await ctx.auth.getUserIdentity();

        if (!identity){
            throw new ConvexError("Log in to upload files");
        }
        const hasAccess = await hasAccessToOrg(ctx, identity.tokenIdentifier, args.orgId);

        if (!hasAccess) {
            throw new ConvexError("You don't have access to this org");
        }

        // if (!user.orgIds.includes(args.orgId) && user.tokenIdentifier !== identity.tokenIdentifier) {
        //     throw new ConvexError("You don't have access to this org");
        // }

        await ctx.db.insert('files', {
            name: args.name,
            orgId: args.orgId,
        });
    },
});

// get all files/table in your db
export const getFiles = query({
    args: {
        orgId: v.string()
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            return [];
        }

        const hasAccess = await hasAccessToOrg(ctx, identity.tokenIdentifier, args.orgId);

        if (!hasAccess) {
            return [];
        }

        return ctx.db.query('files').withIndex("by_orgId", q =>
            q.eq('orgId', args.orgId)
        ).collect();
    },
});
