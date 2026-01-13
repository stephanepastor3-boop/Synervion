import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { promisify } from 'node:util';

// --- Configuration ---
const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const ORGANIZATION_ID = process.env.ORGANIZATION_ID || '105128149';
const CRON_SECRET = process.env.CRON_SECRET; // Used as HMAC secret

const unzip = promisify(zlib.gunzip);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).send('Method Not Allowed');
    }

    const { data, sig } = req.query;

    if (!data || !sig || typeof data !== 'string' || typeof sig !== 'string') {
        return res.status(400).send('Invalid Link: Missing data or signature.');
    }

    if (!CRON_SECRET || !LINKEDIN_ACCESS_TOKEN) {
        return res.status(500).send('Server Error: Missing Secrets.');
    }

    try {
        // 1. Verify Signature
        const expectedSig = crypto
            .createHmac('sha256', CRON_SECRET)
            .update(data)
            .digest('hex');

        if (sig !== expectedSig) {
            return res.status(403).send('Invalid Link: Signature mismatch. This link may have been tampered with.');
        }

        // 2. Decode and Decompress Payload
        const buffer = Buffer.from(data, 'base64url');
        const decompressed = await unzip(buffer);
        const payload = JSON.parse(decompressed.toString('utf8'));

        const { text, imageUrn, topic } = payload;

        if (!text || !imageUrn) {
            return res.status(400).send('Invalid Payload: Missing content.');
        }

        // 3. Post to LinkedIn
        console.log(`[ApprovalAPI] Posting for topic "${topic}"...`);
        const result = await postToLinkedIn(text, imageUrn);

        // 4. Success Response
        const postUrl = `https://www.linkedin.com/feed/update/${result.id}`;

        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Published Successfully</title>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; text-align: center; background: #fdfdfd; color: #333; }
                    .success-icon { font-size: 48px; margin-bottom: 20px; }
                    .btn { display: inline-block; background: #0a66c2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; font-weight: 600; margin-top: 20px; }
                    .card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #eee; }
                    h1 { font-size: 24px; margin-bottom: 10px; color: #166534; }
                </style>
            </head>
            <body>
                <div class="card">
                    <div class="success-icon">✅</div>
                    <h1>Post Published!</h1>
                    <p>Your content is now live on the Synervion LinkedIn page.</p>
                    <a href="${postUrl}" class="btn" target="_blank">View Live Post</a>
                </div>
            </body>
            </html>
        `);

    } catch (error: any) {
        console.error("Approval Execution Failed:", error);
        return res.status(500).send(`
            <h1>Execution Failed</h1>
            <p>We verified the link, but the posting step failed.</p>
            <pre>${error.message}</pre>
        `);
    }
}

// Reuse logic (Ideally this would be a shared lib, but keeping it self-contained for Vercel/TS simplicity)
async function postToLinkedIn(text: string, imageUrn: string) {
    const postData = {
        "author": `urn:li:organization:${ORGANIZATION_ID}`,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": { "text": text },
                "shareMediaCategory": "IMAGE",
                "media": [{ "status": "READY", "description": { "text": "Synervion Update" }, "media": imageUrn, "title": { "text": "Synervion Update" } }]
            }
        },
        "visibility": { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" }
    };

    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify(postData)
    });

    const json = await response.json();
    if (!response.ok) throw new Error(`LinkedIn API Error: ${JSON.stringify(json)}`);
    return json;
}
