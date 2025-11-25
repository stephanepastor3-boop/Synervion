/**
 * API Configuration for Synervion Contact Form
 * 
 * DEVELOPMENT MODE:
 * - Uses mock API that simulates backend behavior
 * - Logs submissions to browser console
 * - Shows developer notice banner
 * 
 * PRODUCTION MODE:
 * - Connects to Vercel serverless function (/api/send-contact)
 * - Sends emails via Resend
 * - Hides developer notice
 */

export const contactFormConfig = {
  // Toggle between mock API (development) and real API (production)
  USE_MOCK_API: false,

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

