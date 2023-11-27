import connectToDb from '@utils/database';
import Prompt from '@models/prompt';

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();
    try {
        await connectToDb();
        const newPrompt = await Prompt.create({
            createdBy: userId,
            prompt,
            tag
        });
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), {
            headers: { 'Content-Type': 'application/json' },
            status: 201
        });
    } catch (error) {
        return new Response('Failed to create new prompt', {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }

};