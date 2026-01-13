import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkAuth, callPerplexity, SOP_GUIDELINES } from './utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (!checkAuth(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { topic, draft } = req.body;
        if (!topic || !draft) throw new Error("Missing 'topic' or 'draft'");

        console.log(`[Agent: Critique] Scoring draft...`);

        const rulesText = SOP_GUIDELINES.map(r => `- ${r}`).join('\n');
        const critique = await callPerplexity([
            {
                role: "system", content: `You are a Harsh Social Media Editor. Critique this draft based on the guidelines.
            
IMPORTANT OUTPUT FORMAT:
1. First line MUST be "SCORE: X/100".
2. Followed by a "REPORT:" section.
3. If Perfect (100/100): List each checklist item with a [x] mark to confirm it passed.
4. If Failed (<100): List specifically what failed and needs fixing.

NOTE: Visuals are handled separately by a dedicated Art Director agent. 
- Do NOT critique the draft for missing image descriptions or cues. 
- Do NOT penalize "Missing visual asset" if the text itself is good.
- ONLY check that the text DOES NOT contain [placeholders].

GUIDELINES:
${rulesText}`
            },
            { role: "user", content: `Draft:\n${draft}` }
        ]);

        // Parse Score
        const scoreMatch = critique.match(/SCORE:\s*(\d+)/i);
        const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

        return res.status(200).json({ score, report: critique });
    } catch (error: any) {
        console.error("[Agent: Critique] Failed:", error);
        return res.status(500).json({ error: error.message });
    }
}
