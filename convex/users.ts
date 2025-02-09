import { ConvexError, v } from 'convex/values';
import {
    internalMutation,
    MutationCtx,
    query,
    QueryCtx,
} from './_generated/server';

export async function getUser(
    ctx: QueryCtx | MutationCtx,
    tokenIdentifier: string
) {
    const user = await ctx.db
        .query('users')
        .withIndex('by_tokenIdentifier', (q) =>
            q.eq('tokenIdentifier', tokenIdentifier)
        )
        .first();

    if (!user) {
        throw new ConvexError('Expected user to exist');
    }

    return user;
}

export const createUser = internalMutation({
    args: { tokenIdentifier: v.string(), name: v.string(), image: v.string() },
    async handler(ctx, args) {
        await ctx.db.insert('users', {
            tokenIdentifier: args.tokenIdentifier,
            orgIds: [],
            name: args.name,
            image: args.image,
        });
    },
});

export const updateUser = internalMutation({
    args: { tokenIdentifier: v.string(), name: v.string(), image: v.string() },
    async handler(ctx, args) {
        const user = await ctx.db
            .query('users')
            .withIndex('by_tokenIdentifier', (q) =>
                q.eq('tokenIdentifier', args.tokenIdentifier)
            )
            .first();

        if (!user) {
            throw new ConvexError('Expected user to exist');
        }
        await ctx.db.patch(user._id, {
            name: args.name,
            image: args.image,
        });
    },
});

export const addOrgIdToUser = internalMutation({
    args: { tokenIdentifier: v.string(), orgId: v.string() },
    async handler(ctx, args) {
        const user = await getUser(ctx, args.tokenIdentifier);

        // patch() is how to do updates in convex
        await ctx.db.patch(user._id, {
            tokenIdentifier: args.tokenIdentifier,
            orgIds: [...user.orgIds, args.orgId],
            // role: args.role,
        });
    },
});

export const getUserProfile = query({
    args: { userId: v.id('users') },
    async handler(ctx, args) {
        const user = await ctx.db.get(args.userId);
        return {
            name: user?.name,
            image: user?.image,
        };
    },
});
