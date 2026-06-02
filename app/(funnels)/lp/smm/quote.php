<?php
// --- CONFIGURATION ---
$to = "kalyanapura.krishna@gmail.com"; // ✅ Recipient email
$subject = "New Quote Request from Clevercrow Website";

// --- SECURITY: Prevent Direct Access ---
if ($_SERVER["REQUEST_METHOD"] != "POST") {
  http_response_code(403);
  echo "Access Denied.";
  exit;
}

// --- SANITIZE INPUTS ---
$name     = strip_tags(trim($_POST["name"]));
$email    = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$phone    = strip_tags(trim($_POST["phone"]));
$services = isset($_POST["service"]) ? $_POST["service"] : [];
$message  = strip_tags(trim($_POST["message"]));

// --- VALIDATION ---
if (empty($name) || empty($email) || empty($phone) || empty($services)) {
  echo "<h3 style='font-family: Manrope, sans-serif; color:#d9534f;'>⚠️ Please fill in all required fields.</h3>";
  exit;
}

// --- FORMAT SERVICES ---
$services_list = implode(", ", $services);

// --- BUILD EMAIL BODY (HTML) ---
$body = "
<html>
  <body style='font-family: Manrope, sans-serif; background-color:#f7f7f7; padding:20px;'>
    <div style='max-width:600px; margin:auto; background:#fff; border-radius:8px; padding:20px; box-shadow:0 2px 10px rgba(0,0,0,0.1);'>
      <h2 style='color:#0a1a2e; border-bottom:1px solid #eee; padding-bottom:10px;'>📩 New Quote Request</h2>
      <p><strong>Name:</strong> {$name}</p>
      <p><strong>Email:</strong> {$email}</p>
      <p><strong>Phone:</strong> {$phone}</p>
      <p><strong>Service(s) Required:</strong> {$services_list}</p>
      <p><strong>Message:</strong><br> {$message}</p>
      <hr>
      <p style='font-size:12px; color:#888;'>This lead was generated from <strong>clevercrow.in</strong></p>
    </div>
  </body>
</html>
";

// --- EMAIL HEADERS ---
$headers  = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: Clevercrow Website <no-reply@clevercrow.in>" . "\r\n";
$headers .= "Reply-To: {$email}" . "\r\n";

// --- SEND MAIL & REDIRECT ---
if (mail($to, $subject, $body, $headers)) {
  // ✅ Redirect to thank-you page after success
  header("Location: https://clevercrow.in/thankyou/");
  exit;
} else {
  echo "<h3 style='font-family: Manrope, sans-serif; color:#d9534f;'>❌ Oops! Something went wrong. Please try again later.</h3>";
}
?>
