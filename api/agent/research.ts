import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkAuth, braveSearch } from './utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (!checkAuth(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { topic } = req.body;
        if (!topic) throw new Error("Missing 'topic' in body");

        console.log(`[Agent: Research] Searching for: ${topic}`);
        const context = await braveSearch(topic);

        return res.status(200).json({ context });
    } catch (error: any) {
        console.error("[Agent: Research] Failed:", error);
        return res.status(500).json({ error: error.message });
    }
}
