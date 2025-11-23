-- ============================================================================
-- SYNERVION CONTACT FORM - MANAGEMENT QUERIES
-- ============================================================================
-- Quick reference SQL queries for managing contact form submissions
-- Use these in phpMyAdmin or your preferred MySQL client
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 📊 VIEWING SUBMISSIONS
-- ----------------------------------------------------------------------------

-- View all submissions (most recent first)
SELECT 
    id,
    full_name,
    email,
    company,
    subject,
    LEFT(message, 50) AS message_preview,
    submitted_at,
    status
FROM contact_submissions
ORDER BY submitted_at DESC;

-- View only NEW submissions
SELECT * FROM contact_submissions 
WHERE status = 'new' 
ORDER BY submitted_at DESC;

-- View today's submissions
SELECT * FROM contact_submissions 
WHERE DATE(submitted_at) = CURDATE()
ORDER BY submitted_at DESC;

-- View this week's submissions
SELECT * FROM contact_submissions 
WHERE submitted_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
ORDER BY submitted_at DESC;

-- View submissions by email domain
SELECT * FROM contact_submissions 
WHERE email LIKE '%@gmail.com'
ORDER BY submitted_at DESC;

-- Search submissions by keyword
SELECT * FROM contact_submissions 
WHERE message LIKE '%partnership%' 
   OR subject LIKE '%partnership%'
ORDER BY submitted_at DESC;

-- ----------------------------------------------------------------------------
-- 📈 STATISTICS & ANALYTICS
-- ----------------------------------------------------------------------------

-- Count total submissions
SELECT COUNT(*) AS total_submissions 
FROM contact_submissions;

-- Count submissions by status
SELECT 
    status,
    COUNT(*) AS count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM contact_submissions), 2) AS percentage
FROM contact_submissions
GROUP BY status
ORDER BY count DESC;

-- Submissions per day (last 30 days)
SELECT 
    DATE(submitted_at) AS submission_date,
    COUNT(*) AS submissions_count
FROM contact_submissions
WHERE submitted_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY DATE(submitted_at)
ORDER BY submission_date DESC;

-- Top email domains
SELECT 
    SUBSTRING_INDEX(email, '@', -1) AS email_domain,
    COUNT(*) AS count
FROM contact_submissions
GROUP BY email_domain
ORDER BY count DESC
LIMIT 10;

-- Average response time (if you track replied_at)
SELECT 
    AVG(TIMESTAMPDIFF(HOUR, submitted_at, updated_at)) AS avg_hours_to_respond
FROM contact_submissions
WHERE status = 'replied';

-- Busiest submission hours
SELECT 
    HOUR(submitted_at) AS hour_of_day,
    COUNT(*) AS submission_count
FROM contact_submissions
GROUP BY HOUR(submitted_at)
ORDER BY submission_count DESC;

-- ----------------------------------------------------------------------------
-- ✏️ UPDATING SUBMISSIONS
-- ----------------------------------------------------------------------------

-- Mark a submission as READ
UPDATE contact_submissions 
SET status = 'read' 
WHERE id = 1;

-- Mark a submission as REPLIED
UPDATE contact_submissions 
SET status = 'replied' 
WHERE id = 1;

-- Mark a submission as ARCHIVED
UPDATE contact_submissions 
SET status = 'archived' 
WHERE id = 1;

-- Add internal notes
UPDATE contact_submissions 
SET notes = 'Sent partnership proposal via email on 2025-01-15' 
WHERE id = 1;

-- Mark multiple submissions as read
UPDATE contact_submissions 
SET status = 'read' 
WHERE id IN (1, 2, 3, 4, 5);

-- Mark all new submissions from a specific date as read
UPDATE contact_submissions 
SET status = 'read' 
WHERE DATE(submitted_at) = '2025-01-15' 
AND status = 'new';

-- ----------------------------------------------------------------------------
-- 🗑️ MAINTENANCE & CLEANUP
-- ----------------------------------------------------------------------------

-- Delete test submissions (CAREFUL!)
DELETE FROM contact_submissions 
WHERE email LIKE '%test%' 
OR full_name LIKE '%test%';

-- Archive old submissions (older than 1 year)
UPDATE contact_submissions 
SET status = 'archived' 
WHERE submitted_at < DATE_SUB(NOW(), INTERVAL 1 YEAR)
AND status != 'archived';

-- Delete archived submissions older than 2 years (CAREFUL!)
-- Uncomment only if you're sure
-- DELETE FROM contact_submissions 
-- WHERE status = 'archived' 
-- AND submitted_at < DATE_SUB(NOW(), INTERVAL 2 YEAR);

-- ----------------------------------------------------------------------------
-- 📤 EXPORTING DATA
-- ----------------------------------------------------------------------------

-- Export for CSV (copy results and save as CSV)
SELECT 
    id,
    full_name AS 'Full Name',
    email AS 'Email',
    company AS 'Company',
    subject AS 'Subject',
    message AS 'Message',
    DATE_FORMAT(submitted_at, '%Y-%m-%d %H:%i:%s') AS 'Submitted At',
    status AS 'Status'
FROM contact_submissions
ORDER BY submitted_at DESC;

-- Export only new submissions
SELECT 
    id,
    full_name,
    email,
    company,
    subject,
    message,
    submitted_at
FROM contact_submissions
WHERE status = 'new'
ORDER BY submitted_at DESC;

-- ----------------------------------------------------------------------------
-- 🔍 SPAM DETECTION
-- ----------------------------------------------------------------------------

