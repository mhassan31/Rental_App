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
$year = $postdata['year'];
$payment_id = $postdata['payment_id'];
$month = $postdata['month'];
// $month = 'May';
$rent = $postdata['rent1'];
$email = $postdata['email'];
$mobile = $postdata['mobile'];
$real_estate_id = $postdata['real_estate_id'];
// $email1='hassan@twylatech.com';

$link_id = rand(10,1000000);

$payment_link = "http://localhost:8080/angular_app_Rental_Updated/php/tenant_rent_payment.php?link_id=".$link_id;


$result = "DELETE FROM pay_link_entry_db 
WHERE 
payment_id = '$payment_id' AND payment_month = '$month' AND payment_year = '$year' AND real_estate_id = '$real_estate_id'";

mysqli_query ($connection, $result);



$data = "INSERT INTO pay_link_entry_db
(

    payment_link_id, 
    payment_id,
    real_estate_id,
    payment_month,
    payment_year,
    payment_amount,
    tenant_email,
    tenant_mobile
    
) 
VALUES 
(
    
    '{$link_id}', 
    '{$payment_id}', 
    '{$real_estate_id}',
    '{$month}', 
    '{$year}',
    '{$rent}',
    '{$email}',
    '{$mobile}'

)";

mysqli_query ($connection, $data);


// ///////////////////////////////////////////////////////////////////////////////////////////////////////

$text = "Dear Tenant your Rent of this month is due, you can pay through the link below %s";

$sms_text = sprintf($text, $payment_link);

$sms_text = urlencode($sms_text);

$sms_url = "https://connectsms.vodafone.com.qa/SMSConnect/SendServlet?application=http_gw1010&password=zm7e8c9s&content=%s&destination=%s&source=97130&mask=PAY2M";

$sms_url = sprintf($sms_url, $sms_text, $mobile);

$smssuccess = file_get_contents($sms_url);

// /////////////////////////////////////////////////////////////////////////////////////////////////////


// ////////////////////////////////////////////////////////////////////////////////////////////////////


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
$email_text = "Dear Tenant your Rent of this month is due, you can pay through the link below %s";
$email_content = sprintf($email_text, $payment_link);
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