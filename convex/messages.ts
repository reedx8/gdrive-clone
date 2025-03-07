import { v } from 'convex/values';
import { action } from './_generated/server';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOpenAI } from '@langchain/openai';

export const createMessage = action({
    args: { textMessage: v.string() },
    handler: async (ctx, args) => {
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
            return aiMsg.content;
        } catch (error) {
            console.error('Error:', error);
        }
    },
});
