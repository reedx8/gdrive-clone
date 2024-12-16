import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

// Defines the files table in convex db
export default defineSchema({
    files: defineTable({ name: v.string(), orgId: v.string()}).index(
        "by_orgId",
        ["orgId"]
    ),
});
