# 📬 Synervion Contact Form - Backend System

Complete backend solution for the Synervion website contact form with MySQL database integration.

---

## 📁 Files Overview

| File | Purpose | Deploy To |
|------|---------|-----------|
| `save_contact.php` | Main PHP handler for form submissions | `/public_html/` on Hostinger |
| `database_schema.sql` | MySQL table creation script | Run in phpMyAdmin |
| `DEPLOYMENT_GUIDE.md` | **START HERE** - Complete setup instructions | Documentation |
| `TEST_FORM.html` | Standalone test page to verify API | Optional testing |
| `MANAGEMENT_QUERIES.sql` | SQL queries for managing submissions | Reference |
| `README.md` | This file | Documentation |

---

## 🚀 Quick Start

**New to deployment? Follow these 4 steps:**

1. **Read** `DEPLOYMENT_GUIDE.md` (comprehensive instructions)
2. **Create** MySQL database in Hostinger hPanel
3. **Run** `database_schema.sql` in phpMyAdmin
4. **Upload** `save_contact.php` to `/public_html/`
5. **Configure** database credentials in the PHP file
6. **Update** the API URL in `ContactUs.tsx`
7. **Test** using the live form or `TEST_FORM.html`

📖 **Full Documentation:** See `DEPLOYMENT_GUIDE.md` for step-by-step instructions

---

## 🏗️ Architecture

```
Frontend (React)                Backend (PHP)              Database (MySQL)
┌──────────────┐              ┌──────────────┐          ┌──────────────────┐
│              │              │              │          │                  │
│  ContactUs   │─── POST ────▶│ save_contact │─ INSERT ▶│ contact_         │
│  Component   │     JSON     │    .php      │          │ submissions      │
│              │              │              │          │                  │
└──────────────┘              └──────────────┘          └──────────────────┘
                                     │
                                     │
                                     ▼
                              ┌──────────────┐
                              │   Response   │
                              │    (JSON)    │
                              └──────────────┘
```

---

## 📊 Database Schema

### Table: `contact_submissions`

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT(11) | Auto-increment primary key |
| `full_name` | VARCHAR(100) | Contact's full name (required) |
| `email` | VARCHAR(100) | Contact's email (required, validated) |
| `company` | VARCHAR(150) | Company/organization (optional) |
| `subject` | VARCHAR(200) | Message subject (optional) |
| `message` | TEXT | Full message content (required) |
| `ip_address` | VARCHAR(45) | Submitter's IP (auto-captured) |
| `user_agent` | VARCHAR(255) | Browser/device info (auto-captured) |
| `submitted_at` | DATETIME | Submission timestamp |
| `status` | ENUM | Workflow status (new/read/replied/archived) |
| `notes` | TEXT | Internal notes (optional) |
| `created_at` | TIMESTAMP | Record creation time |
| `updated_at` | TIMESTAMP | Last update time |

---

## 🔒 Security Features

### ✅ Built-in Protection

- **SQL Injection Prevention**: Prepared statements with parameterized queries
- **XSS Protection**: HTML entity encoding on all inputs
- **Email Validation**: Server-side email format validation
- **Input Sanitization**: All fields sanitized before storage
- **Field Length Limits**: Prevents buffer overflow attacks
- **CORS Configuration**: Configurable cross-origin request handling
- **Error Logging**: Secure error handling without exposing sensitive data

### 🛡️ Recommended Additions

For production deployment, consider adding:

1. **Rate Limiting** - Prevent spam submissions
2. **reCAPTCHA** - Bot protection
3. **Honeypot Fields** - Silent spam detection
4. **IP Blacklisting** - Block known malicious IPs
5. **Email Verification** - Double opt-in for newsletters
6. **CSRF Tokens** - Extra form security

---

## 📧 Email Notifications (Optional)

The PHP handler includes commented-out code for email notifications.

**To enable:**

1. Open `save_contact.php`
2. Find the "OPTIONAL: SEND EMAIL NOTIFICATION" section
3. Uncomment the code block
4. Configure your email settings

**Example:**
```php
$to = "partnerships@synervion.com";
$subject = "New Contact Form Submission";
// ... rest of email code
```

**Note:** Hostinger supports PHP `mail()` function. For better deliverability, consider using SMTP or services like SendGrid/Mailgun.

---

## 🧪 Testing

### Method 1: Test Form (Recommended)

1. Open `TEST_FORM.html` in your browser
2. Update the API URL (line 201) with your domain
3. Form is pre-filled with test data
4. Click "Send Test Message"
5. Check for success response and database entry

### Method 2: Browser Developer Tools

1. Open your website's contact form
2. Open browser DevTools (F12)
3. Go to Network tab
4. Submit the form
5. Inspect the request/response

### Method 3: cURL Command

```bash
curl -X POST https://yourdomain.com/save_contact.php \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test User",
    "email": "test@example.com",
    "company": "Test Co",
    "subject": "Test",
    "message": "This is a test message"
  }'
```

---

## 📈 Managing Submissions

### phpMyAdmin

1. Log in to Hostinger hPanel
2. Go to phpMyAdmin
3. Select your database
4. Click `contact_submissions` table
5. Use "Browse" to view all submissions

