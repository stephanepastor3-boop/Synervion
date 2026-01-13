import 'dotenv/config';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const USER_EMAIL = 'stephane@synervion.com';

const ACTIVITY_ID = process.argv[2];
const PROPOSED_COMMENT = process.argv[3];
const POST_URL = process.argv[4];
const POST_CONTENT = process.argv[5] || "Click the link above to view the post content.";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'https://synervion.com';

if (!ACTIVITY_ID || !PROPOSED_COMMENT || !POST_URL) {
    console.error("Usage: node send-approval-email.js <ACTIVITY_ID> <PROPOSED_COMMENT> <POST_URL> [POST_CONTENT]");
    process.exit(1);
}

if (!RESEND_API_KEY) {
    console.error("Error: RESEND_API_KEY environment variable is not set.");
    process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);

async function sendEmail() {
    // Construct the approval URL (One-click)
    const params = new URLSearchParams({
        id: ACTIVITY_ID,
        comment: PROPOSED_COMMENT,
        redirect: POST_URL
    });
    const approvalUrl = `${APP_URL}/api/approve-linkedin-comment?${params.toString()}`;

    try {
        const { data, error } = await resend.emails.send({
            from: 'Synervion Bot <bot@synervion.com>',
            to: [USER_EMAIL],
            subject: '⚡️ Approval Required: LinkedIn Engagement',
            html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                <h2 style="color: #0f172a;">New Engagement Opportunity</h2>
                
                <div style="background-color: #f4f4f5; padding: 20px; border-radius: 12px; margin: 24px 0;">
                    <h3 style="margin-top: 0; color: #52525b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Original Post</h3>
                    <p style="white-space: pre-wrap; color: #3f3f46; font-style: italic;">"${POST_CONTENT.replace(/\n/g, '<br>').substring(0, 500)}${POST_CONTENT.length > 500 ? '...' : ''}"</p>
                    <a href="${POST_URL}" style="color: #0ea5e9; text-decoration: none; font-size: 14px;">View Full Post on LinkedIn &rarr;</a>
                </div>

                <div style="border-left: 4px solid #0ea5e9; padding-left: 20px; margin: 24px 0;">
                    <h3 style="margin-top: 0; color: #0ea5e9; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Proposed Comment</h3>
                    <p style="font-size: 16px; line-height: 1.6; color: #0f172a;">${PROPOSED_COMMENT}</p>
                </div>

                <div style="text-align: center; margin-top: 32px;">
                    <a href="${approvalUrl}" style="background-color: #0f172a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Approve & Publish Now</a>
                    <p style="margin-top: 16px; font-size: 12px; color: #71717a;">Clicking this button will instantly post the comment to LinkedIn.</p>
                </div>
            </div>
            `
        });

        if (error) {
            console.error("Failed to send email:", error);
            process.exit(1);
        }

        console.log("Approval email sent successfully!", data);
    } catch (e) {
        console.error("Exception sending email:", e);
        process.exit(1);
    }
}

sendEmail();
