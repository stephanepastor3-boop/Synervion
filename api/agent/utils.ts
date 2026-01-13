import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// --- Configuration ---
export const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
export const ORGANIZATION_ID = process.env.ORGANIZATION_ID || '105128149';
export const BRAVE_API_KEY = process.env.BRAVE_API_KEY;
export const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
export const RESEND_API_KEY = process.env.RESEND_API_KEY;
export const CRON_SECRET = process.env.CRON_SECRET;
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://synervion.com';

// HARDCODED SOPs
export const SOP_GUIDELINES = [
    "Voice: Professional, Scientific but Accessible. No 'fluff' or AI-sounding cliches (e.g. 'Unlock', 'Game-changer').",
    "Format: Short paragraphs (1-2 sentences). Generous whitespace. Bullet points for complex info. NO PLACEHOLDERS.",
    "Structure: Strong Hook -> Evidence/Science -> Application -> Soft CTA.",
    "Content: High Engagement. Focus on Stories, Deep Science, or Myths. AVOID general 'Market Research' or 'Industry Growth' topics.",
    "Accuracy: Citations or references to studies where possible.",
    "Visuals: Images must be realistic, high-contrast, professional. No abstract AI art.",
    "Authenticity: Write as a thought leader, not a sales bot.",
    "Human Connection: Use personal cues ('In our lab...', 'We believe...'). Show passion for mycology. Be scientific but warm."
];

// Lazy load Resend to prevent top-level crashes
export function getResend() {
    if (!RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");
    return new Resend(RESEND_API_KEY);
}

export function debugEnvVars() {
    return {
        HAS_LINKEDIN: !!LINKEDIN_ACCESS_TOKEN,
        HAS_ORG: !!ORGANIZATION_ID,
        HAS_BRAVE: !!BRAVE_API_KEY,
        HAS_PERPLEXITY: !!PERPLEXITY_API_KEY,
        HAS_RESEND: !!RESEND_API_KEY,
        HAS_SECRET: !!CRON_SECRET,
        APP_URL_VAL: APP_URL
    };
}

// Security Middleware
export function checkAuth(req: VercelRequest, res: VercelResponse) {
    const authHeader = req.headers['authorization'];
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
        res.status(401).json({ error: 'Unauthorized' });
        return false;
    }
    return true;
}

// --- Helpers ---

export async function callPerplexity(messages: any[]) {
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

export async function braveSearch(query: string) {
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

export function sanitizePost(text: string) {
    return text
        .replace(/!.*?/g, "")
        .replace(/!\[.*?\]\(.*?\)/g, "")
        .replace(/\[Image suggestion:.*?\]/gi, "")
        .replace(/\[.*?\]/g, "")
        .replace(/\*\*/g, "")
        .replace(/__/g, "")
        .trim();
}
