import connectToDb from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (request, {params}) => {
    try {
        await connectToDb();
        const promptList = await Prompt.find({createdBy: params.id}).populate('createdBy');
        return new Response(JSON.stringify(promptList), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch prompts', {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }

};