<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require './vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: GET, OPTIONS");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$connection = mysqli_connect('localhost','root');

mysqli_select_db($connection, 'mydb_2');

$postdata = json_decode(file_get_contents('php://input'), true);

if($postdata != null)
{

$company_name = $postdata['company_name'];
$reg_id = $postdata['reg_id'];
$full_name = $postdata['first_name'];
$mobile_number = $postdata['mobile_number'];
$email = $postdata['email'];
$pswrd = $postdata['pswrd'];

$otp_email = '202020';
$otp_mobile_number = '313131';

$data = "INSERT INTO temp_otp_tbl
(

    mobile_number, 
    mobile_number_otp,
    email,
    email_otp
    
) 
VALUES 
(
    
    '{$mobile_number}', 
    '{$otp_mobile_number}', 
    '{$email}', 
    '{$otp_email}'

)";

mysqli_query ($connection, $data);

echo json_encode("OTP Resend");

///////////////////////////////////////////////////////////////////////////////////////////////////////

$text = "Your OTP for Registeration is %s";

$sms_text = sprintf($text, $otp_mobile_number);

$sms_text = urlencode($sms_text);

$sms_url = "https://connectsms.vodafone.com.qa/SMSConnect/SendServlet?application=http_gw1010&password=zm7e8c9s&content=%s&destination=%s&source=97130&mask=PAY2M";

$sms_url = sprintf($sms_url, $sms_text, $mobile_number);

$smssuccess = file_get_contents($sms_url);

///////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////


//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);


$mail->SMTPDebug = SMTP::DEBUG_SERVER;   
$mail->isSMTP(); 
$mail->Host= 'smtp.office365.com';  
$mail->SMTPAuth   = true;  
// $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;   
$mail->Port       = 587;   
$mail->Username   = 'noreply@pay2m.com';
$mail->Password   = 'Twyla@2022!';

$mail->setFrom('noreply@pay2m.com', 'Mailer');
$mail->addAddress($email); 

$mail->isHTML(true); 
$mail->Subject = 'PAY2M OTP';

$email_text = "Your OTP Registration is %s";

$email_content = sprintf($email_text, $otp_email);

$mail->Body    = $email_content;


if($mail->send()){
    echo "Email Sent";
} else{
    echo "Error Sending Mail";
}

$mail->smtpClose();

//////////////////////////////////////////////////////////////////////////////////////////////////////




}


?>