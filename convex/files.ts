import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// create file/table in your db
export const createFile = mutation({
    args: {
        name: v.string(),
    },
    async handler(ctx, args) {
        await ctx.db.insert('files', {
            name: args.name,
        });
    },
});

// get all files/table in your db
export const getFiles = query({
    args: {},
    async handler(ctx, args) {
        return ctx.db.query('files').collect();
    },
});
