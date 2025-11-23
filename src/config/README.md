# 🔧 Configuration Files

This folder contains centralized configuration for the Synervion application.

---

## 📁 Files

### `api.config.ts`
**Contact Form API Configuration**

Controls whether the contact form uses mock data (development) or connects to your Hostinger backend (production).

**Current Mode:** 🟡 **Development** (Mock API)

---

## 🚀 Switching to Production

When you're ready to connect to your real backend:

1. **Open** `/config/api.config.ts`

2. **Update these values:**
```typescript
export const contactFormConfig = {
  USE_MOCK_API: false,              // Mock → Real API
  API_ENDPOINT: 'https://synervion.com/save_contact.php',  // Your domain
  SHOW_DEV_NOTICE: false,           // Hide banner
};
```

3. **Save** and redeploy

---

## 🧪 Development Mode

### Current Settings
```typescript
USE_MOCK_API: true        → Form uses simulated backend
SHOW_DEV_NOTICE: true     → Shows blue info banner
MOCK_DELAY: 1000          → 1 second simulated delay
```

### What Happens
- ✅ Form validation works
- ✅ Success/error messages display
- ✅ Form resets after submission
- ℹ️ Data logged to browser console (F12 → Console)
- ⚠️ Data NOT saved to database

### Viewing Mock Submissions
1. Open browser DevTools (F12)
2. Go to Console tab
3. Submit form
4. See logged data: `📬 Mock Form Submission: {...}`

---

## 🌐 Production Mode

### Required Settings
```typescript
USE_MOCK_API: false       → Connect to real PHP backend
API_ENDPOINT: 'https://...'  → Your Hostinger URL
SHOW_DEV_NOTICE: false    → No banner shown
```

### What Happens
- ✅ Real API calls to Hostinger
- ✅ Data saved to MySQL database
- ✅ Optional email notifications
- ✅ Spam tracking (IP, user agent)

### Prerequisites
Before switching to production mode, ensure:

1. ✅ Backend deployed (see `/backend/QUICK_START.md`)
2. ✅ Database created in Hostinger
3. ✅ Table created via phpMyAdmin
4. ✅ `save_contact.php` uploaded and configured
5. ✅ Test submission successful

---

## 📊 Configuration Reference

### `USE_MOCK_API`
**Type:** `boolean`  
**Default:** `true`  
**Production:** `false`

Controls API mode:
- `true` = Mock API (development)
- `false` = Real API (production)

---

### `API_ENDPOINT`
**Type:** `string`  
**Default:** `'https://yourdomain.com/save_contact.php'`  
**Production:** `'https://synervion.com/save_contact.php'` (example)

Your Hostinger PHP backend URL. Must include:
- HTTPS protocol
- Your domain
- Path to save_contact.php

---

### `SHOW_DEV_NOTICE`
**Type:** `boolean`  
**Default:** `true`  
**Production:** `false`

Shows/hides the blue developer notice banner above the form.

---

### `MOCK_DELAY`
**Type:** `number` (milliseconds)  
**Default:** `1000`

Simulates network delay in development mode. Makes the form feel more realistic during testing.

---

### `MAX_*_LENGTH`
**Type:** `number`

Field validation limits. Must match PHP backend limits:
- `MAX_MESSAGE_LENGTH: 5000`
- `MAX_NAME_LENGTH: 100`
- `MAX_EMAIL_LENGTH: 100`
- `MAX_COMPANY_LENGTH: 150`
- `MAX_SUBJECT_LENGTH: 200`

---

## 🔍 Troubleshooting

### "Failed to fetch" error

**Cause:** API endpoint is wrong or backend not deployed

**Solution:**
1. Verify `API_ENDPOINT` URL is correct
2. Check backend is uploaded to Hostinger
3. Test PHP file: Visit `https://yourdomain.com/save_contact.php`
   - Should see: `{"success":false,"message":"Method not allowed..."}`

---

### Form submits but no database entry

**Cause:** Using mock API mode

**Solution:**
1. Check console for `📬 Mock Form Submission` log
2. If you see it, you're in mock mode
3. Set `USE_MOCK_API: false` to use real backend

---

### CORS error

**Cause:** Backend doesn't allow your domain

**Solution:**
1. Open `save_contact.php` on server
2. Update line 23:
```php
header('Access-Control-Allow-Origin: https://yourdomain.com');
```
3. Match your exact domain (including https://)

---

## 📝 Quick Reference

| Setting | Development | Production |
|---------|-------------|------------|
| `USE_MOCK_API` | `true` | `false` |
| `SHOW_DEV_NOTICE` | `true` | `false` |
| `API_ENDPOINT` | (any) | Your domain |

---

## 🎯 Deployment Checklist

Before deploying to production:

- [ ] Backend fully set up (see `/backend/QUICK_START.md`)
- [ ] Test submission works in mock mode
- [ ] `API_ENDPOINT` updated with real domain
- [ ] `USE_MOCK_API` set to `false`
- [ ] `SHOW_DEV_NOTICE` set to `false`
- [ ] Tested real submission on staging/live site
- [ ] Verified data appears in phpMyAdmin
- [ ] Confirmed email notifications work (if enabled)

---

## 💡 Pro Tips

**Testing in Development:**
```typescript
// Good for rapid testing
MOCK_DELAY: 300  // Fast response
```

**Testing in Staging:**
```typescript
// Simulate real conditions
USE_MOCK_API: false
API_ENDPOINT: 'https://staging.synervion.com/save_contact.php'
SHOW_DEV_NOTICE: true  // Keep notice visible
```

**Production:**
```typescript
// Final settings
USE_MOCK_API: false
API_ENDPOINT: 'https://synervion.com/save_contact.php'
SHOW_DEV_NOTICE: false  // Clean UI
```

---

## 📞 Need Help?

- **Backend Setup:** `/backend/QUICK_START.md`
- **Full Documentation:** `/backend/DEPLOYMENT_GUIDE.md`
- **API Details:** `/backend/SYSTEM_OVERVIEW.md`

---

**Last Updated:** 2025-10-28  
**Maintained By:** Synervion Web Team
