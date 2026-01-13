import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkAuth, callPerplexity, SOP_GUIDELINES } from './utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (!checkAuth(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { topic, context, angle } = req.body;
        if (!topic) throw new Error("Missing 'topic'");

        const anglePrompt = angle ? `APPROACH: ${angle}` : "APPROACH: Standard";
        console.log(`[Agent: Draft] Drafting '${topic}' with angle '${angle}'`);

        const rulesText = SOP_GUIDELINES.map(r => `- ${r}`).join('\n');

        const draft = await callPerplexity([
            {
                role: "system", content: `You are the Lead Content Strategist for Synervion. Draft a LinkedIn post.
            
CRITICAL RULES:
1. Do NOT invent "lab results" or "in our lab" stories unless explicit data is provided.
2. If you lack specific data, use general phrases like "Research suggests..." or "Current studies show...".
3. NO generic CTAs like "What do you think?". Use specific questions like "Have you experimented with extraction temps?".

${anglePrompt}

GUIDELINES:
${rulesText}`
            },
            { role: "user", content: `Topic: ${topic}\n\nContext:\n${context}` }
        ]);

        return res.status(200).json({ draft });
    } catch (error: any) {
        console.error("[Agent: Draft] Failed:", error);
        return res.status(500).json({ error: error.message });
    }
}
