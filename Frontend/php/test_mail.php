
<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require './vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

$mail->SMTPDebug = SMTP::DEBUG_SERVER;   
$mail->isSMTP(); 
$mail->Host= 'smtp.office365.com';  
$mail->SMTPAuth   = true;  
// $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;   
$mail->Port       = 587;   
$mail->Username   = 'cm.hassan14@hotmail.com';
$mail->Password   = 'August@311991';

$mail->setFrom('noreply@pay2m.com', 'Mailer');
$mail->addAddress('hassan@twylatech.com'); 

$mail->isHTML(true); 
$mail->Subject = 'Here is the subject';

$otp_email = "101010";

$email_text = "Your OTP Registration is test %s";
$email_content = sprintf($email_text, $otp_email);
// echo $email_content;

// $mail->Body    = 'This is the HTML message body <b>in bold!</b>';

$mail->Body    = $email_content;


if($mail->send()){
    echo "Email Sent";
} else{
    echo "Error Sending Mail";
}

$mail->smtpClose();



?>









