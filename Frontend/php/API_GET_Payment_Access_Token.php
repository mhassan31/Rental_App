<?php

header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: GET, OPTIONS");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$connection = mysqli_connect('localhost','root');

// if($connection)
// {
//     echo "Connection Established";
// }
// else
// {
//     echo "Doesn't Connect";
// }

mysqli_select_db($connection, 'mydb_2');

$postdata = json_decode(file_get_contents('php://input'), true);

$merchant_id = $postdata['payment_merchant_id'];
$secured_key = $postdata['payment_secured_key'];


$num=1;
   $basket_id = 'Basket Item-1';
   $trans_amount = $num;
   if (count($_GET) > 0) {
       processResponse($merchant_id, $basket_id, $trans_amount, $_GET);
   }
   $token = getAccessToken($merchant_id, $secured_key, $basket_id, $trans_amount);
   /**
    * get access token with merchant id, secured key, basket id, transaction amount
    * 
    */
   function getAccessToken($merchant_id, $secured_key, $basket_id, $trans_amount)
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
       echo $token;
       return $token;
   }
   /**
    * process response coming from pay2m
    * 
    */
   







?>