import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Env Vars
const BRAVE_API_KEY = process.env.BRAVE_API_KEY;
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const USER_EMAIL = 'stephane@synervion.com';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'https://synervion.com';

// Broader queries to ensure we get results. Filtering for /posts/ happens in code.
const SEARCH_QUERIES = [
    'site:linkedin.com/posts/ functional mushrooms',
    'site:linkedin.com/posts/ cordyceps',
    'site:linkedin.com/posts/ "lion\'s mane"',
    'site:linkedin.com/posts/ adaptogens wellness',
    'site:linkedin.com/posts/ nootropics focus'
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
    console.log("--- Daily LinkedIn Engagement Cron Started ---");

    if (!BRAVE_API_KEY || !PERPLEXITY_API_KEY || !RESEND_API_KEY) {
        console.error("Missing API Keys");
        return res.status(500).json({ error: "Missing API Keys" });
    }

    try {
        // 1. Search (Brave)
        // Try multiple queries if one fails? For now, pick random but make it robust.
        const query = SEARCH_QUERIES[Math.floor(Math.random() * SEARCH_QUERIES.length)];
        console.log(`Searching for: ${query}`);

        let results = await braveSearch(query);

        // Fallback: If strict site search fails, try a broader keyword search with "linkedin"
        if (!results || results.length === 0) {
            console.log("Strict search failed (0 results). Trying broader fallback...");
            const fallbackQuery = `linkedin ${query.replace('site:linkedin.com/posts/', '').trim()}`;
            console.log(`Fallback Query: ${fallbackQuery}`);
            results = await braveSearch(fallbackQuery);
        }

        console.log(`Brave Search returned ${results?.length || 0} results.`);

        if (!results || results.length === 0) {
            console.log("No results found even after fallback.");
            return res.status(200).json({ message: "No results found." });
        }

        // Filter for LinkedIn Post URLs
        const relevantPost = results.find((r: any) => r.url.includes('linkedin.com/posts/') || r.url.includes('/activity-'));

        if (!relevantPost) {
            console.log("Found results but no valid LinkedIn Post URLs. Top 3 results were:");
            results.slice(0, 3).forEach((r: any, i: number) => console.log(`   [${i}] ${r.title} -> ${r.url}`));
            return res.status(200).json({ message: "No direct post URLs in results." });
        }

        console.log(`Candidate selected: ${relevantPost.title} (${relevantPost.url})`);

        // 2. Draft Comment (Perplexity)
        const comment = await generateComment(relevantPost.title, relevantPost.description);
        console.log(`Draft: ${comment}`);

        // 3. Extract Activity ID
        // Handles: /posts/[slug]-activity-[ID] AND /feed/update/urn:li:activity:[ID]
        let activityId = '';
        const match = relevantPost.url.match(/activity[-:](\d+)/);
        if (match) {
            activityId = `urn:li:activity:${match[1]}`;
        } else {
            console.log("Could not extract Activity ID.");
            return res.status(200).json({ message: "Skipped: Invalid URL format." });
        }

        // 4. Send Email (Resend)
        const resend = new Resend(RESEND_API_KEY);
        const params = new URLSearchParams({
            id: activityId,
            comment: comment,
            redirect: relevantPost.url
        });
        const approvalUrl = `${APP_URL}/api/approve-linkedin-comment?${params.toString()}`;

        await resend.emails.send({
            from: 'Synervion Bot <bot@synervion.com>',
            to: [USER_EMAIL],
            subject: '⚡️ Approval Required: LinkedIn Engagement',
            html: `
            <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                <h2 style="color: #0f172a;">New Engagement Opportunity</h2>
                
                <div style="background-color: #f4f4f5; padding: 20px; border-radius: 12px; margin: 24px 0;">
                    <h3 style="margin-top: 0; color: #52525b; font-size: 14px; text-transform: uppercase;">Original Post</h3>
                    <p style="white-space: pre-wrap; font-style: italic;">"${(relevantPost.description || '').substring(0, 500)}..."</p>
                    <a href="${relevantPost.url}" style="color: #0ea5e9;">View Full Post &rarr;</a>
                </div>

                <div style="border-left: 4px solid #0ea5e9; padding-left: 20px; margin: 24px 0;">
                    <h3 style="margin-top: 0; color: #0ea5e9; font-size: 14px; text-transform: uppercase;">Proposed Comment</h3>
                    <p style="font-size: 16px; line-height: 1.6;">${comment}</p>
                </div>

                <div style="text-align: center; margin-top: 32px;">
                    <a href="${approvalUrl}" style="background-color: #0f172a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">Approve & Publish Now</a>
                </div>
            </div>
            `
        });

        console.log("Email sent.");
        return res.status(200).json({ success: true, activityId });

    } catch (error) {
        console.error("Cron Failed:", error);
        return res.status(500).json({ error: String(error) });
    }
}

// --- Helpers ---

async function braveSearch(query: string) {
    const url = new URL('https://api.search.brave.com/res/v1/web/search');
    url.searchParams.append('q', query);
    url.searchParams.append('count', '20'); // Increased context
    url.searchParams.append('freshness', 'pw');

    const response = await fetch(url.toString(), {
        headers: { 'Accept': 'application/json', 'Accept-Encoding': 'gzip', 'X-Subscription-Token': BRAVE_API_KEY! }
    });

    if (!response.ok) throw new Error(`Brave Search failed: ${response.status}`);
    const json = await response.json();
    return json.web?.results || [];
}

async function generateComment(title: string, snippet: string) {
    const prompt = `
    You are a thoughtful industry expert in Wellness (Synervion).
    Draft a short, engaging LinkedIn comment (max 2 sentences) for a post with this title and snippet.
    
    Title: ${title}
    Snippet: ${snippet}
    
    Rules:
    - authentic tone
    - no "Great post!" filler
    - intriguing perspective
    - Do NOT use hashtags.
    `;

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
        },
        body: JSON.stringify({
            model: "sonar-pro",
            messages: [
                { role: "system", content: "You are a social media engagement expert." },
                { role: "user", content: prompt }
            ]
        })
    });
    if (!response.ok) throw new Error(`Perplexity API failed: ${response.status}`);
    const json = await response.json();
    return json.choices[0].message.content.trim().replace(/^"|"$/g, '');
}
