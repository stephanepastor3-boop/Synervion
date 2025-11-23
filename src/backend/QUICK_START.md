# ⚡ Quick Start Guide - Synervion Contact Form

**Get your contact form live in 15 minutes!**

---

## 🎯 What You're Building

A production-ready contact form that:
- Captures leads from your website
- Stores submissions in MySQL database
- Provides real-time success/error feedback
- Matches Synervion brand perfectly

---

## 📦 What's Included

```
/backend/
├── 📄 save_contact.php           ← Upload this to Hostinger
├── 🗄️ database_schema.sql        ← Run this in phpMyAdmin
├── 📋 DEPLOYMENT_GUIDE.md         ← Full step-by-step instructions
├── 🧪 TEST_FORM.html             ← Test your setup
├── 📊 MANAGEMENT_QUERIES.sql      ← Manage submissions
├── ✅ CONFIG_CHECKLIST.md         ← Track your progress
├── 🏗️ SYSTEM_OVERVIEW.md          ← Technical architecture
├── 📖 README.md                   ← Complete documentation
└── ⚡ QUICK_START.md              ← This file
```

---

## 🚀 5-Step Setup

### Step 1: Create Database (2 min)

1. Log in to **Hostinger hPanel**
2. Click **Databases** → **MySQL Databases**
3. Click **Create New Database**
4. Name it: `synervion_contacts`
5. **Save your credentials:**
   - Username: `_____________`
   - Password: `_____________`

---

### Step 2: Create Table (1 min)

1. In hPanel, click **phpMyAdmin**
2. Select your database from left sidebar
3. Click **SQL** tab
4. Open `database_schema.sql` on your computer
5. **Copy all the code**
6. **Paste** into SQL box
7. Click **Go**
8. ✅ Success! Table created

---

### Step 3: Configure PHP (2 min)

1. Open `save_contact.php` in text editor
2. Find lines 48-51 (DATABASE CONFIGURATION section)
3. Replace with your actual credentials:

```php
$servername = "localhost";
$username = "YOUR_USERNAME_HERE";     // ← Change this
$password = "YOUR_PASSWORD_HERE";     // ← Change this
$dbname = "synervion_contacts";       // ← Your database name
```

4. **Save** the file

---

### Step 4: Upload to Server (3 min)

**Option A: File Manager (Easiest)**
1. In hPanel, go to **Files** → **File Manager**
2. Open `/public_html/` folder
3. Click **Upload**
4. Select `save_contact.php`
5. Wait for upload ✅

**Option B: FTP**
1. Connect via FileZilla/Cyberduck
2. Navigate to `/public_html/`
3. Upload `save_contact.php`

---

### Step 5: Update Frontend Configuration (2 min)

1. Open `/config/api.config.ts` in your code editor
2. Update these three settings:

```typescript
export const contactFormConfig = {
  USE_MOCK_API: false,                    // ← Change to false
  API_ENDPOINT: 'https://synervion.com/save_contact.php',  // ← Your domain
  SHOW_DEV_NOTICE: false,                 // ← Hide dev banner
  // ... rest of config
};
```

3. **Save** and **deploy** your React app

---

## 🧪 Test It! (5 min)

### Method 1: Live Website
1. Go to your contact form on website
2. Fill out all fields
3. Click "Send Message"
4. ✅ You should see: "Message sent successfully!"

### Method 2: Test Page
1. Open `TEST_FORM.html` in browser
2. Update line 201 with your domain
3. Click "Send Test Message"
4. ✅ Check response at bottom

### Method 3: Verify Database
1. Go to phpMyAdmin
2. Click `contact_submissions` table
3. Click **Browse**
4. ✅ Your test submission should appear!

---

## ✅ Success Checklist

After setup, verify:

- [ ] PHP file is accessible at: `https://yourdomain.com/save_contact.php`
- [ ] Test submission appears in database
- [ ] Website form shows success message
- [ ] All form fields are saving correctly
- [ ] Form works on mobile device

**All checked?** 🎉 **You're live!**

---

## 🆘 Quick Fixes

### "Database connection failed"
👉 Check credentials in `save_contact.php` lines 48-51

### "Table doesn't exist"
👉 Re-run `database_schema.sql` in phpMyAdmin

### "CORS error" in browser
👉 Update line 23 in `save_contact.php`:
```php
header('Access-Control-Allow-Origin: https://yourdomain.com');
```

### Form submits but nothing in database
👉 Check PHP error logs in Hostinger control panel

---

## 📖 Next Steps

After going live:

1. **Remove test submissions:**
   ```sql
   DELETE FROM contact_submissions WHERE email LIKE '%test%';
   ```

2. **Set up daily check:**
   - Open phpMyAdmin
   - Run: `SELECT * FROM contact_submissions WHERE status = 'new'`

3. **Optional: Enable email notifications**
   - Open `save_contact.php`
   - Find line 145 (email section)
   - Uncomment and configure

4. **Read full docs:**
   - `DEPLOYMENT_GUIDE.md` - Complete instructions
   - `MANAGEMENT_QUERIES.sql` - Database queries
   - `CONFIG_CHECKLIST.md` - Production checklist

---

## 📞 Need Help?

- **Full Setup Guide:** `DEPLOYMENT_GUIDE.md`
- **Troubleshooting:** `DEPLOYMENT_GUIDE.md` → Troubleshooting section
- **Managing Submissions:** `MANAGEMENT_QUERIES.sql`
- **System Details:** `SYSTEM_OVERVIEW.md`

---

## 🎊 That's It!

Your contact form is now:
- ✅ Accepting submissions
- ✅ Storing in database
- ✅ Looking beautiful
- ✅ Production ready

**Total setup time:** ~15 minutes

---

## 🔥 Pro Tips

**Daily Management:**
```sql
-- Check new submissions
SELECT * FROM contact_submissions WHERE status = 'new';

-- Mark as read
UPDATE contact_submissions SET status = 'read' WHERE id = 1;
```

**Weekly Backup:**
1. phpMyAdmin → Select table
2. Click "Export"
3. Choose "SQL"
4. Click "Go"

**Monthly Review:**
```sql
-- This month's stats
SELECT COUNT(*) FROM contact_submissions 
WHERE MONTH(submitted_at) = MONTH(NOW());
```

---

**Need the detailed version?** → `DEPLOYMENT_GUIDE.md`

**Questions?** Check `README.md` or review `CONFIG_CHECKLIST.md`

---

**Status:** ⚡ Quick Start Complete!  
**Your form is:** 🟢 LIVE

**🎉 Congratulations! You're all set!**
