
import fs from 'node:fs';
import path from 'node:path';
import { Buffer } from 'node:buffer';
import { setTimeout } from 'node:timers/promises';
import 'dotenv/config';

// --- Configuration ---
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const ORGANIZATION_ID = process.env.ORGANIZATION_ID || '105128149';
const BRAVE_API_KEY = process.env.BRAVE_API_KEY;
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const GUIDELINES_FILE = path.join(process.cwd(), 'scripts', 'guidelines.json');

// Strategic Topics (Cordyceps & Nutraceuticals)
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
    try {
        console.log("--- Synervion Content Orchestrator (v6: Analyst Loop) ---");

        // 0. Load Guidelines
        console.log("\nStep 0: Loading Knowledge Base...");
        const guidelines = loadGuidelines();
        console.log(`   > Loaded ${guidelines.length} active rules.`);

        // 1. Select Topic
        const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
        console.log(`\nStep 1: Researching topic: "${topic}"...`);

        // 2. Research with Brave (Text)
        const researchData = await braveSearch(topic);
        console.log("   > Found matching research results.");

        // 3. Draft & Critique Loop
        console.log("\nStep 2: Drafting content...");
        const draft = await generateDraft(topic, researchData, guidelines);

        console.log("\nStep 3: Critiquing content...");
        const critique = await generateCritique(topic, draft, guidelines);
        console.log("   > Critique:", critique.substring(0, 100) + "...");

        console.log("\nStep 4: Refining final post...");
        const refinedContent = await generateRefinedPost(topic, draft, critique, guidelines);
        const finalPost = sanitizePost(refinedContent);

        console.log("\n   > FINAL POST CONTENT:\n");
        console.log("---------------------------------------------------");
        console.log(finalPost);
        console.log("---------------------------------------------------");

        // 4. VISUAL DIRECTOR AGENT LOOP
        console.log("\nStep 5: Conceptualizing Visual Strategy...");
        const visualConcept = await generateVisualConcept(finalPost, guidelines);
        console.log(`   > Concept: ${visualConcept}`);

        console.log("\nStep 6: Optimizing Search Query...");
        const visualQuery = await generateOptimizedVisualQuery(visualConcept);
        console.log(`   > Optimized Query: "${visualQuery}"`);

        // 5. Image Search & Download (With Retries)
        console.log("\nStep 7: Searching for authentic imagery...");
        let imagePath = path.join(process.cwd(), 'temp_post_image.jpg');
        const imageUrl = await braveImageSearchWithRetry(visualQuery);
        await downloadImage(imageUrl, imagePath);
        console.log(`   > Image downloaded to ${imagePath}`);

        // 6. Upload & Post
        console.log("\nStep 8: Uploading to LinkedIn...");
        const assetUrn = await uploadImageToLinkedIn(imagePath);
        console.log(`   > Asset URI: ${assetUrn}`);

        console.log("\nStep 9: Publishing...");
        const postResult = await postToLinkedIn(finalPost, assetUrn);

        // 7. ANALYST AGENT (Post-Mortem)
        console.log("\nStep 10: Analyst Review (Self-Improvement)...");
        const analystFeedback = await analyzePost(finalPost, guidelines, postResult.id);
        console.log(`   > Analyst Output: ${analystFeedback}`);

        if (analystFeedback && analystFeedback.trim() !== "None" && analystFeedback.trim() !== "No new rules.") {
            updateGuidelines(analystFeedback);
            console.log("   > GUIDELINES UPDATED with new lesson.");
        } else {
            console.log("   > No new lessons learned this time.");
        }

        // Cleanup
        fs.unlinkSync(imagePath);

    } catch (error) {
        console.error("\nERROR:", error.message);
        if (error.cause) console.error("Cause details:", error.cause);
        process.exit(1);
    }
}

// --- Knowledge Base Functions ---

