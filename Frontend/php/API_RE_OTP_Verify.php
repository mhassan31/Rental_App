<?php

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
$email_otp = $postdata['email_otp'];
$mobile_number_otp = $postdata['mobile_number_otp'];

// print_r($postdata);

$sqldata = "SELECT * FROM temp_otp_tbl

 WHERE 

 email = '$email' AND mobile_number = '$mobile_number'";

$result = mysqli_query($connection, $sqldata);

$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

if($row['email_otp'] == $email_otp && $row['mobile_number_otp'] == $mobile_number_otp)
{
    // echo "Authentication Successfull";
    echo json_encode("Authentication Successfull");
    
}
else
{
    // echo "Wrong OTP";
    echo json_encode("Wrong OTP");
}

// echo json_encode($row);


}


?>