<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (empty($_POST['name']) || empty($_POST['phone'])) {
        exit("Invalid submission");
    }

    $name  = strip_tags(trim($_POST['name']));
    $phone = strip_tags(trim($_POST['phone']));

    $mail = new PHPMailer(true);

    try {
        // SMTP SETTINGS — HOSTINGER
        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'no-reply@clevercrow.in';   // your Hostinger email
        $mail->Password   = 'EMAIL_PASSWORD_HERE';      // Hostinger email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // EMAIL SETTINGS
        $mail->setFrom('no-reply@clevercrow.in', 'Clevercrow Website');
        $mail->addAddress('kalyanapura.krishna@gmail.com'); // where you receive leads
        $mail->addReplyTo('info@clevercrow.in', 'Clevercrow');

        $mail->isHTML(true);
        $mail->Subject = 'New LP Enquiry – Social Media Marketing';
        $mail->Body = "
            <h2>New Enquiry Received</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Phone:</strong> {$phone}</p>
            <p><strong>Page:</strong> {$_SERVER['HTTP_REFERER']}</p>
            <p><strong>IP:</strong> {$_SERVER['REMOTE_ADDR']}</p>
        ";

        $mail->send();

        // SUCCESS REDIRECT
        header("Location: https://clevercrow.in/thankyou/");
        exit();

    } catch (Exception $e) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
}
?>