function loadGuidelines() {
    try {
        if (fs.existsSync(GUIDELINES_FILE)) {
            const data = fs.readFileSync(GUIDELINES_FILE, 'utf8');
            return JSON.parse(data).rules || [];
        }
    } catch (e) {
        console.warn("Failed to load guidelines.json, starting fresh.");
    }
    return [];
}

function updateGuidelines(newRule) {
    try {
        let currentRules = loadGuidelines();
        // Avoid duplicates (simple check)
        if (!currentRules.includes(newRule)) {
            currentRules.push(newRule);
            fs.writeFileSync(GUIDELINES_FILE, JSON.stringify({ rules: currentRules }, null, 2));
        }
    } catch (e) {
        console.error("Failed to update guidelines:", e);
    }
}

// --- Text Agent Functions ---

async function generateDraft(topic, context, guidelines) {
    const rulesText = guidelines.map(r => `- ${r}`).join('\n');
    return await callPerplexity([
        {
            role: "system",
            content: `You are the Lead Content Strategist for Synervion. Draft a LinkedIn post about the topic.
            
            PERSISTENT GUIDELINES (MUST FOLLOW):
            ${rulesText}`
        },
        { role: "user", content: `Topic: ${topic}\n\nContext:\n${context}` }
    ]);
}

async function generateCritique(topic, draft, guidelines) {
    const rulesText = guidelines.map(r => `- ${r}`).join('\n');
    return await callPerplexity([
        {
            role: "system",
            content: `You are a Harsh Social Media Critic. Critique this draft against our Internal Guidelines.
            
            GUIDELINES:
            ${rulesText}
            
            Is it boring? Does it sound like AI? Be ruthless.`
        },
        { role: "user", content: `Draft:\n${draft}` }
    ]);
}

async function generateRefinedPost(topic, draft, critique, guidelines) {
    const rulesText = guidelines.map(r => `- ${r}`).join('\n');
    return await callPerplexity([
        {
            role: "system",
            content: `You are an Expert Copywriter. Rewrite this post based on the critique.
            
            CRITICAL RULES & GUIDELINES:
            ${rulesText}
            
            Also:
            - Short paragraphs. Punchy. Under 1200 chars.`
        },
        { role: "user", content: `Draft:\n${draft}\n\nCritique:\n${critique}` }
    ]);
}

// --- Visual Director Agent Functions ---

async function generateVisualConcept(postContent, guidelines) {
    const rulesText = guidelines.map(r => `- ${r}`).join('\n');
    return await callPerplexity([
        {
            role: "system",
            content: `You are an Award-Winning Art Director.
            Task: Read this LinkedIn post and describe a SINGLE, STRIKING visual concept.
            
            GUIDELINES:
            ${rulesText}
            
            Additional Rules:
            - AVOID complex human scenes (like "people climbing stairs") unless specified otherwise.
            - PREFER Macro Nature, Abstract/Scientific, or Editorial styles.
            - The concept must look expensive and authentic.`
        },
        { role: "user", content: `Post Content:\n${postContent}` }
    ]);
}

async function generateOptimizedVisualQuery(concept) {
    return await callPerplexity([
        {
            role: "system",
            content: `You are an expert at searching for high-end stock photography.
            Task: Convert this visual concept into a search query string.
            
            RULES:
            1. START with the main subject.
            2. ADD quality boosters: "award-winning photography", "macro", "8k", "highly detailed", "dramatic lighting", "depth of field", "unsplash style".
            3. IGNORE generic terms.
            4. Output ONLY the query string.`
        },
        { role: "user", content: `Visual Concept: ${concept}` }
    ]);
}

// --- Analyst Agent (Feedback Loop) ---
async function analyzePost(finalPost, currentRules, postId) {
    return await callPerplexity([
        {
            role: "system",
            content: `You are a Quality Assurance Analyst. You review published LinkedIn posts to improve future content.
            
            TASK: Read the final post below. Compare it against the Current Rules.
            Did we miss anything? 
            - Are headlines strong?
            - Are hashtags present?
            - Is the tone right?
            - Are there any bracketed citations [1]? (Failure)
            
            OUTPUT:
            - If the post is good, reply "None".
            - If you find a RECURRING issue to fix, write a single concise Rule String to add to the guidelines (e.g., "Always ensure 3 line breaks after the hook").`
        },
        { role: "user", content: `Current Rules:\n${JSON.stringify(currentRules)}\n\nFinal Post:\n${finalPost}\n\nPost ID: ${postId}` }
    ]);
}

