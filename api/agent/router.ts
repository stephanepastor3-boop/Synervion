import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkAuth, braveSearch, callPerplexity, SOP_GUIDELINES, BRAVE_API_KEY, getResend, debugEnvVars, APP_URL, LINKEDIN_ACCESS_TOKEN, ORGANIZATION_ID, CRON_SECRET } from './_utils.js';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { promisify } from 'node:util';

const gzip = promisify(zlib.gzip);

// --- Helper Functions (Visual/Delivery) ---
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

async function downloadImageToBuffer(url: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to download image`);
    return await response.arrayBuffer();
}

async function uploadImageToLinkedIn(imageBuffer: ArrayBuffer) {
    // 1. Register
    const registerData = {
        "registerUploadRequest": {
            "recipes": ["urn:li:digitalmediaRecipe:feedshare-image"],
            "owner": `urn:li:organization:${ORGANIZATION_ID}`,
            "serviceRelationships": [{ "relationshipType": "OWNER", "identifier": "urn:li:userGeneratedContent" }]
        }
    };
    const regRes = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
    });
    const regJson = await regRes.json();
    if (!regRes.ok) throw new Error("Image Register Failed " + JSON.stringify(regJson));

    const uploadUrl = regJson.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
    const assetUrn = regJson.value.asset;

    // 2. Upload
    const upRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`, 'Content-Type': 'application/octet-stream' },
        body: Buffer.from(imageBuffer)
    });
    if (!upRes.ok) throw new Error("Image Binary Upload Failed");

    // 3. Verify
    await new Promise(r => setTimeout(r, 5000));
    return assetUrn;
}

