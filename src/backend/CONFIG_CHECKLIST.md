# ✅ Synervion Contact Form - Configuration Checklist

Use this checklist to ensure everything is configured correctly before going live.

---

## 📋 Pre-Deployment Checklist

### 🗄️ Database Setup

- [ ] MySQL database created in Hostinger hPanel
- [ ] Database name noted: `_____________________`
- [ ] Database username noted: `_____________________`
- [ ] Database password saved securely
- [ ] Database host confirmed (usually `localhost`)
- [ ] Logged into phpMyAdmin successfully
- [ ] Selected correct database in phpMyAdmin
- [ ] Ran `database_schema.sql` script successfully
- [ ] Verified `contact_submissions` table exists
- [ ] Verified table has 13 columns
- [ ] Checked that `contact_dashboard` view was created

---

### 📁 PHP Backend Configuration

- [ ] Opened `/backend/save_contact.php` in text editor
- [ ] Updated line 48: `$servername = "localhost";`
- [ ] Updated line 49: `$username = "YOUR_MYSQL_USERNAME";`
- [ ] Updated line 50: `$password = "YOUR_MYSQL_PASSWORD";`
- [ ] Updated line 51: `$dbname = "YOUR_DATABASE_NAME";`
- [ ] Saved the file
- [ ] Uploaded `save_contact.php` to `/public_html/` on Hostinger
- [ ] Verified file exists at: `https://yourdomain.com/save_contact.php`
- [ ] Checked file permissions are 644

---

### 🎨 Frontend Configuration

- [ ] Opened `/components/ContactUs.tsx` in code editor
- [ ] Found line ~30: `fetch('https://yourdomain.com/save_contact.php'`
- [ ] Replaced `yourdomain.com` with actual domain: `_____________________`
- [ ] Saved the file
- [ ] Rebuilt/deployed React application
- [ ] Verified build completed successfully
- [ ] Verified deployment to hosting/CDN

---

### 🔒 Security Configuration

- [ ] SSL/HTTPS enabled on domain
- [ ] Updated CORS header in PHP file (line 23) from `*` to specific domain
- [ ] Configured error logging path (line 19)
- [ ] Disabled `display_errors` in production (line 18, set to 0)
- [ ] Reviewed and understand SQL injection prevention (prepared statements)
- [ ] Reviewed input sanitization functions
- [ ] Considered adding reCAPTCHA (optional)
- [ ] Documented spam prevention strategy

---

### 📧 Email Notifications (Optional)

- [ ] Decided whether to enable email notifications: YES / NO
- [ ] If YES, uncommented email code block (lines ~145-165)
- [ ] Updated recipient email address
- [ ] Updated sender email address
- [ ] Tested email functionality
- [ ] Verified emails arrive in inbox (not spam)

---

### 🧪 Testing

- [ ] Accessed test form: `TEST_FORM.html` in browser
- [ ] Updated API URL in test form (line 201)
- [ ] Submitted test form
- [ ] Verified success message appeared
- [ ] Checked phpMyAdmin for test entry
- [ ] Verified all fields saved correctly
- [ ] Tested from actual website contact form
- [ ] Tested on mobile device
- [ ] Tested on tablet device
- [ ] Tested on desktop browser
- [ ] Tested with invalid email format
- [ ] Tested with missing required fields
- [ ] Tested with very long message
- [ ] Cleared test submissions from database

---

### 📊 Database Verification

Run these queries in phpMyAdmin to verify setup:

**Check table structure:**
```sql
DESCRIBE contact_submissions;
```
Expected result: 13 columns

**Check dashboard view:**
```sql
SELECT * FROM contact_dashboard;
```
Expected result: All counts should be 0 (or show your test submissions)

**Insert manual test record:**
```sql
INSERT INTO contact_submissions 
(full_name, email, company, subject, message, submitted_at) 
VALUES 
('Manual Test', 'manual@test.com', 'Test Co', 'Manual Insert', 'This is a manual test', NOW());
```
Expected result: 1 row inserted

**Verify manual test:**
```sql
SELECT * FROM contact_submissions WHERE email = 'manual@test.com';
```
Expected result: 1 row returned

---

### 🔍 Troubleshooting Tests

**Test 1: PHP File Accessibility**
- [ ] Visit: `https://yourdomain.com/save_contact.php` in browser
- [ ] Expected: JSON error message about POST method
- [ ] Actual result: `_____________________`

