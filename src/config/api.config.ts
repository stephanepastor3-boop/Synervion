/**
 * API Configuration for Synervion Contact Form
 * 
 * DEVELOPMENT MODE:
 * - Uses mock API that simulates backend behavior
 * - Logs submissions to browser console
 * - Shows developer notice banner
 * 
 * PRODUCTION MODE:
 * - Connects to real Hostinger PHP backend
 * - Saves submissions to MySQL database
 * - Hides developer notice
 * 
 * TO DEPLOY TO PRODUCTION:
 * 1. Set USE_MOCK_API = false
 * 2. Update API_ENDPOINT with your Hostinger domain
 * 3. Set SHOW_DEV_NOTICE = false
 * 4. Ensure backend is set up (see /backend/QUICK_START.md)
 */

export const contactFormConfig = {
  // Toggle between mock API (development) and real API (production)
  USE_MOCK_API: false,

  // Your Hostinger domain - replace 'yourdomain.com' with actual domain
  // For now, will use mailto as fallback
  API_ENDPOINT: 'https://yourdomain.com/save_contact.php',

  // Show developer notice banner
  SHOW_DEV_NOTICE: false,

  // Mock API settings
  MOCK_DELAY: 1000, // Simulate network delay in milliseconds

  // Form validation settings
  MAX_MESSAGE_LENGTH: 5000,
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 100,
  MAX_COMPANY_LENGTH: 150,
  MAX_SUBJECT_LENGTH: 200,
};

/**
 * PRODUCTION CHECKLIST:
 * 
 * Before deploying to production, ensure:
 * □ MySQL database created in Hostinger
 * □ Database table created (run database_schema.sql)
 * □ save_contact.php uploaded to /public_html/
 * □ Database credentials configured in save_contact.php
 * □ API_ENDPOINT updated with your domain
 * □ USE_MOCK_API set to false
 * □ SHOW_DEV_NOTICE set to false
 * □ Tested form submission successfully
 * □ Verified data in phpMyAdmin
 * 
 * See /backend/QUICK_START.md for complete setup guide
 */
