import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkAuth, braveSearch, callPerplexity, SOP_GUIDELINES, BRAVE_API_KEY, getResend, debugEnvVars, APP_URL, LINKEDIN_ACCESS_TOKEN, ORGANIZATION_ID, CRON_SECRET } from './_utils.js';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { promisify } from 'node:util';

const gzip = promisify(zlib.gzip);

// --- Helper Functions (Visual/Delivery) ---
async function braveImageSearch(query: string, size?: string) {
    const url = new URL('https://api.search.brave.com/res/v1/images/search');
    url.searchParams.append('q', query);
    url.searchParams.append('count', '1');
    if (size) url.searchParams.append('size', size);

    console.log(`[Brave] Searching: "${query}" (Size: ${size || 'Any'})`);

    const response = await fetch(url.toString(), {
        headers: { 'Accept': 'application/json', 'X-Subscription-Token': BRAVE_API_KEY! }
    });

    if (!response.ok) {
        console.error(`[Brave] Error ${response.status}:`, await response.text());
        return null; // Return null instead of throwing
    }

    const json = await response.json();
    if (!json.results || json.results.length === 0) return null;
    return json.results[0].properties.url;
}

// Shared headers for image requests (prevents HEAD/GET mismatch)
const IMAGE_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Referer': 'https://www.google.com/',
    'Accept-Language': 'en-US,en;q=0.9'
};

