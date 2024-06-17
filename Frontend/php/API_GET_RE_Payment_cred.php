<?php

header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, OPTIONS");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$connection = mysqli_connect("localhost","root");

// if($connection){
//     echo "Connection Established";
// }
// else{
//     echo "Incorrect Username and password";
// }

mysqli_select_db ($connection,'mydb_2');

$postdata = json_decode(file_get_contents('php://input'), true);

// print_r($postdata);

$year = $postdata['year'];
$month = $postdata['month'];
$payment_id = $postdata['payment_id'];
$real_estate_id = $postdata['real_estate_id'];
$rent=$postdata['rent'];


$sqldata = "SELECT * FROM real_estate_payment_credentials WHERE real_estate_id = '$real_estate_id'";

$result = mysqli_query($connection, $sqldata);

$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

// echo json_encode($row);

$merchant_id = $row['merchant_id'];
$secured_key = $row['secured_key'];

$num=1;
   $basket_id = $payment_id;
   $trans_amount = $rent;
   $payment_month = $month;
   $payment_year = $year;
   if (count($_GET) > 0) {
       processResponse($merchant_id, $basket_id, $trans_amount, $_GET, $payment_month, $payment_year, $real_estate_id);
   }
   $token = getAccessToken($merchant_id, $secured_key, $basket_id, $trans_amount, $payment_month, $payment_year, $real_estate_id);
   /**
    * get access token with merchant id, secured key, basket id, transaction amount
    * 
    */
   function getAccessToken($merchant_id, $secured_key, $basket_id, $trans_amount, $payment_month, $payment_year, $real_estate_id)
   {
       $tokenApiUrl = 'https://payments.pay2m.com/Ecommerce/api/Transaction/GetAccessToken';
       $urlPostParams = sprintf(
           'MERCHANT_ID=%s&SECURED_KEY=%s&TXNAMT=%s&BASKET_ID=%s',
           $merchant_id,
           $secured_key,
           $trans_amount,
           $basket_id
       );
       $ch = curl_init();
       curl_setopt($ch, CURLOPT_URL, $tokenApiUrl);
       curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
       curl_setopt($ch, CURLOPT_POST, 1);
       curl_setopt($ch, CURLOPT_POSTFIELDS, $urlPostParams);
       curl_setopt($ch, CURLOPT_USERAGENT, 'CURL/PHP pay2m Example');
       $response = curl_exec($ch);
       curl_close($ch);
       $payload = json_decode($response);
       $token = isset($payload->ACCESS_TOKEN) ? $payload->ACCESS_TOKEN : '';

       $response_cred = array($token, $basket_id, $trans_amount, $payment_month, $payment_year, $merchant_id, $real_estate_id);

       echo json_encode($response_cred);

       return $token;
   }







?>






