import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkAuth, braveSearch, SOP_GUIDELINES, BRAVE_API_KEY, getResend, debugEnvVars, APP_URL, LINKEDIN_ACCESS_TOKEN, ORGANIZATION_ID, CRON_SECRET } from './_utils.js';
import { callGemini } from './_gemini.js';
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
            case 'discover-topic': {
                const topicIdeaRaw = await callGemini([
                    {
                        role: "system",
                        content: `You are a Trend Research Analyst for Synervion (Functional Mushrooms & Wellness).

TASK: Generate ONE engaging LinkedIn post topic for TODAY based on:
1. Current trending wellness/health topics  
2. Functional mushroom research (Lion's Mane, Reishi, Cordyceps, etc.)
3. High engagement potential (curiosity, myth-busting, practical value)

RULES:
- Topic MUST connect to functional mushrooms or natural wellness
- Should feel timely and relevant (NOT evergreen basics like "Benefits of Mushrooms")
- Prefer: Analogies to current events/tech, surprising science, practical applications
- Avoid: Generic topics like "Mushroom Nutrition 101"

GOOD EXAMPLES:
- "Mycelial Networks vs Neural Networks: Nature's Original AI"
- "Why Your Morning Routine Needs Fungi, Not More Caffeine"
- "The Mushroom Mechanism Behind Better Focus (Without Stimulants)"

OUTPUT FORMAT (must be valid JSON):
{
  "topic": "The Science Behind Mushroom Adaptogens",
  "angle": "How fungi help your brain adapt to modern stress",
  "hook": "What if resilience isn't about working harder, but working smarter?"
}

Output ONLY valid JSON, nothing else.`
                    }
                ]);

                try {
                    // Strip markdown code blocks that Gemini sometimes adds
                    let cleanedResponse = topicIdeaRaw
                        .replace(/```json\n?/g, '')
                        .replace(/```\n?/g, '')
                        .trim();
                    const topic = JSON.parse(cleanedResponse);
                    return res.status(200).json(topic);
                } catch (parseError) {
                    console.error('[Agent: discover-topic] JSON parse failed:', topicIdeaRaw);
                    // Fallback to default topic
                    return res.status(200).json({
                        topic: "Functional Mushrooms for Daily Wellness",
                        angle: "How natural adaptogens support modern life",
                        hook: "What if the resilience you need comes from nature, not supplements?"
                    });
                }
            }

            case 'research': {
                const { topic } = req.body;
                if (!topic) throw new Error("Missing 'topic'");

                // 1. Sanitize Topic (The "Pivot" Step)
                const searchQueryRaw = await callGemini([
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

                const draft = await callGemini([
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
                const critique = await callGemini([
                    {
                        role: "system", content: `You are a STRICT Quality Analyst for LinkedIn posts.

OUTPUT FORMAT (MANDATORY):
Line 1: "SCORE: X/100"
Line 2: "REPORT:"
Lines 3+: Full checklist with ALL criteria (use ✅ for pass, ❌ for fail with -X points)

COMPREHENSIVE CHECKLIST (Grade ALL 12 items):

**FORMATTING RULES:**
1. ✅/❌ Research studies linked as URLs inline: [study](https://url.com) (-20 if missing URLs or using [1][2] markers)
2. ✅/❌ No separate "Sources" section at end (-15 if present)
3. ✅/❌ Hashtags formatted correctly: #Word not # Word (-10 if spaces)
4. ✅/❌ Paragraphs are flexible (1-5 sentences) (-5 per >5 violation)
5. ✅/❌ Bold formatting used GENEROUSLY for key insights (-15 if sparse or missing)
6. ✅/❌ Generous whitespace between sections (-5 if cramped)
7. ✅/❌ No citation markers [1][2][3] in text (-20 if present)

**CONTENT QUALITY:**
8. ✅/❌ Conversational tone (-10 if academic phrases: "promote", "well-being", "bioactive compounds", "longevity")
9. ✅/❌ No unsourced claims (-15 if "Industry research shows" without URL link)
10. ✅/❌ Specific practical examples (-10 if generic like "Imagine before a big project")
11. ✅/❌ 3-5 hashtags present (-10 if missing or wrong count)
12. ✅/❌ Hook/opening grabs attention (-5 if generic)

CRITICAL: Verify EVERY criterion carefully. Do NOT mark ✅ unless criterion is ACTUALLY met.

GRADING TARGET: 98-100 points required. Be harsh.

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
                const refinedDraft = await callGemini([
                    {
                        role: "system", content: `You are a STRICT Social Media Editor for Synervion (Functional Mushrooms).

CRITICAL REQUIREMENTS (TARGET: 98-100/100 SCORE):

1. **RESEARCH CITATIONS AS INLINE URL LINKS (MANDATORY)**:
   - ALWAYS link studies/research as clickable URLs: "A [2010 study](https://pubmed.ncbi.nlm.nih.gov/12345) showed..."
   - NEVER use [1][2][3] citation markers
   - NEVER create separate "Sources" section
   - Format: "[descriptive text](full URL)" - Make the link text natural
   - Example: "Research from [University of X](https://url.com) found that..."

2. **GENEROUS BOLD FORMATTING (MANDATORY)**:
   - Bold 2-3 KEY INSIGHTS per paragraph minimum
   - Bold benefits, mechanisms, specific findings
   - Example: "Lion's Mane contains compounds that **support nerve health** and may **boost cognitive function** naturally."
   - If in doubt, err on side of MORE bold

3. **FLEXIBLE PARAGRAPHS**:
   - Prefer 1-3 sentences (keeps it punchy)
   - Allow 4-5 sentences when narrative flow requires it
   - ONLY split if paragraph exceeds 5 sentences

4. **BULLETS FOR LISTS ONLY**:
   - Use bullets for comparative lists or multiple data points
   - Use paragraphs for narrative/explanatory content
   - Don't force bullets everywhere

5. **CONVERSATIONAL LANGUAGE (STRICT)":
   - BANNED WORDS (rewrite immediately):
     * "promote" → "support" or "boost"
     * "well-being" → "wellness" or "how you feel"
     * "bioactive compounds" → "active ingredients" or just "compounds"
     * "longevity" → "living longer"
     * "significant" (without source) → "noticeable" or "real"
   - Write like talking to a friend over coffee

6. **NO UNSOURCED CLAIMS**:
   - "Industry research shows..." is BANNED unless you provide the URL link
   - Every fact needs either a URL or softening ("may", "research suggests")

7. **SPECIFIC EXAMPLES (NOT GENERIC)**:
   - BANNED: "Imagine using it before a big project"
   - GOOD: "Try it 30 minutes before your morning workout" or "Add to your 9am coffee ritual"

8. **HASHTAGS**: 3-5 relevant hashtags at end (e.g., #FunctionalMushrooms #Focus)

9. **WHITESPACE**: Blank lines between paragraphs for readability

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
                const visualConcept = await callGemini([
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
                const visualQueryRaw = await callGemini([
                    { role: "system", content: `Convert this visual concept into a search query for stock photo sites. Add negative keywords to exclude diagrams/charts. Output ONLY the query.` },
                    { role: "user", content: `Visual Concept: ${visualConcept}` }
                ]);
                const visualQuery = visualQueryRaw.replace(/^"|"$/g, '').trim() +
                    " nature photography lifestyle -diagram -chart -graph -infographic -illustration -botanical -vintage -numbered -scientific -labeled -specimen -textbook";

                // 3. Search Loop with URL Pattern Filtering
                const rejectPatterns = ['vintage', 'botanical', 'illustration', '18', '19',
                    'specimen', 'scientific', 'diagram', 'fischer', 'jena',
                    'drawing', 'engraving', 'sketch', 'textbook', 'numbered'];

                // Helper to verify image accessibility
                async function verifyImage(url: string): Promise<boolean> {
                    if (!url) return false;
                    try {
                        const res = await fetch(url, { method: 'HEAD', headers: IMAGE_HEADERS });
                        return res.ok;
                    } catch { return false; }
                };

                // 3. Search Sequence with URL filtering
                let imageUrl = "";
                const searchQueries = [
                    visualQuery + " photorealistic 4k",
                    visualQuery,
                    "functional mushrooms nature aesthetic"
                ];

                for (const searchQuery of searchQueries) {
                    console.log(`[Agent: Visual] Searching: ${searchQuery}`);
                    const imageResult = await braveImageSearch(searchQuery);

                    // braveImageSearch returns a single URL string, not an array
                    if (!imageResult) continue;

                    // Check URL for suspicious patterns
                    const isRejected = rejectPatterns.some(pattern =>
                        imageResult.toLowerCase().includes(pattern)
                    );

                    if (isRejected) {
                        console.log(`[Agent: Visual] Rejected URL (pattern match): ${imageResult}`);
                        continue; // Try next search query
                    }

                    // Verify image accessibility
                    if (await verifyImage(imageResult)) {
                        imageUrl = imageResult;
                        console.log(`[Agent: Visual] Selected image: ${imageUrl}`);
                        break; // Found valid image, exit search loop
                    }
                }

                // 4. Ultimate Fallback (Safe Mode)
                if (!imageUrl) {
                    console.log("[Agent: Visual] All searches failed. Using self-hosted safety fallback.");
                    imageUrl = "https://synervion.com/mushroom-fallback.png";
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