**Test 2: Database Connection**
- [ ] Look for "Database connection failed" in test submission
- [ ] If error appears, verify credentials
- [ ] If no error, connection successful ✓

**Test 3: Form Submission**
- [ ] Submit form from website
- [ ] Browser console shows no JavaScript errors
- [ ] Network tab shows 200 response code
- [ ] Success message displays on page

**Test 4: Data Persistence**
- [ ] Query database after test submission
- [ ] Verify all fields saved correctly
- [ ] Check timestamps are correct
- [ ] Verify IP address captured

---

### 📱 Cross-Browser Testing

- [ ] Chrome/Edge (Windows)
- [ ] Safari (macOS)
- [ ] Firefox
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

### 🎯 Production Launch

- [ ] All tests passed
- [ ] All test data removed from database
- [ ] Team trained on checking submissions
- [ ] Response workflow documented
- [ ] Backup schedule configured
- [ ] Monitoring/alerts set up (optional)
- [ ] Documentation shared with team
- [ ] Contact form publicly accessible
- [ ] Announced to marketing team
- [ ] Added to website analytics tracking

---

## 📝 Configuration Summary

Fill this out for your records:

### Database Details
```
Database Host:     ___________________________
Database Name:     ___________________________
Database User:     ___________________________
Database Password: ********** (keep secure)
```

### URLs
```
Website Domain:    https://___________________________
API Endpoint:      https://___________________________/save_contact.php
phpMyAdmin URL:    ___________________________
```

### Access
```
Hostinger Login:   ___________________________
FTP Host:          ___________________________
FTP Username:      ___________________________
```

### Team
```
Technical Contact:        ___________________________
Marketing Contact:        ___________________________
Response Owner:           ___________________________
Backup Administrator:     ___________________________
```

---

## 🚨 Common Issues & Solutions

### Issue: "Database connection failed"
**Solution:**
- Verify credentials in `save_contact.php`
- Check database exists in phpMyAdmin
- Try `localhost` instead of `127.0.0.1`

### Issue: "Table doesn't exist"
**Solution:**
- Re-run `database_schema.sql`
- Verify you selected correct database
- Check for typos in table name

### Issue: "CORS policy blocked"
**Solution:**
- Update CORS header in PHP file
- Ensure domain matches exactly
- Add HTTPS to domain if using SSL

### Issue: Form submits but nothing in database
**Solution:**
- Check PHP error logs in Hostinger
- Verify database user has INSERT privilege
- Look for JavaScript console errors

### Issue: Success message but data incorrect
**Solution:**
- Check field name mappings
- Verify JSON format in fetch request
- Review sanitization functions

---

## 📞 Emergency Contacts

**Hosting Support:**
- Hostinger Support: https://support.hostinger.com
- Live Chat: Available in hPanel

**Development Team:**
- [Add your team contacts here]

---

## 🎉 Launch Day Checklist

On the day you go live:

- [ ] Final test submission (remove after)
- [ ] Monitor submissions for first hour
- [ ] Check database is recording correctly
- [ ] Verify email notifications (if enabled)
- [ ] Test from different devices/networks
- [ ] Announce internally that form is live
- [ ] Share submission management process
- [ ] Set up daily check-in for first week
- [ ] Document any issues encountered
- [ ] Celebrate successful launch! 🎊

---

## 📊 Week 1 Monitoring

Track these metrics for the first week:

```
Day 1:  ___ submissions | ___ issues
Day 2:  ___ submissions | ___ issues
Day 3:  ___ submissions | ___ issues
Day 4:  ___ submissions | ___ issues
Day 5:  ___ submissions | ___ issues
Day 6:  ___ submissions | ___ issues
Day 7:  ___ submissions | ___ issues

Total:  ___ submissions
```

**Notes:**
_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

## ✨ Post-Launch Optimization

After 1 week, consider:

- [ ] Review spam submissions (if any)
- [ ] Adjust email templates
- [ ] Optimize database indexes
- [ ] Add analytics tracking
- [ ] Implement A/B testing
- [ ] Add conversion tracking
- [ ] Review response times
- [ ] Gather user feedback

---

**Checklist Completed By:** _____________________  
**Date:** _____________________  
**Reviewed By:** _____________________  
**Status:** ⬜ In Progress | ⬜ Ready for Testing | ⬜ Production Ready

---

**Next Review Date:** _____________________

Keep this checklist for future reference and updates!
