import connectToDb from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req, { params }) => {
    try {
        await connectToDb();
        const prompt = await Prompt.findById(params.id);
        if (!prompt) {
            return new Response('Prompt not found', {
                headers: { 'Content-Type': 'application/json' },
                status: 404
            });
        }
        return new Response(JSON.stringify(prompt), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch prompt', {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }

};

export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();
    try {
        await connectToDb();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) {
            return new Response('Prompt not found', {
                headers: { 'Content-Type': 'application/json' },
                status: 404
            });
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        return new Response('Failed to update prompt', {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}

export const DELETE = async (req, { params }) => {
    try {
        await connectToDb();
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Post Deleted Successfully", {
            status: 200
        });
    } catch (error) {
        return new Response('Failed to delete prompt', {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}