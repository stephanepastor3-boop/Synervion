import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { promisify } from 'node:util';

// --- Configuration ---
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const ORGANIZATION_ID = process.env.ORGANIZATION_ID || '105128149';
const BRAVE_API_KEY = process.env.BRAVE_API_KEY;
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CRON_SECRET = process.env.CRON_SECRET;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://synervion.com';

// Vercel Serverless Config
export const maxDuration = 300; // 5 minutes to allow for 15+ QA iterations

const gzip = promisify(zlib.gzip);

// HARDCODED SOPs (To ensure availability in Edge/Serverless without FS)
const SOP_GUIDELINES = [
    "Voice: Professional, Scientific but Accessible. No 'fluff' or AI-sounding cliches (e.g. 'Unlock', 'Game-changer').",
    "Format: Short paragraphs (1-2 sentences). Generous whitespace. Bullet points for complex info. NO PLACEHOLDERS.",
    "Structure: Strong Hook -> Evidence/Science -> Application -> Soft CTA.",
    "Content: High Engagement. Focus on Stories, Deep Science, or Myths. AVOID general 'Market Research' or 'Industry Growth' topics.",
    "Accuracy: Citations or references to studies where possible.",
    "Visuals: Images must be realistic, high-contrast, professional. No abstract AI art.",
    "Authenticity: Write as a thought leader, not a sales bot.",
    "Human Connection: Use personal cues ('In our lab...', 'We believe...'). Show passion for mycology. Be scientific but warm."
];

const resend = new Resend(RESEND_API_KEY);

