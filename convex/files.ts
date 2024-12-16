import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

// create file/table in your db
export const createFile = mutation({
    args: {
        name: v.string(),
        orgId: v.string(),
    },
    async handler(ctx, args) {
        // authenticating on the backend
        const identity = await ctx.auth.getUserIdentity();
        if (!identity){
            throw new ConvexError("Log in to upload files");
        }

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
        return ctx.db.query('files').withIndex("by_orgId", q =>
            q.eq('orgId', args.orgId)
        ).collect();
    },
});
