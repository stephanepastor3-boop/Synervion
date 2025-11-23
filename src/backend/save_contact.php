<?php
/**
 * Synervion Contact Form Handler
 * 
 * This file handles form submissions from the Synervion website contact form
 * and stores them in a MySQL database via phpMyAdmin.
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Upload this file to: /public_html/save_contact.php on your Hostinger server
 * 2. Update the database credentials below with your Hostinger MySQL details
 * 3. Run the SQL schema (see database_schema.sql) in phpMyAdmin to create the table
 * 4. Update the ContactUs.tsx file with your actual domain URL
 * 
 * @version 1.0.0
 * @author Synervion Web Team
 */

// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0); // Set to 0 in production
ini_set('log_errors', 1);
ini_set('error_log', '/path/to/php-error.log'); // Update this path

// Set headers for CORS and JSON response
header('Access-Control-Allow-Origin: *'); // In production, replace * with your domain
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Only POST requests are accepted.'
    ]);
    exit();
}

// ============================================================================
// DATABASE CONFIGURATION
// ============================================================================
// IMPORTANT: Replace these with your actual Hostinger MySQL credentials
// You can find these in your Hostinger control panel under "MySQL Databases"

$servername = "localhost"; // Usually "localhost" for Hostinger
$username = "YOUR_MYSQL_USERNAME"; // Your MySQL username
$password = "YOUR_MYSQL_PASSWORD"; // Your MySQL password
$dbname = "YOUR_DATABASE_NAME"; // Your database name

// ============================================================================
// PROCESS FORM DATA
// ============================================================================

try {
    // Get JSON input
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Validate required fields
    if (empty($data['full_name']) || empty($data['email']) || empty($data['message'])) {
        throw new Exception('Required fields are missing: full_name, email, and message are required.');
    }

    // Sanitize and validate email
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email address format.');
    }

    // Sanitize other inputs
    $full_name = htmlspecialchars(trim($data['full_name']), ENT_QUOTES, 'UTF-8');
    $company = isset($data['company']) ? htmlspecialchars(trim($data['company']), ENT_QUOTES, 'UTF-8') : '';
    $subject = isset($data['subject']) ? htmlspecialchars(trim($data['subject']), ENT_QUOTES, 'UTF-8') : '';
    $message = htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8');

    // Validate field lengths
    if (strlen($full_name) > 100) {
        throw new Exception('Full name is too long (max 100 characters).');
    }
    if (strlen($email) > 100) {
        throw new Exception('Email is too long (max 100 characters).');
    }
    if (strlen($company) > 150) {
        throw new Exception('Company name is too long (max 150 characters).');
    }
    if (strlen($subject) > 200) {
        throw new Exception('Subject is too long (max 200 characters).');
    }
    if (strlen($message) > 5000) {
        throw new Exception('Message is too long (max 5000 characters).');
    }

    // ============================================================================
    // DATABASE CONNECTION
    // ============================================================================

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        throw new Exception('Database connection failed: ' . $conn->connect_error);
    }

    // Set charset to UTF-8
    $conn->set_charset("utf8mb4");

    // ============================================================================
    // INSERT INTO DATABASE
    // ============================================================================

    // Prepare SQL statement (prevents SQL injection)
    $stmt = $conn->prepare("
        INSERT INTO contact_submissions 
        (full_name, email, company, subject, message, ip_address, user_agent, submitted_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    ");

    if (!$stmt) {
        throw new Exception('Prepare statement failed: ' . $conn->error);
    }

    // Get additional metadata
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';

    // Bind parameters
    $stmt->bind_param(
        "sssssss", 
        $full_name, 
        $email, 
        $company, 
        $subject, 
        $message, 
        $ip_address, 
        $user_agent
    );

    // Execute statement
    if (!$stmt->execute()) {
        throw new Exception('Failed to save submission: ' . $stmt->error);
    }

    // Get the inserted ID
    $inserted_id = $stmt->insert_id;

    // Close statement and connection
    $stmt->close();
    $conn->close();

    // ============================================================================
    // OPTIONAL: SEND EMAIL NOTIFICATION
    // ============================================================================
    // Uncomment and configure this section if you want to receive email notifications

    /*
    $to = "partnerships@synervion.com";
    $email_subject = "New Contact Form Submission - Synervion";
    $email_body = "
    New contact form submission received:
    
    Name: $full_name
    Email: $email
    Company: $company
    Subject: $subject
    
    Message:
    $message
    
    ---
    Submitted: " . date('Y-m-d H:i:s') . "
    IP Address: $ip_address
    ";
    
    $headers = "From: noreply@synervion.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    mail($to, $email_subject, $email_body, $headers);
    */

    // ============================================================================
    // SUCCESS RESPONSE
    // ============================================================================

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Your message has been successfully submitted. We will get back to you soon!',
        'submission_id' => $inserted_id
    ]);

} catch (Exception $e) {
    // ============================================================================
    // ERROR RESPONSE
    // ============================================================================

    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);

    // Log error for debugging
    error_log('Contact Form Error: ' . $e->getMessage());
}
?>
