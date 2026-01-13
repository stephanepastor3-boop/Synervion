import 'dotenv/config';
import { Resend } from 'resend';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { promisify } from 'node:util';
import fetch from 'node-fetch';

// --- Configuration (Loaded from .env) ---
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const ORGANIZATION_ID = process.env.ORGANIZATION_ID || '105128149';
const BRAVE_API_KEY = process.env.BRAVE_API_KEY;
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CRON_SECRET = process.env.CRON_SECRET;
// Default to localhost for testing so the link works with 'npm run dev'
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

const gzip = promisify(zlib.gzip);

// Duplicate SOPs for simulation
const SOP_GUIDELINES = [
    "Voice: Professional, Scientific but Accessible. No 'fluff' or AI-sounding cliches (e.g. 'Unlock', 'Game-changer').",
    "Format: Short paragraphs (1-2 sentences). Generous whitespace. Bullet points for complex info.",
    "Structure: Strong Hook -> Evidence/Science -> Application -> Soft CTA.",
    "Content: Focus on Functional Mushrooms, Nutraceuticals, and Preventative Health.",
    "Accuracy: Citations or references to studies where possible.",
    "Visuals: Images must be realistic, high-contrast, professional. No abstract AI art.",
    "Authenticity: Write as a thought leader, not a sales bot.",
    "Human Connection: Use personal cues ('In our lab...', 'We believe...'). Show passion for mycology. Be scientific but warm."
];

const resend = new Resend(RESEND_API_KEY);

const TOPICS = [
    "The science behind Cordycepin and ATP production",
    "How Cordyceps Militaris boosts athletic performance naturally",
    "Sustainable lab-grown mushrooms vs. wild harvesting",
    "The future of functional foods in India 2026",
    "Boosting immune health with medicinal mushrooms",
    "Cordyceps for respiratory health and oxygen uptake",
    "Vegan nutraceuticals: The rise of plant-based performance",
    "Understanding the 'Keeda Jadi' legend and its modern evolution"
];

async function main() {
    console.log("--- SIMULATING DAILY POST GENERATION ---");

    if (!PERPLEXITY_API_KEY || !RESEND_API_KEY || !LINKEDIN_ACCESS_TOKEN || !CRON_SECRET) {
        console.error("ERROR: Missing required env vars in .env file.");
        console.error("Checked: PERPLEXITY_API_KEY, RESEND_API_KEY, LINKEDIN_ACCESS_TOKEN, CRON_SECRET");
        process.exit(1);
    }

    try {
        // 1. Select Topic
        const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
        console.log(`Topic: ${topic}`);

        // 2. Research (Brave)
        console.log("Running Research...");
        const researchData = await braveSearch(topic);

        // 3. Strict Workflow Cycle (Recursive Loop)
        console.log("Starting QA Loop...");
        let currentDraft = await generateDraft(topic, researchData, SOP_GUIDELINES);
        let attempts = 0;
        const MAX_ATTEMPTS = 3;
        let isPerfect = false;
        let lastCritique = "";

        while (attempts < MAX_ATTEMPTS && !isPerfect) {
            attempts++;
            console.log(`[QA Loop] Iteration ${attempts}/${MAX_ATTEMPTS}...`);

            lastCritique = await generateCritique(topic, currentDraft, SOP_GUIDELINES);

            if (lastCritique.includes("SCORE: 100") || lastCritique.includes("NO ISSUES")) {
                console.log("[QA Loop] Draft Passed QA!");
                isPerfect = true;
            } else {
                console.log("[QA Loop] Draft Failed QA. Refining...");
                // console.log("Critique:", lastCritique); // Debug
                currentDraft = await generateRefinedPost(topic, currentDraft, lastCritique, SOP_GUIDELINES);
            }
        }

        const finalPost = sanitizePost(currentDraft);
        console.log("\n--- FINAL DRAFT ---\n");
        console.log(finalPost);
        console.log("\n-------------------\n");

        // D. Visual Concept
        console.log("Generating Visuals...");
        const visualConcept = await generateVisualConcept(finalPost, SOP_GUIDELINES);
        const visualQuery = await generateOptimizedVisualQuery(visualConcept);
        const imageUrl = await braveImageSearchWithRetry(visualQuery);
        console.log("Image Found:", imageUrl);

        // 4. Prepare Asset
        console.log("Uploading Asset to LinkedIn (Staging)...");
        const imageBuffer = await downloadImageToBuffer(imageUrl);
        const assetUrn = await uploadImageToLinkedIn(imageBuffer);
        console.log("Asset Uploaded:", assetUrn);

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
            .createHmac('sha256', CRON_SECRET)
            .update(dataStr)
            .digest('hex');

        const approvalUrl = `${APP_URL}/api/approve-post?data=${dataStr}&sig=${sig}`;

        console.log("\n--- GENERATED APPROVAL LINK ---");
        console.log(approvalUrl);
        console.log("-------------------------------\n");

        // 6. Send Email
        console.log("Sending Email...");
        const emailResult = await resend.emails.send({
            from: 'Synervion Bot <bot@synervion.com>',
            to: 'stephane@synervion.com',
            subject: `[TEST] Review Required: ${topic}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <div style="background: #10b981; color: white; padding: 12px; border-radius: 8px 8px 0 0; text-align: center; font-weight: bold;">
                            TEST: Ready for Review
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
                        </div>
                         <div style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 20px;">
                            Iterations performed: ${attempts}
                        </div>
                    </div>
                </div>
            `
        });

        console.log("Email Sent!", emailResult);

    } catch (error) {
        console.error("FAILED:", error);
    }
}