const TOPICS = [
    "Case Study: How Cordyceps helped a pro-athlete recover in record time",
    "Deep Dive: The exact chemical process of ATP synthesis via Cordycepin",
    "New Research: Cordyceps Militaris vs. Traditional Caffeine",
    "Mycology Lab Diaries: What a 'perfect' harvest looks like",
    "Debunking the 'Zombie Fungus' myth with actual science",
    "Why gut health is the secret to mental clarity (ft. Lion's Mane)",
    "The 30-Day Cordyceps Challenge: What actually happens to your VO2 Max?"
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Security Check
    const authHeader = req.headers['authorization'];
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
        if (req.query.secret !== CRON_SECRET) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }

    try {
        console.log("--- Synervion Content Orchestrator (Quality Workflow) ---");

        // 1. Select Topic
        const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
        console.log(`Topic: ${topic}`);

        // 2. Research (Brave)
        const researchData = await braveSearch(topic);

        // 3. Strict Workflow Cycle (Recursive Loop)
        let currentDraft = await generateDraft(topic, researchData, SOP_GUIDELINES);
        let attempts = 0;
        const MAX_ATTEMPTS = 15;
        let isPerfect = false;
        let lastCritique = "";

        // Best Draft Retention
        let bestDraft = currentDraft;
        let bestScore = 0;
        let bestCritique = "";

        while (attempts < MAX_ATTEMPTS && !isPerfect) {
            attempts++;
            console.log(`[QA Loop] Iteration ${attempts}/${MAX_ATTEMPTS}...`);

            // Critique
            lastCritique = await generateCritique(topic, currentDraft, SOP_GUIDELINES);

            // Parse Score
            const scoreMatch = lastCritique.match(/SCORE:\s*(\d+)/i);
            const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

            console.log(`[QA Loop] Critique Score: ${score}/100`);

            if (score === 100 || lastCritique.includes("NO ISSUES")) {
                console.log("[QA Loop] Draft Passed QA (Perfect Score)!");
                bestDraft = currentDraft;
                bestScore = 100;
                bestCritique = lastCritique;
                isPerfect = true;
            } else if (attempts >= 8 && score >= 90) {
                console.log(`[QA Loop] Draft Accepted (High Quality Fallback: ${score}/100)`);
                bestDraft = currentDraft;
                bestScore = score;
                bestCritique = lastCritique;
                isPerfect = true;
            } else {
                // Monotonic Improvement Check
                if (score >= bestScore) {
                    bestScore = score;
                    bestDraft = currentDraft;
                    bestCritique = lastCritique;
                } else {
                    console.warn(`[QA Loop] Score dropped (${bestScore} -> ${score}). Reverting to best draft...`);
                    // Fallback to best draft, but keep using the NEW iteration count
                    currentDraft = bestDraft;
                    lastCritique = bestCritique;
                }

                console.log(`[QA Loop] Refining best draft (${bestScore}/100)...`);
                currentDraft = await generateRefinedPost(topic, currentDraft, lastCritique, SOP_GUIDELINES, researchData);
            }
        }

        // If we exit loop due to MAX_ATTEMPTS, check if we have a "Good Enough" draft
        if (!isPerfect) {
            if (bestScore >= 90) {
                console.log(`[QA Loop] Max attempts reached. Accepting Best Draft (${bestScore}/100).`);
                currentDraft = bestDraft; // Ensure we use the best one
                isPerfect = true;
            }
        }

        if (!isPerfect) {
            console.error("Failed to reach acceptable Quality Score. Aborting.");
            throw new Error(`QA Failed. Final Requirements not met. Last Critique: ${lastCritique}`);
        }

        const finalPost = sanitizePost(currentDraft);

        // D. Visual Concept
        console.log("Generating Visuals...");
        const visualConcept = await generateVisualConcept(finalPost, SOP_GUIDELINES);
        const visualQuery = await generateOptimizedVisualQuery(visualConcept);
        // Ensure query focuses on Cordyceps/Mushrooms specifically if relevant
        // Strategy: Specific -> Broader -> Topic-based -> Generic Safety Net
        const visualQueries = [
            visualQuery + " photorealistic 4k",
            visualQuery,
            `${topic} mushroom`,
            "functional mushrooms nature aesthetic 4k"
        ];

        let imageUrl = "";
        for (const q of visualQueries) {
            try {
                console.log(`Searching image: "${q}"...`);
                // braveImageSearchWithRetry has internal retry for network blips
                imageUrl = await braveImageSearchWithRetry(q);
                if (imageUrl) break;
            } catch (e) {
                console.warn(`Search failed for "${q}". Trying fallback...`);
            }
        }

        if (!imageUrl) throw new Error("CRITICAL: No images found after all fallbacks.");

        // 4. Prepare Asset (Upload NOW to have a ready URN)
        console.log("Uploading Asset...");
        const imageBuffer = await downloadImageToBuffer(imageUrl);
        const assetUrn = await uploadImageToLinkedIn(imageBuffer);

        // 5. Generate Approval Link
        const payload = JSON.stringify({
            topic,
            text: finalPost,
            imageUrn: assetUrn
        });

        // Compress and Encode
        const compressed = await gzip(payload);
        const dataStr = compressed.toString('base64url');

        // Sign
        const sig = crypto
            .createHmac('sha256', CRON_SECRET!)
            .update(dataStr)
            .digest('hex');

        const approvalUrl = `${APP_URL}/api/approve-post?data=${dataStr}&sig=${sig}`;

        // 6. Send Email
        console.log("Sending Email...");
        if (RESEND_API_KEY) {
            await resend.emails.send({
                from: 'Synervion Bot <bot@synervion.com>',
                to: 'stephane@synervion.com',
                subject: `⚡️ Review Required: ${topic}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                        <div style="background: #10b981; color: white; padding: 12px; border-radius: 8px 8px 0 0; text-align: center; font-weight: bold;">
                             Ready for Review
                        </div>
                        <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
                            <h2 style="margin-top: 0;">${topic}</h2>
                            
                            <div style="margin: 20px 0;">
                                <img src="${imageUrl}" alt="Visual" style="width: 100%; border-radius: 8px; border: 1px solid #ddd;" />
                            </div>

                            <div style="white-space: pre-wrap; background: #f9fafb; padding: 16px; border-radius: 8px; font-size: 15px; line-height: 1.6; border: 1px solid #e5e7eb;">${finalPost}</div>

                            <div style="margin-top: 24px; border-left: 4px solid #10b981; background: #ecfdf5; padding: 16px; border-radius: 4px;">
                                <h3 style="margin: 0 0 12px 0; color: #047857; font-size: 14px; text-transform: uppercase;">Quality Validation Report</h3>
                                <div style="font-size: 13px; color: #065f46; white-space: pre-wrap;">${lastCritique.replace('SCORE: 100', '').trim()}</div>
                            </div>
                            
                            <div style="margin-top: 24px; text-align: center;">
                                <a href="${approvalUrl}" 
                                   style="display: inline-block; background: #0a66c2; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(10, 102, 194, 0.2);">
                                   Approve & Publish to LinkedIn
                                </a>
                                <p style="font-size: 12px; color: #6b7280; margin-top: 12px;">
                                    Clicking this button will immediately publish this exact content to the Synervion page.
                                </p>
                            </div>

                            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
                            <div style="font-size: 12px; color: #9ca3af; text-align: center;">
                                Iterations performed: ${attempts}
                            </div>
                        </div>
                    </div>
                `
            });
        }

        return res.status(200).json({
            success: true,
            status: "DRAFT_SENT",
            topic
        });

    } catch (error: any) {
        console.error("Cron Execution Failed:", error);
        if (RESEND_API_KEY) {
            await resend.emails.send({
                from: 'Synervion Bot <bot@synervion.com>',
                to: 'stephane@synervion.com',
                subject: `FAILED: Daily Post Generation`,
                html: `<p>Error: ${error.message}</p><pre>${JSON.stringify(error, null, 2)}</pre>`
            });
        }
        return res.status(500).json({ error: error.message });
    }
}

