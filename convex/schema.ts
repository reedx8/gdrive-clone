// Defines the schema for your app

import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const fileTypes = v.union(
    v.literal('image'),
    v.literal('csv'),
    v.literal('pdf')
);

// Defines convex db's schema used throughout app
export default defineSchema({
    files: defineTable({
        name: v.string(),
        orgId: v.string(),
        fileId: v.id('_storage'),
        type: fileTypes,
        userId: v.id('users'),
        markedForDeletion: v.optional(v.boolean()),
        url: v.string(),
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
    // The following was for Agentic RAG in convex (Not working):
    cache: defineTable({
        // not used
        // simple cache to avoid recomputing embeddings
        key: v.string(), // content
        value: v.any(), // embedding
    }).index('byKey', ['key']),
    documents: defineTable({
        url: v.string(),
        text: v.string(),
        fileId: v.union(v.string(), v.null()),
    }).index('byUrl', ['url']),
    messages: defineTable({
        sessionId: v.string(), // who owns the message
        isViewer: v.boolean(),
        text: v.string(),
    }).index('bySessionId', ['sessionId']),
    threads: defineTable({
        sessionId: v.string(),
        threadId: v.string(),
    }).index('bySessionId', ['sessionId']),
});
