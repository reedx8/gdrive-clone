// Defines the schema for your app

import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const fileTypes = v.union(
    v.literal('image'),
    v.literal('csv'),
    v.literal('pdf')
);

// Defines the files table in convex db
export default defineSchema({
    files: defineTable({
        name: v.string(),
        orgId: v.string(),
        fileId: v.id('_storage'),
        type: fileTypes,
        markedForDeletion: v.optional(v.boolean()),
    })
        .index('by_orgId', ['orgId'])
        .index('by_markedForDeletion', ['markedForDeletion']),
    favorites: defineTable({
        fileId: v.id('files'),
        orgId: v.string(),
        userId: v.id('users'),
    }).index('by_userId__orgId_fileid', ['userId', 'orgId', 'fileId']),
    users: defineTable({
        tokenIdentifier: v.string(),
        orgIds: v.array(v.string()),
        name: v.optional(v.string()),
        image: v.optional(v.string()),
    }).index('by_tokenIdentifier', ['tokenIdentifier']),
});
