import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

// CORS headers for browser requests
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).json({ message: 'OK' });
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed. Only POST requests are accepted.'
        });
    }

    try {
        const { full_name, email, company, subject, message } = req.body;

        // Validate required fields
        if (!full_name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Required fields are missing: full_name, email, and message are required.'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address format.'
            });
        }

        // Check for Resend API key
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not set in environment variables');
            return res.status(500).json({
                success: false,
                message: 'Email service is not configured. Please contact support.'
            });
        }

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>', // Will use verified domain in production
            to: ['info@synervion.com'],
            replyTo: email,
            subject: `Contact Form: ${subject || 'General Inquiry'}`,
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #EE7B2F; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #EE7B2F; }
              .value { margin-top: 5px; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Full Name:</div>
                  <div class="value">${full_name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${company ? `
                <div class="field">
                  <div class="label">Company:</div>
                  <div class="value">${company}</div>
                </div>
                ` : ''}
                ${subject ? `
                <div class="field">
                  <div class="label">Subject:</div>
                  <div class="value">${subject}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="footer">
                  <p>Sent from: Synervion Contact Form<br>
                  Date: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
        });

        if (error) {
            console.error('Resend API error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to send email. Please try again later.'
            });
        }

        // Success response
        return res.status(200).json({
            success: true,
            message: 'Your message has been successfully submitted. We will get back to you soon!',
            submission_id: data?.id
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try again later.'
        });
    }
}
