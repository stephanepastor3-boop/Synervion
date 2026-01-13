import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkAuth, callPerplexity, SOP_GUIDELINES, BRAVE_API_KEY } from './utils';

// Helper for image search specific to this agent
async function braveImageSearch(query: string) {
    const url = new URL('https://api.search.brave.com/res/v1/images/search');
    url.searchParams.append('q', query);
    url.searchParams.append('count', '1');
    url.searchParams.append('size', 'Large');
    const response = await fetch(url.toString(), {
        headers: { 'Accept': 'application/json', 'X-Subscription-Token': BRAVE_API_KEY! }
    });
    const json = await response.json();
    if (!json.results || json.results.length === 0) throw new Error("No images found.");
    return json.results[0].properties.url;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (!checkAuth(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { draft } = req.body;
        if (!draft) throw new Error("Missing 'draft'");

        console.log(`[Agent: Visual] Generating concept...`);

        // 1. Generate Concept
        const visualConcept = await callPerplexity([
            { role: "system", content: `You are an Art Director. Describe a SINGLE, STRIKING visual concept for this post. Keep it realistic and scientific.` },
            { role: "user", content: `Post Content:\n${draft}` }
        ]);

        // 2. Generate Query
        const visualQueryRaw = await callPerplexity([
            { role: "system", content: `Convert this visual concept into a search query string for high-end stock photos. Output ONLY the query.` },
            { role: "user", content: `Visual Concept: ${visualConcept}` }
        ]);

        const visualQuery = visualQueryRaw.replace(/^"|"$/g, ''); // Remove quotes if present

        // 3. Search (Robust Fallback Strategy)
        // Strategy: Specific -> Broader -> Topic-based -> Generic Safety Net
        // Note: We don't have 'topic' here, we can extract keywords or just use the query.
        // Let's assume the query is good enough, but we add fallbacks.

        const visualQueries = [
            visualQuery + " photorealistic 4k",
            visualQuery,
            "functional mushrooms nature aesthetic 4k" // Hard safety net
        ];

        let imageUrl = "";
        for (const q of visualQueries) {
            try {
                console.log(`[Agent: Visual] Searching image: "${q}"...`);
                imageUrl = await braveImageSearch(q);
                if (imageUrl) break;
            } catch (e) {
                console.warn(`[Agent: Visual] Search failed for "${q}". Trying fallback...`);
            }
        }

        if (!imageUrl) throw new Error("CRITICAL: No images found after all fallbacks.");

        return res.status(200).json({ image_url: imageUrl });
    } catch (error: any) {
        console.error("[Agent: Visual] Failed:", error);
        return res.status(500).json({ error: error.message });
    }
}