### Quick Queries

See `MANAGEMENT_QUERIES.sql` for complete list.

**View new submissions:**
```sql
SELECT * FROM contact_submissions 
WHERE status = 'new' 
ORDER BY submitted_at DESC;
```

**Mark as read:**
```sql
UPDATE contact_submissions 
SET status = 'read' 
WHERE id = 1;
```

**Export to CSV:**
Use phpMyAdmin's Export feature or copy query results.

---

## 🔧 Configuration

### Required Configuration

**In `save_contact.php`:**
```php
$servername = "localhost";
$username = "YOUR_MYSQL_USERNAME";    // ← Change this
$password = "YOUR_MYSQL_PASSWORD";    // ← Change this
$dbname = "YOUR_DATABASE_NAME";       // ← Change this
```

**In `ContactUs.tsx`:**
```typescript
const response = await fetch('https://yourdomain.com/save_contact.php', {
  // ↑ Change yourdomain.com to your actual domain
```

### Optional Configuration

**CORS Headers** (in `save_contact.php`):
```php
// Replace * with your specific domain for better security
header('Access-Control-Allow-Origin: *');
```

**Error Logging** (in `save_contact.php`):
```php
ini_set('error_log', '/path/to/php-error.log');
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Database connection failed | Verify credentials in `save_contact.php` |
| Table doesn't exist | Re-run `database_schema.sql` in phpMyAdmin |
| CORS error | Update CORS headers in PHP file |
| 500 Internal Server Error | Check PHP error logs in Hostinger |
| Form submits but no database entry | Verify database user has INSERT privileges |
| Email notifications not working | Check Hostinger SMTP settings |

**Detailed troubleshooting:** See `DEPLOYMENT_GUIDE.md`

---

## 📱 API Endpoint

### POST `/save_contact.php`

**Request:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "subject": "Partnership Inquiry",
  "message": "I'm interested in partnering with Synervion..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Your message has been successfully submitted.",
  "submission_id": 42
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid email address format."
}
```

---

## 📊 Analytics & Reporting

### Built-in Dashboard View

The SQL schema includes a `contact_dashboard` view:

```sql
SELECT * FROM contact_dashboard;
```

Shows:
- New submissions count
- Read submissions count
- Replied submissions count
- Today's submissions
- This week's submissions
- Total submissions

### Custom Reports

See `MANAGEMENT_QUERIES.sql` for dozens of pre-built queries:
- Daily/weekly submission trends
- Response time analytics
- Email domain analysis
- Spam detection patterns
- Export formats

---

## 🔄 Backup Strategy

### Recommended Backup Schedule

1. **Daily**: Automatic Hostinger backups (enable in hPanel)
2. **Weekly**: Manual export via phpMyAdmin
3. **Monthly**: Full database dump for archival

### Manual Backup

**In phpMyAdmin:**
1. Select `contact_submissions` table
2. Click "Export"
3. Choose format (SQL recommended)
4. Click "Go"

**Via Command Line:**
```bash
mysqldump -u username -p database_name contact_submissions > backup.sql
```

---

## 🎯 Production Checklist

Before going live, ensure:

- [ ] Database credentials configured
- [ ] Table created successfully
- [ ] PHP file uploaded to `/public_html/`
- [ ] Frontend API URL updated
- [ ] CORS headers configured
- [ ] SSL/HTTPS enabled
- [ ] Test submission successful
- [ ] Email notifications working (if enabled)
- [ ] Error logging configured
- [ ] Backup strategy in place
- [ ] Response workflow defined
- [ ] Team trained on submission management

---

## 📞 Support Resources

- **Hostinger Documentation**: [https://support.hostinger.com](https://support.hostinger.com)
- **PHP Manual**: [https://www.php.net/manual/](https://www.php.net/manual/)
- **MySQL Reference**: [https://dev.mysql.com/doc/](https://dev.mysql.com/doc/)

---

## 🔐 Environment Variables (Alternative)

For enhanced security, you can use environment variables instead of hardcoding credentials:

**In `save_contact.php`:**
```php
$servername = getenv('DB_HOST');
$username = getenv('DB_USER');
$password = getenv('DB_PASS');
$dbname = getenv('DB_NAME');
```

**Set in Hostinger:**
Contact Hostinger support to configure environment variables in your hosting environment.

---

## 📄 File Permissions

Recommended permissions on Hostinger:

```
save_contact.php      → 644 (rw-r--r--)
public_html/          → 755 (rwxr-xr-x)
```

**To set via FTP client or File Manager.**

---

## 🎉 Success Metrics

After deployment, track:

- ✅ Form submission rate
- ✅ Response time to inquiries
- ✅ Conversion rate (submissions to partnerships)
- ✅ Spam detection effectiveness
- ✅ User satisfaction with response time

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-10-28 | Initial release |

---

## 🤝 Contributing

Found a bug or have a suggestion? Please update this documentation for the team.

---

## 📜 License

Proprietary - Synervion Internal Use Only

---

**Questions?** Review the `DEPLOYMENT_GUIDE.md` for comprehensive instructions or contact your development team.

---

**Status:** ✅ Production Ready  
**Last Updated:** 2025-10-28  
**Maintained By:** Synervion Web Team
