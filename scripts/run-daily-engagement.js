
import fs from 'node:fs';
import path from 'node:path';
import { Buffer } from 'node:buffer';
import { setTimeout } from 'node:timers/promises';
import { execSync } from 'node:child_process';
import 'dotenv/config';

// Configuration
const BRAVE_API_KEY = process.env.BRAVE_API_KEY;
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN; // Needed for reading posts if we want to bypass authwall, but we will use "read_url_content" equivalent logic or just snippets if possible. 
// Actually, pure node script can't use "read_url_content" tool. We will rely on Brave Snippets or search results first. 
// But Brave search snippets are short.
// Strategy: Use Brave to find URL, then use a simple fetch? Or better, just rely on the snippet for the "Original Post" context if we can't scrape.
// Wait, `scripts/generate-daily-post.js` didn't scrape external URLs. It generated content from scratch.
// Challenge: Reading external LinkedIn posts without a browser/proxy is hard due to AuthWall.
// Solution: We will use Brave Search to find the post, and passing the snippet as "Post Content". The user can click the link to see full post.

const SEARCH_QUERIES = [
    'site:linkedin.com/posts/ "functional mushrooms" "trends"',
    'site:linkedin.com/posts/ "cordyceps" "market"',
    'site:linkedin.com/posts/ "wellness" "prevention"',
    'site:linkedin.com/posts/ "nutraceuticals" "innovation"'
];

async function main() {
    console.log("--- Daily LinkedIn Engagement Orchestrator ---");

    if (!BRAVE_API_KEY || !PERPLEXITY_API_KEY) {
        console.error("Missing API Keys (BRAVE_API_KEY or PERPLEXITY_API_KEY)");
        process.exit(1);
    }

    try {
        // 1. Search for Candidates
        const query = SEARCH_QUERIES[Math.floor(Math.random() * SEARCH_QUERIES.length)];
        console.log(`Step 1: Searching for "${query}"...`);
        const results = await braveSearch(query);

        if (!results || results.length === 0) {
            console.log("No results found.");
            return;
        }

        // Filter for actual posts (simple heuristic)
        const relevantPost = results.find(r => r.url.includes('/posts/'));

        if (!relevantPost) {
            console.log("No direct post URLs found.");
            return;
        }

        console.log(`   > Found candidate: ${relevantPost.title}`);
        console.log(`   > URL: ${relevantPost.url}`);

        // 2. Draft Comment
        console.log("\nStep 2: Drafting comment...");
        const comment = await generateComment(relevantPost.title, relevantPost.description);
        console.log(`   > Draft: "${comment}"`);

        // 3. Extract Activity ID
        // URL format: https://www.linkedin.com/posts/[slug]-activity-[ID]-...
        const match = relevantPost.url.match(/activity-(\d+)/);
        if (!match) {
            console.log("Could not extract Activity ID from URL.");
            return;
        }
        const activityId = `urn:li:activity:${match[1]}`;

        // 4. Send Approval Email
        console.log("\nStep 3: Sending Approval Email...");

        // Escape quotes for command line
        const escapedComment = comment.replace(/"/g, '\\"');
        const escapedContent = (relevantPost.description || "No preview available").replace(/"/g, '\\"');

        // Call the email script
        execSync(`node scripts/send-approval-email.js "${activityId}" "${escapedComment}" "${relevantPost.url}" "${escapedContent}"`, { stdio: 'inherit' });

    } catch (error) {
        console.error("Orchestrator Failed:", error);
        process.exit(1);
    }
}

// --- Helpers ---

async function braveSearch(query) {
    const url = new URL('https://api.search.brave.com/res/v1/web/search');
    url.searchParams.append('q', query);
    url.searchParams.append('count', 5);
    url.searchParams.append('freshness', 'pw'); // Past Week

    const response = await fetch(url.toString(), {
        headers: { 'Accept': 'application/json', 'Accept-Encoding': 'gzip', 'X-Subscription-Token': BRAVE_API_KEY }
    });

    if (!response.ok) throw new Error(`Brave Search failed: ${response.status}`);
    const json = await response.json();
    return json.web?.results || [];
}

async function generateComment(title, snippet) {
    const prompt = `
    You are a thoughtful industry expert in Wellness and Functional Mushrooms (Synervion).
    Draft a short, engaging LinkedIn comment (max 2 sentences) for a post with this title and snippet.
    
    Title: ${title}
    Snippet: ${snippet}
    
    Rules:
    - authentic tone
    - no "Great post!" filler
    - intriguing perspective
    - mention "functional nutrition" or similar if relevant
    - Do NOT use hashtags.
    `;

    return await callPerplexity([
        { role: "system", content: "You are a social media engagement expert." },
        { role: "user", content: prompt }
    ]);
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
    if (!response.ok) throw new Error(`Perplexity API failed: ${response.status}`);
    const json = await response.json();
    return json.choices[0].message.content.trim().replace(/^"|"$/g, '');
}

main();