// --- Agent Logic (Duplicated from Cron) ---

async function callPerplexity(messages) {
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
async function generateDraft(topic, context, guidelines) {
    const rulesText = guidelines.map(r => `- ${r}`).join('\n');
    return await callPerplexity([
        { role: "system", content: `You are the Lead Content Strategist for Synervion. Draft a LinkedIn post.\nGUIDELINES:\n${rulesText}` },
        { role: "user", content: `Topic: ${topic}\n\nContext:\n${context}` }
    ]);
}

async function generateCritique(topic, draft, guidelines) {
    const rulesText = guidelines.map(r => `- ${r}`).join('\n');
    return await callPerplexity([
        {
            role: "system", content: `You are a Harsh Social Media Editor. Critique this draft based on the guidelines. Is it Human? Is it Scientific?
        
IMPORTANT OUTPUT FORMAT:
1. First line MUST be "SCORE: X/100".
2. Followed by a "REPORT:" section.
3. If Perfect (100/100): List each checklist item with a [x] mark to confirm it passed.
4. If Failed (<100): List specifically what failed and needs fixing.

GUIDELINES:
${rulesText}`
        },
        { role: "user", content: `Draft:\n${draft}` }
    ]);
}

async function generateRefinedPost(topic, draft, critique, guidelines) {
    const rulesText = guidelines.map(r => `- ${r}`).join('\n');
    return await callPerplexity([
        { role: "system", content: `You are an Expert Copywriter. Rewrite this post to fix the issues identified in the critique. Ensure strict adherence to guidelines. Make it sound HUMAN.\nGUIDELINES:\n${rulesText}` },
        { role: "user", content: `Draft:\n${draft}\n\nCritique:\n${critique}` }
    ]);
}

// Visual Agents
async function generateVisualConcept(postContent, guidelines) {
    return await callPerplexity([
        { role: "system", content: `You are an Art Director. Describe a SINGLE, STRIKING visual concept for this post. Keep it realistic and scientific.` },
        { role: "user", content: `Post Content:\n${postContent}` }
    ]);
}

async function generateOptimizedVisualQuery(concept) {
    return await callPerplexity([
        { role: "system", content: `Convert this visual concept into a search query string for high-end stock photos. Output ONLY the query.` },
        { role: "user", content: `Visual Concept: ${concept}` }
    ]);
}

function sanitizePost(text) {
    return text
        .replace(/\[Image suggestion:.*?\]/gi, "")
        .replace(/\[.*?\]/g, "")
        .replace(/\*\*/g, "")
        .replace(/__/g, "")
        .trim();
}

// --- Integrations ---

async function braveSearch(query) {
    const url = new URL('https://api.search.brave.com/res/v1/web/search');
    url.searchParams.append('q', query);
    url.searchParams.append('count', '3');
    const response = await fetch(url.toString(), {
        headers: { 'Accept': 'application/json', 'Accept-Encoding': 'gzip', 'X-Subscription-Token': BRAVE_API_KEY }
    });
    if (!response.ok) throw new Error(`Brave Search failed: ${response.status}`);
    const json = await response.json();
    return json.web?.results?.map(r => `- ${r.title}: ${r.description}`).join('\n') || "No results.";
}

async function braveImageSearchWithRetry(query) {
    try {
        return await braveImageSearch(query);
    } catch (e) {
        console.warn("Retry image search...");
        return await braveImageSearch(query);
    }
}

async function braveImageSearch(query) {
    const url = new URL('https://api.search.brave.com/res/v1/images/search');
    url.searchParams.append('q', query);
    url.searchParams.append('count', '1');
    url.searchParams.append('size', 'Large');
    const response = await fetch(url.toString(), {
        headers: { 'Accept': 'application/json', 'X-Subscription-Token': BRAVE_API_KEY }
    });
    const json = await response.json();
    if (!json.results || json.results.length === 0) throw new Error("No images found.");
    return json.results[0].properties.url;
}

// Simple buffer download
async function downloadImageToBuffer(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to download image`);
    return await response.arrayBuffer();
}

async function uploadImageToLinkedIn(imageBuffer) {
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
    await new Promise(r => setTimeout(r, 2000));
    return assetUrn;
}

main();
