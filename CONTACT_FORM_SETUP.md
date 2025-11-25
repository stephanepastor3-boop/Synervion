# 🚀 Vercel Contact Form Setup Guide

## Quick Start (5 minutes)

Your contact form is now ready to use Resend email API on Vercel! Follow these steps:

### Step 1: Get Your Resend API Key

1. Go to **https://resend.com** and sign up (it's free)
2. Verify your email address
3. Go to **API Keys** in the dashboard
4. Click **"Create API Key"**
5. Copy the API key (it starts with `re_...`)

### Step 2: Add API Key to Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** paste your API key from Step 1
   - **Environment:** Select all (Production, Preview, Development)
5. Click **Save**

### Step 3: Deploy

Push your code to GitHub (or your connected repository), and Vercel will automatically deploy!

```bash
git add .
git commit -m "Add Resend contact form"
git push
```

---

## How It Works

When someone submits the contact form:
1. Data is sent to `/api/send-contact` (Vercel serverless function)
2. The function validates the data
3. Resend sends a formatted email to **info@synervion.com**
4. User sees success message

---

## Testing Locally

To test the contact form on your local dev server:

1. Create a `.env.local` file in your project root:
```bash
RESEND_API_KEY=re_your_api_key_here
```

2. Restart your dev server:
```bash
npm run dev
```

3. Fill out and submit the contact form at http://localhost:3000

---

## Important Notes

### Free Tier Limits
- ✅ 3,000 emails per month
- ✅ 100 emails per day
- ✅ 1 verified domain

### Email Sender Address
Currently using: `onboarding@resend.dev` (Resend's default)

**For production:** You should verify your own domain in Resend:
1. Go to Resend dashboard → **Domains**
2. Click **Add Domain**
3. Add your domain (e.g., synervion.com)
4. Follow DNS setup instructions
5. Update line 65 in `/api/send-contact.ts`:
   ```typescript
   from: 'Contact Form <contact@synervion.com>',
   ```

---

## Troubleshooting

**Error: "Email service is not configured"**
→ Make sure `RESEND_API_KEY` is set in Vercel environment variables

**Not receiving emails?**
→ Check your spam folder
→ Verify the API key is correct
→ Check Vercel deployment logs

**Form showing error message?**
→ Open browser console to see detailed error
→ Check Vercel function logs in dashboard

---

## Files Modified

- ✅ `/api/send-contact.ts` - Serverless function
- ✅ `/vercel.json` - Vercel configuration
- ✅ `/src/components/ContactUs.tsx` - Updated to use API
- ✅ `package.json` - Added resend dependency

---

Need help? The contact form is production-ready once you add the API key! 🎉