// --- Main Router ---
export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (!checkAuth(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { action } = req.query;
    console.log(`[Agent Router] Action: ${action}`);
    console.log("[Agent Router] Env Check:", JSON.stringify(debugEnvVars()));

    try {
        switch (action) {
            case 'research': {
                const { topic } = req.body;
                if (!topic) throw new Error("Missing 'topic'");
                const context = await braveSearch(topic);
                return res.status(200).json({ context });
            }

            case 'draft': {
                const { topic, context, angle } = req.body;
                if (!topic) throw new Error("Missing 'topic'");
                const anglePrompt = angle ? `APPROACH: ${angle}` : "APPROACH: Standard";
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
            }

            case 'critique': {
                const { draft } = req.body;
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

                const scoreMatch = critique.match(/SCORE:\s*(\d+)/i);
                const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
                return res.status(200).json({ score, report: critique });
            }

            case 'select-winner': {
                const { candidates } = req.body;
                if (!candidates || !Array.isArray(candidates) || candidates.length === 0) {
                    throw new Error("Missing candidates");
                }
                let winner = candidates[0];
                for (const cand of candidates) {
                    const score = Number(cand.score) || 0;
                    const winnerScore = Number(winner.score) || 0;
                    if (score > winnerScore) winner = cand;
                }
                return res.status(200).json({ winner });
            }

            case 'refine': {
                const { draft, critique, context } = req.body;
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
            }

            case 'visual': {
                const { draft } = req.body;
                const { searchUnsplash } = await import('./_unsplash');

                // Generate search query using Gemini
                const searchQuery = await callGemini([
                    {
                        role: "system", content: `Convert a LinkedIn post about mushrooms into an Unsplash search query.

Rules:
- Keep it 2-4 words max
- Focus on mushroom type + setting
- Examples:
  * "lion's mane mushroom forest"
  * "reishi mushroom log"
  * "cordyceps mushroom nature"
  * "functional mushrooms wellness"

Output JUST the query, no quotes.`
                    },
                    { role: "user", content: `Post:\n${draft}` }
                ]);

                console.log('[Agent: Visual] Unsplash query:', searchQuery);

                // Try progressively broader search terms
                const searchQueries = [
                    searchQuery.trim(),
                    "functional mushrooms forest",
                    "mushroom nature photography"
                ];

                let imageUrl = "";
                for (const query of searchQueries) {
                    const result = await searchUnsplash(query);
                    if (result) {
                        imageUrl = result;
                        break;
                    }
                }

                // Fallback
                if (!imageUrl) {
                    console.log('[Agent: Visual] Using fallback image');
                    imageUrl = "https://synervion.com/mushroom-fallback.png";
                }

                return res.status(200).json({ image_url: imageUrl });
            }
                const { draft } = req.body;
                if (!draft) throw new Error("Missing draft");

                // 1. Concept
                const visualConcept = await callPerplexity([
                    { role: "system", content: `You are an Art Director. Describe a SINGLE, STRIKING visual concept for this post. Keep it realistic and scientific.` },
                    { role: "user", content: `Post Content:\n${draft}` }
                ]);

                // 2. Query
                const visualQueryRaw = await callPerplexity([
                    { role: "system", content: `Convert this visual concept into a search query string for high-end stock photos. Output ONLY the query.` },
                    { role: "user", content: `Visual Concept: ${visualConcept}` }
                ]);
                const visualQuery = visualQueryRaw.replace(/^"|"$/g, '');

                // 3. Search Loop
                const visualQueries = [
                    visualQuery + " photorealistic 4k",
                    visualQuery,
                    "functional mushrooms nature aesthetic 4k"
                ];

                let imageUrl = "";
                for (const q of visualQueries) {
                    try {
                        console.log(`[Agent: Visual] Searching: "${q}"`);
                        imageUrl = await braveImageSearch(q);
                        if (imageUrl) break;
                    } catch (e) { }
                }

                if (!imageUrl) throw new Error("CRITICAL: No images found");
                return res.status(200).json({ image_url: imageUrl });
        }

            case 'delivery': {
            const { topic, final_draft, image_url, qa_report } = req.body;

            // 1. Upload
            const imageBuffer = await downloadImageToBuffer(image_url);
            const assetUrn = await uploadImageToLinkedIn(imageBuffer);

            // 2. Link
            const payload = JSON.stringify({ topic, text: final_draft, imageUrn: assetUrn });
            const compressed = await gzip(payload);
            const dataStr = compressed.toString('base64url');
            const sig = crypto.createHmac('sha256', CRON_SECRET!).update(dataStr).digest('hex');
            const approvalUrl = `${APP_URL}/api/approve-post?data=${dataStr}&sig=${sig}`;

            // 3. Email
            await getResend().emails.send({
                from: 'Synervion Bot <bot@synervion.com>',
                to: 'stephane@synervion.com',
                subject: `⚡️ Review Required: ${topic}`,
                html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                            <div style="background: #10b981; color: white; padding: 12px; border-radius: 8px 8px 0 0; text-align: center; font-weight: bold;">
                                 Ready for Review (Workflow Engine)
                            </div>
                            <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
                                <h2 style="margin-top: 0;">${topic}</h2>
                                <div style="margin: 20px 0;">
                                    <img src="${image_url}" alt="Visual" style="width: 100%; border-radius: 8px; border: 1px solid #ddd;" />
                                </div>
                                <div style="white-space: pre-wrap; background: #f9fafb; padding: 16px; border-radius: 8px; font-size: 15px; line-height: 1.6; border: 1px solid #e5e7eb;">${final_draft}</div>
                                <div style="margin-top: 24px; border-left: 4px solid #10b981; background: #ecfdf5; padding: 16px; border-radius: 4px;">
                                    <h3 style="margin: 0 0 12px 0; color: #047857; font-size: 14px; text-transform: uppercase;">Quality Validation Report</h3>
                                    <div style="font-size: 13px; color: #065f46; white-space: pre-wrap;">${qa_report ? qa_report.replace('SCORE: 100', '').trim() : "Parallel Winner"}</div>
                                </div>
                                <div style="margin-top: 24px; text-align: center;">
                                    <a href="${approvalUrl}" style="display: inline-block; background: #0a66c2; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold;">Approve & Publish</a>
                                </div>
                            </div>
                        </div>`
            });
            return res.status(200).json({ status: "sent", approval_url: approvalUrl });
        }

            default:
        return res.status(400).json({ error: "Invalid action" });
    }

    } catch (error: any) {
    console.error(`[Agent Router] Error inside action '${action}':`, error);
    return res.status(500).json({ error: error.message });
}
}
