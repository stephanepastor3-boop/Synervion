-- ============================================================================
-- SYNERVION CONTACT FORM DATABASE SCHEMA
-- ============================================================================
-- 
-- DEPLOYMENT INSTRUCTIONS:
-- 1. Log in to your Hostinger control panel
-- 2. Go to phpMyAdmin
-- 3. Select your database
-- 4. Click on the "SQL" tab
-- 5. Copy and paste this entire script
-- 6. Click "Go" to execute
--
-- This will create the 'contact_submissions' table to store all form submissions
-- ============================================================================

-- Create the contact_submissions table
CREATE TABLE IF NOT EXISTS `contact_submissions` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `company` VARCHAR(150) DEFAULT NULL,
  `subject` VARCHAR(200) DEFAULT NULL,
  `message` TEXT NOT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `user_agent` VARCHAR(255) DEFAULT NULL,
  `submitted_at` DATETIME NOT NULL,
  `status` ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_email` (`email`),
  INDEX `idx_submitted_at` (`submitted_at`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- OPTIONAL: Create a view for easy reading of submissions
-- ============================================================================

CREATE OR REPLACE VIEW `contact_submissions_view` AS
SELECT 
  id,
  full_name,
  email,
  company,
  subject,
  LEFT(message, 100) AS message_preview,
  submitted_at,
  status,
  DATEDIFF(NOW(), submitted_at) AS days_old
FROM 
  contact_submissions
ORDER BY 
  submitted_at DESC;

-- ============================================================================
-- SAMPLE QUERY: View all new submissions
-- ============================================================================
-- Use this query to see all new (unread) submissions:
-- SELECT * FROM contact_submissions WHERE status = 'new' ORDER BY submitted_at DESC;

-- ============================================================================
-- SAMPLE QUERY: Update submission status
-- ============================================================================
-- Use this to mark a submission as read:
-- UPDATE contact_submissions SET status = 'read' WHERE id = 1;

-- ============================================================================
-- SAMPLE QUERY: Add notes to a submission
-- ============================================================================
-- Use this to add internal notes:
-- UPDATE contact_submissions SET notes = 'Follow-up scheduled for next week' WHERE id = 1;

-- ============================================================================
-- FIELD DESCRIPTIONS
-- ============================================================================
-- 
-- id              : Auto-incrementing primary key
-- full_name       : Contact's full name (max 100 chars)
-- email           : Contact's email address (max 100 chars)
-- company         : Company/organization name (optional, max 150 chars)
-- subject         : Message subject (optional, max 200 chars)
-- message         : Full message text (required, up to 5000 chars)
-- ip_address      : IP address of the submitter (for spam prevention)
-- user_agent      : Browser/device information (for analytics)
-- submitted_at    : Date and time of submission
-- status          : Workflow status (new/read/replied/archived)
-- notes           : Internal notes for your team (optional)
-- created_at      : Automatic timestamp when record is created
-- updated_at      : Automatic timestamp when record is modified
--
-- ============================================================================
