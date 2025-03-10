import { ConvexError, v } from 'convex/values';
import { action, mutation, query } from './_generated/server';
import { ChatAnthropic } from '@langchain/anthropic';
// import { ChatOpenAI } from '@langchain/openai';

export const saveMessages = mutation({
    args: {
        userMessage: v.string(),
        aiMessage: v.optional(v.union(v.string(), v.null())),
    },
    handler: async (ctx, args) => {
        // const API_KEY = process.env.OPENAI_API_KEY;

        // const API_KEY = process.env.ANTHROPIC_API_KEY;

        // if (!API_KEY) {
        //     throw new Error('Missing API key');
        // }

        try {
            const identity = await ctx.auth.getUserIdentity();

            if (!identity) {
                throw new ConvexError('Log in to utilize chat');
            }

            const user = await ctx.db
                .query('users')
                .withIndex('by_tokenIdentifier', (q) =>
                    q.eq('tokenIdentifier', identity.tokenIdentifier)
                )
                .first();

            if (!user) {
                return null;
            }

            await ctx.db.insert('messages', {
                text: args.userMessage,
                isHuman: args.aiMessage ? true : false,
                userId: user._id,
            });

            if (args.aiMessage) {
                await ctx.db.insert('messages', {
                    text: args.aiMessage,
                    isHuman: false,
                    userId: user._id,
                });
            }

            // return aiMsg.content;
        } catch (error) {
            console.error('Error:', error);
        }
    },
});

export const getMessages = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError('Log in to utilize chat');
        }

        const user = await ctx.db
            .query('users')
            .withIndex('by_tokenIdentifier', (q) =>
                q.eq('tokenIdentifier', identity.tokenIdentifier)
            )
            .first();

        if (!user) {
            return null;
        }

        const messages = await ctx.db
            .query('messages')
            .withIndex('byUserId', (q) => q.eq('userId', user._id))
            .collect();

        return messages;
    },
});

// formerly sendMessage
export const getAiResponse = action({
    args: { textMessage: v.string() },
    handler: async (ctx: any, args) => {
        // const API_KEY = process.env.OPENAI_API_KEY;
        const API_KEY = process.env.ANTHROPIC_API_KEY;

        if (!API_KEY) {
            throw new Error('Missing API key');
        }

        try {
            const llm = new ChatAnthropic({
                apiKey: API_KEY,
                model: 'claude-3-haiku-20240307',
                temperature: 0,
                maxTokens: undefined,
                maxRetries: 2,
                // other params...
            });
            // const llm = new ChatOpenAI({
            //     apiKey: API_KEY,
            //     model: "gpt-4o",
            //     temperature: 0,
            //     // other params...
            //   });

            const aiMsg = await llm.invoke([
                [
                    'system',
                    'You are a helpful assistant that translates English to Spanish. Translate the user sentence.',
                ],
                ['human', args.textMessage],
            ]);

            return aiMsg.content as string;
        } catch (error) {
            console.error('Error:', error);
        }
    },
});

export const clearMessages = mutation({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError('Log in to utilize chat');
        }

        const user = await ctx.db
            .query('users')
            .withIndex('by_tokenIdentifier', (q) =>
                q.eq('tokenIdentifier', identity.tokenIdentifier)
            )
            .first();

        if (!user) {
            return null;
        }
        const messages = await ctx.db
            .query('messages')
            .withIndex('byUserId', (q) => q.eq('userId', user._id))
            .collect();

        await Promise.all(
            messages.map(async (message) => {
                await ctx.db.delete(message._id);
                // return await ctx.db.delete(message._id);
            })
        );
    },
});
