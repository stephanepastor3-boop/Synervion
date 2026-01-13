import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const ORGANIZATION_ID = process.env.ORGANIZATION_ID || '105128149';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // 1. Validate Method & Token
    if (req.method !== 'GET') {
        return res.status(405).send('Method Not Allowed');
    }

    if (!LINKEDIN_ACCESS_TOKEN) {
        return res.status(500).send('Server Error: Missing LinkedIn Token');
    }

    // 2. Extract Query Params
    const { id: activityUrn, comment, redirect } = req.query;

    if (!activityUrn || !comment) {
        return res.status(400).send('Missing "id" or "comment" query parameters.');
    }

    try {
        // 3. Post to LinkedIn
        console.log(`[ApprovalAPI] Posting comment to ${activityUrn}...`);

        const postData = {
            "actor": `urn:li:organization:${ORGANIZATION_ID}`,
            "object": activityUrn as string,
            "message": {
                "text": comment as string
            }
        };

        const response = await fetch(`https://api.linkedin.com/v2/socialActions/${encodeURIComponent(activityUrn as string)}/comments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0'
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[ApprovalAPI] LinkedIn API Error:', errorText);
            throw new Error(`LinkedIn API Failed: ${response.statusText}`);
        }

        const json = await response.json();
        console.log('[ApprovalAPI] Success! Comment ID:', json.id);

        // 4. Return Success Page
        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Comment Published</title>
                    <style>
                        body { font-family: -apple-system, system-ui, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; text-align: center; }
                        .success { color: #16a34a; font-size: 24px; margin-bottom: 20px; }
                        .details { background: #f4f4f5; padding: 20px; border-radius: 8px; text-align: left; }
                        .btn { display: inline-block; background: #0a66c2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="success">✅ Comment Published Successfully!</div>
                    <div class="details">
                        <p><strong>Target Post:</strong> ${activityUrn}</p>
                        <p><strong>Comment:</strong> ${comment}</p>
                    </div>
                    <a href="https://www.linkedin.com/feed/" class="btn">View on LinkedIn (Feed)</a>
                </body>
            </html>
        `);

    } catch (error) {
        console.error('[ApprovalAPI] Critical Error:', error);
        return res.status(500).send(`Error posting comment: ${String(error)}`);
    }
}
