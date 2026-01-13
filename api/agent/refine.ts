import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkAuth, callPerplexity, SOP_GUIDELINES } from './utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (!checkAuth(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { topic, draft, critique, context } = req.body;
        if (!draft || !critique) throw new Error("Missing 'draft' or 'critique'");

        console.log(`[Agent: Refine] Polishing draft...`);

        const rulesText = SOP_GUIDELINES.map(r => `- ${r}`).join('\n');

        const refinedDraft = await callPerplexity([
            {
                role: "system", content: `You are a Senior Editor with a "Fix Everything at Once" methodology.

TASK:
1. ANALYZE the critique. List exactly what is GOOD (to PRESERVE) and what is BAD (to FIX).
2. PLAN the rewrite. Determine how to fix the bad parts without breaking the good parts.
3. EXECUTE. Rewrite the post.

CRITICAL INSTRUCTIONS:
- If the critique flags "Fake Authenticity", REMOVE IT.
- If the critique flags "Weak Hook", WRITE A NEW HOOK.
- Verify citations against the CONTEXT.

CONTEXT:
${context}

GUIDELINES:
${rulesText}`
            },
            { role: "user", content: `Draft:\n${draft}\n\nCritique:\n${critique}\n\nPlease output ONLY the final rewritten post (skipping the analysis log).` }
        ]);

        return res.status(200).json({ refined_draft: refinedDraft });
    } catch (error: any) {
        console.error("[Agent: Refine] Failed:", error);
        return res.status(500).json({ error: error.message });
    }
}