function sanitizePost(text) {
    return text.replace(/\*\*/g, "").replace(/\*/g, "").replace(/__/g, "").trim();
}

async function callPerplexity(messages) {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
        },
        body: JSON.stringify({ model: "sonar-pro", messages: messages })
    });
    if (!response.ok) throw new Error(`Perplexity API failed: ${response.status}`, { cause: await response.text() });
    const json = await response.json();
    return json.choices[0].message.content;
}

// --- Brave Functions ---

async function braveSearch(query) {
    const url = new URL('https://api.search.brave.com/res/v1/web/search');
    url.searchParams.append('q', query);
    url.searchParams.append('count', 3);
    const response = await fetch(url.toString(), {
        headers: { 'Accept': 'application/json', 'Accept-Encoding': 'gzip', 'X-Subscription-Token': BRAVE_API_KEY }
    });
    if (!response.ok) throw new Error(`Brave Search failed: ${response.status}`);
    const json = await response.json();
    return json.web?.results?.map(r => `- ${r.title}: ${r.description}`).join('\n') || "No results.";
}

async function braveImageSearchWithRetry(query) {
    const maxRetries = 5;
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            return await braveImageSearch(query);
        } catch (error) {
            attempt++;
            if (attempt >= maxRetries) throw new Error(`Brave Image Search failed after ${maxRetries} attempts: ${error.message}`);

            const delay = Math.pow(2, attempt) * 1000;
            console.warn(`   > Image Search failed (Attempt ${attempt}). Retrying in ${delay / 1000}s...`);
            await setTimeout(delay);
        }
    }
}

async function braveImageSearch(query) {
    const url = new URL('https://api.search.brave.com/res/v1/images/search');
    url.searchParams.append('q', query);
    url.searchParams.append('count', 1);
    url.searchParams.append('safesearch', 'strict');
    url.searchParams.append('size', 'Large');

    const response = await fetch(url.toString(), {
        headers: { 'Accept': 'application/json', 'Accept-Encoding': 'gzip', 'X-Subscription-Token': BRAVE_API_KEY }
    });

    if (!response.ok) throw new Error(`API Error ${response.status}: ${response.statusText}`);
    const json = await response.json();
    const results = json.results;
    if (!results || results.length === 0) throw new Error("No images found for query.");
    return results[0].properties.url;
}

async function downloadImage(url, dest) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to download image: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(dest, buffer);
}

// --- LinkedIn Functions ---

async function uploadImageToLinkedIn(filePath) {
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

    if (!regRes.ok) throw new Error("Image Register Failed", { cause: await regRes.text() });
    const regJson = await regRes.json();
    const uploadUrl = regJson.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
    const assetUrn = regJson.value.asset;

    const fileBuffer = fs.readFileSync(filePath);
    const upRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`, 'Content-Type': 'application/octet-stream' },
        body: fileBuffer
    });
    if (!upRes.ok) throw new Error("Image Binary Upload Failed");

    for (let i = 0; i < 10; i++) {
        const check = await fetch(`https://api.linkedin.com/v2/assets/${assetUrn.split(':').pop()}`, {
            headers: { 'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}` }
        });
        const checkJson = await check.json();
        if (checkJson.recipes?.[0]?.status === 'AVAILABLE') return assetUrn;
        await setTimeout(1000);
    }
    throw new Error("Image processing timed out");
}

async function postToLinkedIn(text, imageUrn) {
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

    if (!response.ok) throw new Error(`LinkedIn API failed: ${response.status}`, { cause: await response.text() });
    const json = await response.json();
    console.log("\nSuccess! Post ID:", json.id);
    return json;
}

main();
