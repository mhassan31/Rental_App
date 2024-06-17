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

$email = $postdata['Email'];

$postdata = "SELECT * FROM real_estate_companies WHERE email = '$email'";
$result = mysqli_query($connection, $postdata);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

// $row = json_encode($row);
// print_r($row);

if($row==null)
{
    // echo "Check Tenant";
    // echo "\n";
    $postdata = "SELECT * FROM tenant_signup_db WHERE email = '$email'";
    $result = mysqli_query($connection, $postdata);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

    if($row==null)
    {
        // echo "Check Landlord";
        // echo "\n";
        $postdata = "SELECT * FROM local_landlords WHERE email = '$email'";
        $result = mysqli_query($connection, $postdata);
        $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

        if($row==null)
        {
            echo "This is not a registered Email Address";
        }
        else
        {
            echo "This is Registered Landlord";

            $email = $row['email'];



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
            $mail->Subject = 'Here is the subject';

            $otp_email = "101010";

            $email_text = "Your OTP Registration is %s";
            $email_content = sprintf($email_text, $otp_email);
            // echo $email_content;

            // $mail->Body    = 'This is the HTML message body <b>in bold!</b>';

            $mail->Body    = $email_content;


            if($mail->send())
            {
                echo "Email Sent";
            } 
            else
            {
            echo "Error Sending Mail";
            }

            $mail->smtpClose();

        }
    }
    else
    {
            echo "This is Registered Tenant";

            $email = $row['email'];

            echo $email;

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
            $mail->Subject = 'Here is the subject';

            $otp_email = "101010";

            $email_text = "Your OTP Registration is %s";
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


    }

}
else
{
            // echo "This is Real estate Member";

            $email = $row['email'];
            // echo $email;

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
            $mail->Subject = 'Here is the subject';

            $otp_email = "101010";

            $email_text = "Your OTP Registration is %s";
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
    

}




?>