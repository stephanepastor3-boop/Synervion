import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';





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

    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send notification to admin
    const adminEmailResult = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['info@synervion.com'],
      replyTo: email,
      subject: `Contact Form: ${subject || 'General Inquiry'}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: sans-serif; line-height: 1.6; color: #333; }
              .header { background: #EE7B2F; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 10px; }
              .label { font-weight: bold; color: #666; font-size: 0.9em; }
              .value { margin-top: 4px; }
            </style>
          </head>
          <body>
            <div style="max-width: 600px; margin: 0 auto;">
              <div class="header">
                <h2 style="margin: 0;">New Contact Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name</div>
                  <div class="value">${full_name}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${company ? `
                <div class="field">
                  <div class="label">Company</div>
                  <div class="value">${company}</div>
                </div>` : ''}
                <div class="field">
                  <div class="label">Subject</div>
                  <div class="value">${subject || 'General Inquiry'}</div>
                </div>
                <div class="field">
                  <div class="label">Message</div>
                  <div class="value" style="white-space: pre-wrap;">${message}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `
    });

    if (adminEmailResult.error) {
      console.error('Resend API error:', adminEmailResult.error);
      return res.status(500).json({ success: false, message: 'Failed to send email. Please try again later.' });
    }

    // Send confirmation to user
    try {
      await resend.emails.send({
        from: 'Synervion <info@synervion.com>',
        to: [email],
        subject: 'We received your message - Synervion',
        html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; }
              .header { text-align: center; padding: 30px 0; }
              .content { background: #fff; padding: 30px; border: 1px solid #eee; border-radius: 12px; }
              .button { display: inline-block; padding: 12px 24px; background: #EE7B2F; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="content">
                <h2 style="color: #EE7B2F; margin-top: 0;">Hi ${full_name.split(' ')[0]},</h2>
                <p>Thank you for reaching out to Synervion.</p>
                <p>We have received your message regarding "<strong>${subject || 'General Inquiry'}</strong>" and our team will review it shortly.</p>
                <p>You can expect a response from us within 24 business hours.</p>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 0.9em; color: #666;">
                  <p>Best regards,<br>The Synervion Team</p>
                  <a href="https://www.synervion.com" style="color: #EE7B2F; text-decoration: none;">www.synervion.com</a>
                </div>
              </div>
            </div>
          </body>
        </html>
      `
      });
    } catch (userEmailError) {
      console.warn('Failed to send confirmation email:', userEmailError);
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Your message has been successfully submitted.',
      submission_id: adminEmailResult.data?.id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
}