async function downloadImageToBuffer(url: string) {
    const response = await fetch(url, { headers: IMAGE_HEADERS });
    if (!response.ok) throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
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

                // 1. Sanitize Topic (The "Pivot" Step)
                const searchQueryRaw = await callPerplexity([
                    {
                        role: "system", content: `You are a Search Engine Optimizer.
                    
TASK: Convert the user's input topic into a simple, effective search query for "Functional Mushrooms" or "Natural Wellness".

RULES:
1. If input is Tech/AI -> Pivot to biological analogy (e.g. "Mycelium network resilience").
2. OUTPUT ONLY THE QUERY STRING.
3. NO Markdown. NO RATIONALE. NO HEADERS. NO QUOTES.
4. Keep it under 6 words.` },
                    { role: "user", content: `Input: ${topic}` }
                ]);

                // Clean up any potential leakage (Markdown headers, newlines, quotes)
                let searchQuery = searchQueryRaw
                    .replace(/#.*$/gm, '') // Remove headers
                    .replace(/\*\*|__/g, '') // Remove bold
                    .replace(/^"|"$/g, '')   // Remove quotes
                    .split('\n')[0]          // Take first line only
                    .trim();

                // Fallback if LLM fails
                if (!searchQuery || searchQuery.length < 3) {
                    console.log(`[Agent: Research] Pivot failed (Empty Result). Fallback to: "Functional Mushrooms Scientific Studies"`);
                    searchQuery = "Functional Mushrooms Scientific Studies";
                } else {
                    console.log(`[Agent: Research] Pivoted Topic "${topic}" -> Search Query "${searchQuery}"`);
                }

                const context = await braveSearch(searchQuery);
                return res.status(200).json({ context: `Original Topic: ${topic}\n\nSearch Query Used: ${searchQuery}\n\nResearch Data:\n${context}` });
            }

            case 'draft': {
                const { topic, context, angle } = req.body;
                if (!topic) throw new Error("Missing 'topic'");
                const anglePrompt = angle ? `APPROACH: ${angle}` : "APPROACH: Standard";
                const rulesText = SOP_GUIDELINES.map(r => `- ${r}`).join('\n');

                const draft = await callPerplexity([
                    {
                        role: "system", content: `You are the Strategy Lead for Synervion (a Functional Mushroom & Wellness Brand).
                    
CRITICAL INSTRUCTIONS:
1. YOUR TOPIC IS: "${topic}".
2. IF the topic is technical (AI, Space, Crypto), YOU MUST PIVOT IT to biology/mycology. Use the tech as a METAPHOR for nature.
3. IF the topic is totally irrelevant, REJECT IT by writing about: "The resilience of mycelial networks".
4. NEVER invent "lab results". If you lack data, cite external studies or general principles.

5. INCLUDE 3-5 relevant Hashtags at the end.
6. INCLUDE a "Sources" section at the very bottom with direct URLs to studies cited.

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
                        role: "system", content: `You are a STRICT Quality Analyst for LinkedIn posts.

OUTPUT FORMAT:
1. First line MUST be "SCORE: X/100".
2. Followed by "REPORT:" section with specific issues.

STRICT GRADING RUBRIC (INSTANT DEDUCTIONS):
- ANY citation markers [1], [2], etc. in text → -20 points
- "Sources" section present → -20 points
- Hashtags with space after # (e.g., "# MyceliumResilience") → -10 points
- ANY markdown headers (##, ###) → -15 points
- Paragraphs longer than 4 sentences → -5 points EACH
- Data/lists NOT in bullet format → -10 points
- Academic/clinical tone → -10 points
- "In our lab" without data → -15 points
- Missing hashtags or fewer than 3 → -10 points

Score 100 ONLY if:
✓ Zero citations/references
✓ Zero "Sources" section
✓ Hashtags formatted correctly (#Word no space)
✓ Short paragraphs (1-3 sentences)
✓ Bullets for lists/data
✓ Conversational tone
✓ 3-5 hashtags at end

NOTE: Visuals handled separately. Do NOT critique missing images.

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
                if (!req.body.candidates || !Array.isArray(req.body.candidates)) {
                    throw new Error("Missing candidates array");
                }
                const candidates = req.body.candidates.flat();
                if (candidates.length === 0) throw new Error("Candidates array is empty");

                console.log("[Router] Selecting winner from:", JSON.stringify(candidates));
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
                        role: "system", content: `You are a STRICT Social Media Editor for Synervion (Functional Mushrooms).

CRITICAL FORMATTING RULES (ZERO TOLERANCE):
1. **CITATIONS & SOURCES**:
   - KEEP research credibility: "A 2024 study from [Institution]..." or "Research shows..."
   - DELETE citation markers: Remove [1], [2], [3] numbers
   - DELETE "Sources" section: No bibliography at end
2. **HASHTAGS = PLAIN TEXT**: Use "#MyceliumResilience" NOT "# MyceliumResilience" (no space after #).
3. **NO MARKDOWN HEADERS**: Use **bold** for emphasis ONLY. Never use # ## ### for headers.
4. **SHORT PARAGRAPHS**: Maximum 3 sentences per paragraph. Split longer ones.
5. **USE BULLETS FOR DATA**: Flow rates, statistics, or lists MUST use bullet points (- or •).
6. **GENEROUS WHITESPACE**: Add blank lines between paragraphs and sections.
7. **CONVERSATIONAL + CREDIBLE**: Write like an expert talking to a peer. Back claims with research when available.
8. **NO FAKE LAB CLAIMS**: Change "In our lab" to "Industry research shows" or "Studies demonstrate".
9. **BOLD KEY INSIGHTS**: MANDATORY - Use **bold** for 2-3 critical phrases per paragraph. Example: "Mycelium networks exhibit **remarkable resilience** under stress, adapting **resource flows dynamically**."
10. **SOFTEN HARD DATA**: 
    - Exact percentages without attribution sound clinical/fabricated
    - "7% improvement" → "significant improvement" OR "Research from [Source] shows 7% improvement"
    - "18 cm/h flow" → "rapid water transport" OR keep if citing a study
11. **END WITH 3-5 HASHTAGS**: Plain text, space-separated, no headers.

CONTEXT:
${context}

GUIDELINES:
${rulesText}

OUTPUT ONLY THE FINAL POST. No commentary, no analysis.`
                    },
                    { role: "user", content: `Draft:\n${draft}\n\nCritique:\n${critique}\n\nPlease output ONLY the final rewritten post (skipping the analysis log).` }
                ]);
                return res.status(200).json({ refined_draft: refinedDraft });
            }

            case 'visual': {
                const { draft } = req.body;
                if (!draft) throw new Error("Missing draft");

                // 1. Concept
                const visualConcept = await callPerplexity([
                    {
                        role: "system",
                        content: `You are an Instagram Art Director for a PREMIUM WELLNESS BRAND.

CRITICAL: We need LIFESTYLE/NATURE photography for LinkedIn, NOT diagrams, charts, or academic illustrations.

GOOD VISUAL CONCEPTS:
- Close-up of fresh mushrooms in natural forest light
- Dewy moss and fungi on a mossy log
- Hands gently holding organic mushrooms
- Aesthetic nature scene with mushrooms in habitat
- Wellness lifestyle (person in nature, minimal)

BAD VISUAL CONCEPTS (REJECT):
- Scientific diagrams with arrows/labels/flowcharts
- Charts, graphs, data visualizations
- Microscope imagery or lab equipment
- Academic textbook-style illustrations
- Infographics with text overlays

Describe ONE striking visual concept that would stop a LinkedIn scroll. Focus on NATURAL BEAUTY and ORGANIC AESTHETICS.`
                    },
                    { role: "user", content: `Post Content:\n${draft}` }
                ]);

                // 2. Query
                const visualQueryRaw = await callPerplexity([
                    { role: "system", content: `Convert this visual concept into a search query for stock photo sites. Add negative keywords to exclude diagrams/charts. Output ONLY the query.` },
                    { role: "user", content: `Visual Concept: ${visualConcept}` }
                ]);
                const visualQuery = visualQueryRaw.replace(/^"|"$/g, '').trim() + " -diagram -chart -graph -infographic";

                // 3. Search Loop
                // Helper to verify image accessibility
                const verifyImage = async (url: string) => {
                    if (!url) return false;
                    try {
                        const res = await fetch(url, { method: 'HEAD', headers: IMAGE_HEADERS });
                        return res.ok;
                    } catch { return false; }
                };

                // 3. Search Sequence
                let imageUrl = "";

                // 1. High Quality Specific
                console.log(`[Agent: Visual] Attempting high-quality search: "${visualQuery} photorealistic 4k"`);
                let cand = await braveImageSearch(visualQuery + " photorealistic 4k", "Large");
                if (await verifyImage(cand || "")) imageUrl = cand!;

                // 2. Broad Specific
                if (!imageUrl) {
                    console.log(`[Agent: Visual] Attempting broad search: "${visualQuery}"`);
                    cand = await braveImageSearch(visualQuery);
                    if (await verifyImage(cand || "")) imageUrl = cand!;
                }

                // 3. Generic Fallback
                if (!imageUrl) {
                    console.log(`[Agent: Visual] Attempting generic fallback search: "functional mushrooms nature aesthetic"`);
                    cand = await braveImageSearch("functional mushrooms nature aesthetic", "Large");
                    if (await verifyImage(cand || "")) imageUrl = cand!;
                }

                // 4. Ultimate Fallback (Safe Mode)
                if (!imageUrl) {
                    console.log("[Agent: Visual] All searches failed. Using self-hosted safety fallback.");
                    // Self-hosted mushroom image (stable and always accessible)
                    const safeUrl = "https://synervion.com/mushroom-fallback.png";
                    imageUrl = safeUrl;
                }

                if (!imageUrl) throw new Error("CRITICAL: No images found and fallback failed");
                return res.status(200).json({ image_url: imageUrl });
            }

            case 'delivery': {
                const { topic, final_draft, image_url, qa_report } = req.body;

                // 1. Upload
                console.log(`[Agent: Delivery] Downloading image from: ${image_url}`);
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
