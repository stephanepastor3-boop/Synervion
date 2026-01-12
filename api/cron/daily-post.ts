import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// --- Configuration ---
// Note: Secrets are loaded from Vercel Environment Variables
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const ORGANIZATION_ID = process.env.ORGANIZATION_ID || '105128149';
const BRAVE_API_KEY = process.env.BRAVE_API_KEY;
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CRON_SECRET = process.env.CRON_SECRET;

const GUIDELINES_FILE_URL = 'https://raw.githubusercontent.com/stephanepastor3-boop/Synervion/main/scripts/guidelines.json';
// Since we can't easily write to FS in Vercel to persist guidelines, for now we will just READ them from the repo or use defaults.
// To truly persist "learning", we'd need a database (KV, Postgres, etc.). 
// For this iteration, we accept that "updates" are ephemeral or need a DB. We will focus on reading.

const resend = new Resend(RESEND_API_KEY);

// Strategic Topics
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Security Check
    const authHeader = req.headers['authorization'];
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
        // Allow manual trigger if secret matches query param for testing ?secret=...
        if (req.query.secret !== CRON_SECRET) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }

    try {
        console.log("--- Synervion Content Orchestrator (Vercel Cron) ---");

        // 0. Load Guidelines (Fetch from Repo or Default)
        const guidelines = await fetchGuidelines();

        // 1. Select Topic
        const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
        console.log(`Topic: ${topic}`);

        // 2. Research
        const researchData = await braveSearch(topic);

        // 3. Draft & Critique
        const draft = await generateDraft(topic, researchData, guidelines);
        const critique = await generateCritique(topic, draft, guidelines);
        const refinedContent = await generateRefinedPost(topic, draft, critique, guidelines);
        const finalPost = sanitizePost(refinedContent);

        // 4. Visuals
        const visualConcept = await generateVisualConcept(finalPost, guidelines);
        const visualQuery = await generateOptimizedVisualQuery(visualConcept);
        const imageUrl = await braveImageSearchWithRetry(visualQuery);

        // 5. Download Image to Buffer (Memory)
        const imageBuffer = await downloadImageToBuffer(imageUrl);

        // 6. Upload to LinkedIn
        const assetUrn = await uploadImageToLinkedIn(imageBuffer);

        // 7. Publish
        const postResult = await postToLinkedIn(finalPost, assetUrn);
        const postUrl = `https://www.linkedin.com/feed/update/${postResult.id}`;

        // 8. Analyst Review (Feedback Loop - Log Only)
        const analystFeedback = await analyzePost(finalPost, guidelines, postResult.id);

        // 9. Send Email Notification
        if (RESEND_API_KEY) {
            await resend.emails.send({
                from: 'Synervion Bot <bot@synervion.com>', // Ensure you have a verified domain or use 'onboarding@resend.dev' for testing
                to: 'stephane@synervion.com',
                subject: `LinkedIn Post Published: ${topic}`,
                html: `
                    <h1>Daily Post Published Successfully!</h1>
                    <p><strong>Topic:</strong> ${topic}</p>
                    <p><strong>Link:</strong> <a href="${postUrl}">${postUrl}</a></p>
                    <hr />
                    <h3>Content:</h3>
                    <p style="white-space: pre-wrap;">${finalPost}</p>
                    <hr />
                    <h3>Analyst Feedback:</h3>
                    <p>${analystFeedback}</p>
                    <br />
                    <img src="${imageUrl}" alt="Post Image" style="max-width: 100%; border-radius: 8px;" />
                `
            });
            console.log("Email notification sent.");
        }

        return res.status(200).json({
            success: true,
            postUrl,
            topic,
            analystFeedback
        });

    } catch (error: any) {
        console.error("Error executing daily post:", error);
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

// --- Helpers ---

// Mocking guidelines for now, ideal: fetch from DB/Repo
async function fetchGuidelines() {
    try {
        const resp = await fetch(GUIDELINES_FILE_URL);
        if (resp.ok) {
            const json = await resp.json();
            return json.rules || [];
        }
    } catch (e) { console.error("Failed to fetch guidelines", e); }
    return [];
}

// ... Reusing Logic from Script ...

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
        { role: "system", content: `You are the Lead Content Strategist for Synervion. Draft a LinkedIn post.\nGUIDELINES:\n${rulesText}` },
        { role: "user", content: `Topic: ${topic}\n\nContext:\n${context}` }
    ]);
}

async function generateCritique(topic: string, draft: string, guidelines: string[]) {
    const rulesText = guidelines.map(r => `- ${r}`).join('\n');
    return await callPerplexity([
        { role: "system", content: `You are a Harsh Social Media Critic. Critique this draft.\nGUIDELINES:\n${rulesText}` },
        { role: "user", content: `Draft:\n${draft}` }
    ]);
}

async function generateRefinedPost(topic: string, draft: string, critique: string, guidelines: string[]) {
    const rulesText = guidelines.map(r => `- ${r}`).join('\n');
    return await callPerplexity([
        { role: "system", content: `You are an Expert Copywriter. Rewrite this post.\nCRITICAL RULES:\n${rulesText}` },
        { role: "user", content: `Draft:\n${draft}\n\nCritique:\n${critique}` }
    ]);
}

// Visual Agents
async function generateVisualConcept(postContent: string, guidelines: string[]) {
    return await callPerplexity([
        { role: "system", content: `You are an Art Director. Describe a SINGLE, STRIKING visual concept for this post.` },
        { role: "user", content: `Post Content:\n${postContent}` }
    ]);
}

async function generateOptimizedVisualQuery(concept: string) {
    return await callPerplexity([
        { role: "system", content: `Convert this visual concept into a search query string for high-end stock photos. Output ONLY the query.` },
        { role: "user", content: `Visual Concept: ${concept}` }
    ]);
}

async function analyzePost(finalPost: string, currentRules: string[], postId: string) {
    return await callPerplexity([
        { role: "system", content: `Quality Assurance Analyst. Review the post. If good, reply "None". If recurring issue, write a Rule String.` },
        { role: "user", content: `Current Rules:\n${JSON.stringify(currentRules)}\n\nFinal Post:\n${finalPost}\n\nPost ID: ${postId}` }
    ]);
}

function sanitizePost(text: string) {
    return text.replace(/\*\*/g, "").replace(/\*/g, "").replace(/__/g, "").trim();
}

// Brave
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
    // Simplified retry logic
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

// Image & LinkedIn - Adjusted for Serverless (Buffers)
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

async function postToLinkedIn(text: string, imageUrn: string) {
    const postData = {
        "author": `urn:li:organization:${ORGANIZATION_ID}`,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": { "text": text },
                "shareMediaCategory": "IMAGE",
                "media": [{ "status": "READY", "description": { "text": "Synervion" }, "media": imageUrn, "title": { "text": "Synervion" } }]
            }
        },
        "visibility": { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" }
    };

    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`, 'Content-Type': 'application/json', 'X-Restli-Protocol-Version': '2.0.0' },
        body: JSON.stringify(postData)
    });

    const json = await response.json();
    if (!response.ok) throw new Error(`LinkedIn Post Failed: ` + JSON.stringify(json));
    return json;
}