// --- Agent Logic ---

async function callPerplexity(messages: any[]) {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
        },
        body: JSON.stringify({ model: "sonar-pro", messages: messages })
    });
    if (!response.ok) throw new Error(`Perplexity API failed: ${response.status}`);
    const json = await response.json();
    return json.choices[0].message.content;
}

// Text Agents
async function generateDraft(topic: string, context: string, guidelines: string[]) {
    const rulesText = guidelines.map(r => `- ${r}`).join('\n');
    return await callPerplexity([
        {
            role: "system", content: `You are the Lead Content Strategist for Synervion. Draft a LinkedIn post.
        
CRITICAL RULES:
1. Do NOT invent "lab results" or "in our lab" stories unless explicit data is provided.
2. If you lack specific data, use general phrases like "Research suggests..." or "Current studies show...".
3. NO generic CTAs like "What do you think?". Use specific questions like "Have you experimented with extraction temps?".

GUIDELINES:
${rulesText}`
        },
        { role: "user", content: `Topic: ${topic}\n\nContext:\n${context}` }
    ]);
}

async function generateCritique(topic: string, draft: string, guidelines: string[]) {
    const rulesText = guidelines.map(r => `- ${r}`).join('\n');
    return await callPerplexity([
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
}

async function generateRefinedPost(topic: string, draft: string, critique: string, guidelines: string[], researchData: string) {
    const rulesText = guidelines.map(r => `- ${r}`).join('\n');
    return await callPerplexity([
        {
            role: "system", content: `You are a Surgical Editor. Your job is to FIX the failed draft based on the critique.

CRITICAL INSTRUCTIONS:
1. Address EVERY failure in the REPORT.
2. If the critique says "Fake Authenticity" or "In our lab" is fabricated -> REMOVE IT immediately.
3. If the critique says "Weak Hook" -> WRITE A NEW HOOK.
4. Do not just "tweak". REWRITE sections that failed.
5. Verify citations against the CONTEXT provided below. Do not hallucinate studies.

CONTEXT (Use this for facts/citations):
${researchData}

GUIDELINES:
${rulesText}`
        },
        { role: "user", content: `Draft:\n${draft}\n\nCritique:\n${critique}` }
    ]);
}

// Visual Agents
async function generateVisualConcept(postContent: string, guidelines: string[]) {
    return await callPerplexity([
        { role: "system", content: `You are an Art Director. Describe a SINGLE, STRIKING visual concept for this post. Keep it realistic and scientific.` },
        { role: "user", content: `Post Content:\n${postContent}` }
    ]);
}

async function generateOptimizedVisualQuery(concept: string) {
    return await callPerplexity([
        { role: "system", content: `Convert this visual concept into a search query string for high-end stock photos. Output ONLY the query.` },
        { role: "user", content: `Visual Concept: ${concept}` }
    ]);
}

function sanitizePost(text: string) {
    return text
        .replace(/!.*?/g, "") // Remove image placeholders like !(image-placeholder)
        .replace(/!\[.*?\]\(.*?\)/g, "") // Remove standard markdown images
        .replace(/\[Image suggestion:.*?\]/gi, "")
        .replace(/\[.*?\]/g, "")
        .replace(/\*\*/g, "")
        .replace(/__/g, "")
        .trim();
}

// --- Integrations ---

async function braveSearch(query: string) {
    const url = new URL('https://api.search.brave.com/res/v1/web/search');
    url.searchParams.append('q', query);
    url.searchParams.append('count', '3');
    const response = await fetch(url.toString(), {
        headers: { 'Accept': 'application/json', 'Accept-Encoding': 'gzip', 'X-Subscription-Token': BRAVE_API_KEY! }
    });
    if (!response.ok) throw new Error(`Brave Search failed: ${response.status}`);
    const json = await response.json();
    return json.web?.results?.map((r: any) => `- ${r.title}: ${r.description}`).join('\n') || "No results.";
}

async function braveImageSearchWithRetry(query: string) {
    try {
        return await braveImageSearch(query);
    } catch (e) {
        console.warn("Retry image search...");
        return await braveImageSearch(query);
    }
}

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

    // 3. Verify (Simplified wait)
    await new Promise(r => setTimeout(r, 5000));
    return assetUrn;
}
