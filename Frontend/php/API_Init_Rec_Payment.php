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

if($postdata){
$order_date = $postdata['Order_date'];
$token_id = $postdata['Token_ID'];
$txn_desc= $postdata['Txn_Desc'];
$month = $postdata['month'];
$payment_id = $postdata['payment_id'];
$real_estate_id = $postdata['real_estate_id'];
$rent = $postdata['rent'];
$year = $postdata['year'];

$Inst_Token = "SELECT * FROM recurring_token_data WHERE Token_ID = '$token_id'";
$result_Inst_Token = mysqli_query($connection, $Inst_Token);
$result_row = mysqli_fetch_array($result_Inst_Token , MYSQLI_ASSOC);

$instrument_token = $result_row['Card_Token'];

$sqldata = "SELECT * FROM real_estate_payment_credentials WHERE real_estate_id = '$real_estate_id'";
$result = mysqli_query($connection, $sqldata);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

$merchant_id = $row['merchant_id'];;
$secured_key = $row['secured_key'];
$grant_type = 'client_credentials';

if (count($_GET) > 0) {
    processResponse($merchant_id, $_GET);
}

$Acc_token = getAccessToken($merchant_id, $secured_key, $grant_type);

// echo $Acc_token;

$Init_Payment = Rec_Payment_Request($payment_id, $rent, $order_date, $instrument_token, $txn_desc, $Acc_token);

// print_r($Init_Payment);

// echo $status = $Init_Payment[0];
// echo $status_msg = $Init_Payment[1];
// echo $payment_id = $Init_Payment[2];
// echo $Txn_id = $Init_Payment[3];

 $status = $Init_Payment[0];
 $status_msg = $Init_Payment[1];
 $Rec_payment_id = $Init_Payment[2];
 $Txn_id = $Init_Payment[3];

if($status == "00"){
    echo json_encode("Transaction Successful");
    $status = "Success";
}else{
    echo json_encode("Transaction Failed");
    $status = "Failed";
}

$response_data = "INSERT INTO tenant_property_payments 
(
    payment_link_id,
    real_estate_id,
    payment_id, 
    transaction_id, 
    rent_amount,
    payment_month, 
    payment_year, 
    payment_status
) 
VALUES 
(
    'Tenant', 
    '{$real_estate_id}',
    '{$Rec_payment_id}',
    '{$Txn_id}',
    '{$rent}', 
    '{$month}', 
    '{$year}', 
    '{$status}'
)";

mysqli_query ($connection, $response_data);

}


///////////////////////////////////Function Get Access Token////////////////////////
function getAccessToken($merchant_id, $secured_key, $grant_type)
{
    $tokenApiUrl = 'https://payments.pay2m.com:8443/api/token';
    $urlPostParams = sprintf(
        'merchant_id=%s&secured_key=%s&grant_type=%s',
        $merchant_id,
        $secured_key,
        $grant_type
    );
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $tokenApiUrl);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $urlPostParams);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, 'CURL/PHP pay2m Example');
    $response = curl_exec($ch);
    curl_close($ch);

    $payload = json_decode($response);
    $token = isset($payload->token) ? $payload->token : '';

    return $token;
}
/////////////////////////////////////////END///////////////////////////////////////


///////////////////////////////////Function Recurring Token////////////////////////
function Rec_Payment_Request($payment_id, $rent, $order_date, $instrument_token, $txn_desc, $Acc_token)
{
    $tokenApiUrl = 'https://payments.pay2m.com:8443/api/transaction/recurring';
    $urlPostParams = sprintf(
        'basket_id=%s&txnamt=%s&order_date=%s&instrument_token=%s&txndesc=%s',
        $payment_id,
        $rent,
        $order_date,
        $instrument_token,
        $txn_desc
    );
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $tokenApiUrl);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $urlPostParams);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, 'CURL/PHP pay2m Example');
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer $Acc_token"
    ]);
    $response = curl_exec($ch);
    curl_close($ch);

    $payload = json_decode($response);

    // print_r($payload);

    $status_code = isset($payload->status_code) ? $payload->status_code : '';
    $status_msg = isset($payload->status_msg) ? $payload->status_msg : '';
    $payment_id = isset($payload->basket_id) ? $payload->basket_id : '';
    $transaction_id = isset($payload->transaction_id) ? $payload->transaction_id : '';

    $response = array($status_code, $status_msg, $payment_id, $transaction_id);

    return $response;
}
/////////////////////////////////////////END///////////////////////////////////////

?>