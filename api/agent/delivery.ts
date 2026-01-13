import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkAuth, resend, APP_URL, LINKEDIN_ACCESS_TOKEN, ORGANIZATION_ID, CRON_SECRET } from './utils';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { promisify } from 'node:util';

const gzip = promisify(zlib.gzip);

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (!checkAuth(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { topic, final_draft, image_url, qa_report } = req.body;
        if (!topic || !final_draft || !image_url) throw new Error("Missing required fields");

        console.log(`[Agent: Delivery] Uploading asset for '${topic}'...`);

        // 1. Upload to LinkedIn
        const imageBuffer = await downloadImageToBuffer(image_url);
        const assetUrn = await uploadImageToLinkedIn(imageBuffer);

        // 2. Generate Approval Link
        const payload = JSON.stringify({
            topic,
            text: final_draft,
            imageUrn: assetUrn
        });

        const compressed = await gzip(payload);
        const dataStr = compressed.toString('base64url');
        const sig = crypto.createHmac('sha256', CRON_SECRET!).update(dataStr).digest('hex');
        const approvalUrl = `${APP_URL}/api/approve-post?data=${dataStr}&sig=${sig}`;

        // 3. Send Email
        console.log("[Agent: Delivery] Sending email...");
        await resend.emails.send({
            from: 'Synervion Bot <bot@synervion.com>',
            to: 'stephane@synervion.com',
            subject: `⚡️ Review Required: ${topic}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <div style="background: #10b981; color: white; padding: 12px; border-radius: 8px 8px 0 0; text-align: center; font-weight: bold;">
                         Ready for Review (Workflow Engine)
                    </div>
                    <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
                        <h2 style="margin-top: 0;">${topic}</h2>
                        
                        <div style="margin: 20px 0;">
                            <img src="${image_url}" alt="Visual" style="width: 100%; border-radius: 8px; border: 1px solid #ddd;" />
                        </div>

                        <div style="white-space: pre-wrap; background: #f9fafb; padding: 16px; border-radius: 8px; font-size: 15px; line-height: 1.6; border: 1px solid #e5e7eb;">${final_draft}</div>

                        <div style="margin-top: 24px; border-left: 4px solid #10b981; background: #ecfdf5; padding: 16px; border-radius: 4px;">
                            <h3 style="margin: 0 0 12px 0; color: #047857; font-size: 14px; text-transform: uppercase;">Quality Validation Report</h3>
                            <div style="font-size: 13px; color: #065f46; white-space: pre-wrap;">${qa_report ? qa_report.replace('SCORE: 100', '').trim() : "Parallel Workflow Winner"}</div>
                        </div>
                        
                        <div style="margin-top: 24px; text-align: center;">
                            <a href="${approvalUrl}" 
                               style="display: inline-block; background: #0a66c2; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(10, 102, 194, 0.2);">
                               Approve & Publish to LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            `
        });

        return res.status(200).json({ status: "sent", approval_url: approvalUrl });
    } catch (error: any) {
        console.error("[Agent: Delivery] Failed:", error);
        return res.status(500).json({ error: error.message });
    }
}