-- Find duplicate emails (potential spam)
SELECT 
    email,
    COUNT(*) AS submission_count
FROM contact_submissions
GROUP BY email
HAVING COUNT(*) > 3
ORDER BY submission_count DESC;

-- Find suspicious IPs (multiple submissions)
SELECT 
    ip_address,
    COUNT(*) AS submission_count,
    GROUP_CONCAT(email SEPARATOR ', ') AS emails
FROM contact_submissions
GROUP BY ip_address
HAVING COUNT(*) > 5
ORDER BY submission_count DESC;

-- Find submissions with suspicious patterns
SELECT * FROM contact_submissions
WHERE message LIKE '%viagra%'
   OR message LIKE '%casino%'
   OR message LIKE '%lottery%'
   OR message LIKE '%crypto%'
   OR message LIKE '%click here%';

-- ----------------------------------------------------------------------------
-- 📊 REPORTING VIEWS
-- ----------------------------------------------------------------------------

-- Create a summary dashboard view
CREATE OR REPLACE VIEW contact_dashboard AS
SELECT 
    (SELECT COUNT(*) FROM contact_submissions WHERE status = 'new') AS new_submissions,
    (SELECT COUNT(*) FROM contact_submissions WHERE status = 'read') AS read_submissions,
    (SELECT COUNT(*) FROM contact_submissions WHERE status = 'replied') AS replied_submissions,
    (SELECT COUNT(*) FROM contact_submissions WHERE DATE(submitted_at) = CURDATE()) AS today_submissions,
    (SELECT COUNT(*) FROM contact_submissions WHERE submitted_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)) AS week_submissions,
    (SELECT COUNT(*) FROM contact_submissions) AS total_submissions;

-- View the dashboard
SELECT * FROM contact_dashboard;

-- ----------------------------------------------------------------------------
-- 🛠️ TROUBLESHOOTING
-- ----------------------------------------------------------------------------

-- Check for NULL values
SELECT 
    COUNT(*) AS total_rows,
    SUM(CASE WHEN full_name IS NULL THEN 1 ELSE 0 END) AS null_names,
    SUM(CASE WHEN email IS NULL THEN 1 ELSE 0 END) AS null_emails,
    SUM(CASE WHEN message IS NULL THEN 1 ELSE 0 END) AS null_messages
FROM contact_submissions;

-- Check table structure
DESCRIBE contact_submissions;

-- Check table size
SELECT 
    COUNT(*) AS row_count,
    ROUND(SUM(LENGTH(message))/1024/1024, 2) AS message_size_mb,
    ROUND((DATA_LENGTH + INDEX_LENGTH)/1024/1024, 2) AS total_size_mb
FROM contact_submissions, information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE()
AND TABLE_NAME = 'contact_submissions';

-- Find the oldest and newest submissions
SELECT 
    MIN(submitted_at) AS oldest_submission,
    MAX(submitted_at) AS newest_submission,
    DATEDIFF(MAX(submitted_at), MIN(submitted_at)) AS days_active
FROM contact_submissions;

-- ----------------------------------------------------------------------------
-- 🔄 BACKUP & RESTORE
-- ----------------------------------------------------------------------------

-- Create a backup table
CREATE TABLE contact_submissions_backup AS 
SELECT * FROM contact_submissions;

-- Restore from backup (CAREFUL!)
-- TRUNCATE TABLE contact_submissions;
-- INSERT INTO contact_submissions SELECT * FROM contact_submissions_backup;

-- ----------------------------------------------------------------------------
-- 📧 EMAIL LISTS
-- ----------------------------------------------------------------------------

-- Export all unique emails for newsletter
SELECT DISTINCT email 
FROM contact_submissions 
WHERE status != 'archived'
ORDER BY email;

-- Export emails from the last 30 days
SELECT DISTINCT email, full_name, company
FROM contact_submissions 
WHERE submitted_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY submitted_at DESC;

-- ----------------------------------------------------------------------------
-- 🎯 WORKFLOW AUTOMATION QUERIES
-- ----------------------------------------------------------------------------

-- Find submissions that need follow-up (read but not replied, older than 48 hours)
SELECT 
    id,
    full_name,
    email,
    subject,
    submitted_at,
    TIMESTAMPDIFF(HOUR, submitted_at, NOW()) AS hours_waiting
FROM contact_submissions
WHERE status = 'read'
AND submitted_at < DATE_SUB(NOW(), INTERVAL 48 HOUR)
ORDER BY submitted_at ASC;

-- Mark submissions as needing urgent attention
UPDATE contact_submissions 
SET notes = CONCAT(IFNULL(notes, ''), ' [URGENT - 7+ days old]')
WHERE status IN ('new', 'read')
AND submitted_at < DATE_SUB(NOW(), INTERVAL 7 DAY)
AND (notes NOT LIKE '%URGENT%' OR notes IS NULL);

-- ============================================================================
-- TIPS FOR REGULAR MAINTENANCE
-- ============================================================================
-- 
-- Daily:
--   • Run the "View only NEW submissions" query
--   • Check the contact_dashboard view
--   • Archive or delete test submissions
--
-- Weekly:
--   • Review "Submissions per day" statistics
--   • Export and backup important submissions
--   • Check for spam patterns
--
-- Monthly:
--   • Archive old replied submissions
--   • Review response time metrics
--   • Clean up duplicate/spam entries
--   • Export data for external CRM if needed
--
-- ============================================================================
