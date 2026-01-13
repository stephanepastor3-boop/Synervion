import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkAuth } from './utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (!checkAuth(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { candidates } = req.body;
        if (!candidates || !Array.isArray(candidates) || candidates.length === 0) {
            throw new Error("Missing or empty 'candidates' array");
        }

        console.log(`[Agent: Select Winner] Comparing ${candidates.length} candidates...`);

        // Simple logic: Highest score wins. Tie-breaker: First one found.
        let winner = candidates[0];

        for (const cand of candidates) {
            // Ensure inputs are numbers
            const score = Number(cand.score) || 0;
            const winnerScore = Number(winner.score) || 0;

            if (score > winnerScore) {
                winner = cand;
            }
        }

        console.log(`[Agent: Select Winner] Winner is '${winner.angle}' with score ${winner.score}`);

        return res.status(200).json({ winner });
    } catch (error: any) {
        console.error("[Agent: Select Winner] Failed:", error);
        return res.status(500).json({ error: error.message });
    }
}
