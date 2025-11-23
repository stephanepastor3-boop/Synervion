# 🚀 Synervion Contact Form - Complete Deployment Guide

## 📋 Overview

This guide walks you through deploying the Synervion contact form with full backend integration on Hostinger, including MySQL database setup via phpMyAdmin.

---

## ✅ Prerequisites

Before you begin, make sure you have:

1. ✓ Active Hostinger hosting account
2. ✓ Access to Hostinger control panel (hPanel)
3. ✓ phpMyAdmin access
4. ✓ Your domain name (e.g., `synervion.com`)
5. ✓ FTP/File Manager access to upload files

---

## 📁 Files Included

```
/backend/
├── save_contact.php          ← PHP backend handler
├── database_schema.sql       ← MySQL table creation script
├── DEPLOYMENT_GUIDE.md       ← This file
└── TEST_FORM.html           ← Test page (optional)
```

---

## 🔧 Step-by-Step Deployment

### **STEP 1: Create MySQL Database**

1. Log in to your **Hostinger hPanel**
2. Navigate to **Databases** → **MySQL Databases**
3. Click **"Create New Database"**
4. Enter database name: `synervion_contacts` (or your preferred name)
5. Click **"Create"**
6. **Save these credentials** (you'll need them):
   - Database Name
   - Database Username
   - Database Password
   - Database Host (usually `localhost`)

---

### **STEP 2: Create Database Table**

1. In hPanel, go to **Databases** → **phpMyAdmin**
2. Select your database (`synervion_contacts`) from the left sidebar
3. Click the **"SQL"** tab at the top
4. Open the file `/backend/database_schema.sql`
5. **Copy the entire contents** of the SQL file
6. **Paste** it into the SQL query box in phpMyAdmin
7. Click **"Go"** to execute
8. ✅ You should see a success message: "Table contact_submissions has been created"

---

### **STEP 3: Configure PHP Backend**

1. Open `/backend/save_contact.php` in a text editor
2. Find the **"DATABASE CONFIGURATION"** section (around line 48)
3. **Replace** the placeholder values with your actual credentials:

```php
$servername = "localhost";              // Usually "localhost"
$username = "YOUR_MYSQL_USERNAME";      // From Step 1
$password = "YOUR_MYSQL_PASSWORD";      // From Step 1
$dbname = "synervion_contacts";         // Your database name
```

4. **Save** the file

---

### **STEP 4: Upload PHP File to Hostinger**

**Option A: Using File Manager (Recommended)**

1. Log in to Hostinger hPanel
2. Go to **Files** → **File Manager**
3. Navigate to `/public_html/`
4. Click **"Upload"**
5. Upload `save_contact.php`
6. ✅ File should now be at: `/public_html/save_contact.php`

**Option B: Using FTP**

1. Connect to your server via FTP (FileZilla, etc.)
2. Navigate to `/public_html/`
3. Upload `save_contact.php`
4. Set file permissions to **644**

---

### **STEP 5: Update Frontend Configuration**

1. Open `/components/ContactUs.tsx`
2. Find this line (around line 30):

```typescript
const response = await fetch('https://yourdomain.com/save_contact.php', {
```

3. **Replace** `yourdomain.com` with your actual domain:

```typescript
const response = await fetch('https://synervion.com/save_contact.php', {
```

4. **Save** and deploy your React application

---

### **STEP 6: Configure CORS (Optional but Recommended)**

If your frontend is hosted on a different domain than your backend:

1. Open `save_contact.php`
2. Find this line (around line 23):

```php
header('Access-Control-Allow-Origin: *');
```

3. Replace `*` with your specific domain:

```php
header('Access-Control-Allow-Origin: https://synervion.com');
```

This improves security by only allowing requests from your domain.

---

## 🧪 Testing Your Setup

### **Test 1: Check PHP File**

1. Open your browser
2. Navigate to: `https://yourdomain.com/save_contact.php`
3. You should see an error message (this is correct!):
   ```json
   {"success":false,"message":"Method not allowed. Only POST requests are accepted."}
   ```
4. ✅ This confirms the PHP file is accessible

### **Test 2: Submit Test Form**

1. Visit your Synervion website
2. Navigate to the contact form
3. Fill out all required fields:
   - Full Name: "Test User"
   - Email: "test@example.com"
   - Message: "This is a test submission"
4. Click **"Send Message"**
5. ✅ You should see: "Message sent successfully!"

### **Test 3: Verify Database Entry**

1. Go to phpMyAdmin
2. Select your database
3. Click on the **"contact_submissions"** table
4. Click **"Browse"**
5. ✅ You should see your test submission

---

## 📊 Managing Submissions

### **View All Submissions**

In phpMyAdmin, run this query:

```sql
SELECT * FROM contact_submissions ORDER BY submitted_at DESC;
```

### **View Only New Submissions**

```sql
SELECT * FROM contact_submissions WHERE status = 'new' ORDER BY submitted_at DESC;
```

### **Mark Submission as Read**

```sql
UPDATE contact_submissions SET status = 'read' WHERE id = 1;
```

### **Add Internal Notes**

```sql
UPDATE contact_submissions SET notes = 'Sent partnership proposal' WHERE id = 1;
```

### **Export to CSV**

1. In phpMyAdmin, select the `contact_submissions` table
2. Click **"Export"** at the top
3. Choose **"CSV"** format
4. Click **"Go"**

---

## 📧 Email Notifications (Optional)

To receive email notifications when someone submits the form:

1. Open `save_contact.php`
2. Find the **"OPTIONAL: SEND EMAIL NOTIFICATION"** section (around line 145)
3. **Uncomment** the email code block
4. Replace `partnerships@synervion.com` with your email address
5. Save and re-upload the file

**Note:** Some hosting providers require additional SMTP configuration. Check Hostinger documentation if emails aren't sending.

---

## 🔒 Security Best Practices

### ✅ Implemented Security Features

- ✓ SQL injection prevention (prepared statements)
- ✓ XSS protection (input sanitization)
- ✓ Email validation
- ✓ Field length limits
- ✓ CSRF protection (can be enhanced)
- ✓ IP address logging

### 🛡️ Additional Security Recommendations

1. **Enable HTTPS**: Make sure your site uses SSL/TLS
2. **Rate Limiting**: Consider adding rate limiting to prevent spam
3. **Captcha**: Add reCAPTCHA for production use
4. **Backup**: Set up automatic database backups in Hostinger
5. **Monitor**: Regularly check for suspicious submissions

---

## 🐛 Troubleshooting

### **Error: "Database connection failed"**

**Solution:**
- Double-check your database credentials in `save_contact.php`
- Verify the database exists in phpMyAdmin
- Try using `localhost` instead of `127.0.0.1` for the server name

### **Error: "Table doesn't exist"**

**Solution:**
- Re-run the SQL schema in phpMyAdmin
- Check that you selected the correct database before running the SQL

### **Error: "CORS policy blocked"**

**Solution:**
- Update the CORS header in `save_contact.php` to allow your domain
- Check that your domain is using HTTPS if the backend is HTTPS

### **No error but form doesn't submit**

**Solution:**
- Check browser console for JavaScript errors
- Verify the API URL in `ContactUs.tsx` is correct
- Test the PHP endpoint directly using Postman or curl

### **Form submits but nothing in database**

**Solution:**
- Check PHP error logs in Hostinger control panel
- Verify file permissions (should be 644)
- Ensure database user has INSERT privileges

---

## 📱 Contact Form Features

### ✨ What's Included

- ✓ Responsive design (mobile, tablet, desktop)
- ✓ Real-time form validation
- ✓ Success/error animations
- ✓ Loading states
- ✓ Accessibility compliant (WCAG 2.1)
- ✓ Synervion brand styling
- ✓ Database storage
- ✓ Metadata tracking (IP, user agent, timestamp)

### 📝 Database Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `full_name` | VARCHAR(100) | Yes | Contact's name |
| `email` | VARCHAR(100) | Yes | Contact's email |
| `company` | VARCHAR(150) | No | Company name |
| `subject` | VARCHAR(200) | No | Message subject |
| `message` | TEXT | Yes | Full message |
| `ip_address` | VARCHAR(45) | Auto | Submitter's IP |
| `user_agent` | VARCHAR(255) | Auto | Browser info |
| `submitted_at` | DATETIME | Auto | Submission time |
| `status` | ENUM | Auto | Workflow status |

---

## 🎯 Next Steps

After successful deployment:

1. ✅ Test the form thoroughly on all devices
2. ✅ Set up email notifications (optional)
3. ✅ Create a dashboard to manage submissions (optional)
4. ✅ Add Google Analytics tracking (optional)
5. ✅ Implement reCAPTCHA for spam protection (recommended)
6. ✅ Schedule regular database backups

---

## 📞 Support

If you encounter any issues:

1. Check the **Troubleshooting** section above
2. Review PHP error logs in Hostinger control panel
3. Verify all credentials and file paths
4. Test each component individually

---

## 🎉 Success Checklist

Before going live, verify:

- [ ] Database table created successfully
- [ ] PHP file uploaded and accessible
- [ ] Database credentials configured correctly
- [ ] Frontend API URL points to correct domain
- [ ] CORS headers configured (if needed)
- [ ] Test submission appears in database
- [ ] Success message displays on frontend
- [ ] Email notifications work (if enabled)
- [ ] Form works on mobile devices
- [ ] HTTPS is enabled on your domain

---

## 📄 File Permissions

Recommended permissions for Hostinger:

```
save_contact.php    → 644 (rw-r--r--)
public_html/        → 755 (rwxr-xr-x)
```

---

**Deployment Date:** [Add date when you deploy]  
**Last Updated:** 2025-10-28  
**Version:** 1.0.0

---

🎊 **Congratulations!** Your Synervion contact form is now live and ready to collect submissions!
