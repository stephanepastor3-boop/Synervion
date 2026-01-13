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
// HARDCODED SOPs
export const SOP_GUIDELINES = [
    "Mission: You write for Synervion (a Functional Mushroom Brand). Every post MUST relate to Mushrooms, Mycelium, or Natural Wellness.",
    "Relevance: If the topic is technical (e.g. AI, Space, Tech), USE IT AS AN ANALOGY for biology/mushrooms. NEVER write about tech for tech's sake.",
    "Voice: Professional but grounded. Avoid 'LinkedIn Cliches' (e.g. 'Unlock', 'Game-changer', 'Delve').",
    "Truthfulness: NEVER invent 'lab results', 'experiments', or 'in our lab' stories. If you don't have specific data, speak to general industry knowledge.",
    "Format: Short paragraphs (1-2 sentences). Generous whitespace. Bullet points for dense info. NO MARKDOWN (**bold** is okay, but no # Headers).",
    "Structure: Strong Hook -> Evidence/Science -> Application -> Soft CTA.",
    "Visuals: Images must be realistic, high-contrast, professional. No abstract AI art.",
    "Human Connection: Use 'We believe...' for opinions only. Do not imply you are standing in a lab unless you are."
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

export async function callGemini(messages: any[], options?: { temperature?: number; maxTokens?: number }) {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        generationConfig: {
            temperature: options?.temperature ?? 0.7,
            maxOutputTokens: options?.maxTokens ?? 2048,
        }
    });

    const systemMessage = messages.find(m => m.role === 'system');
    const userMessages = messages.filter(m => m.role === 'user');
    const contents = userMessages.map(m => ({ role: 'user', parts: [{ text: m.content }] }));

    const chat = model.startChat({
        history: [],
        systemInstruction: systemMessage?.content
    });

    try {
        const result = await chat.sendMessage(contents[contents.length - 1].parts[0].text);
        return result.response.text();
    } catch (error: any) {
        console.error('[Gemini] Error:', error.message);
        throw new Error(`Gemini API call failed: ${error.message}`);
    }
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
