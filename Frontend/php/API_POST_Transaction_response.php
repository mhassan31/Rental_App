<?php

header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: GET, OPTIONS");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$connection = mysqli_connect('localhost','root');

// if($connection){
//     echo "Connection Established";
// }
// else{
//     echo "Connection Denied";
// }

mysqli_select_db($connection, 'mydb_2');

$postdata = json_decode(file_get_contents('php://input'), true);

if($postdata){

$postdata1 = $postdata['err_code'];
$postdata2 = $postdata['err_msg'];
$postdata3 = $postdata['transaction_id'];
$postdata4 = $postdata['basket_id'];
$postdata5 = $postdata['month'];
$postdata6 = $postdata['year'];
$postdata7 = $postdata['recurring'];
$postdata8 = $postdata['merchant_id'];
$postdata9 = $postdata['Rdv_Message_Key'];
$postdata10 = $postdata['real_estate_id'];
$postdata11 = $postdata['amount'];

if($postdata1==0)
{
    $status = "Success";    
}
else
{
    $status = "Failed";
}

$data = "INSERT INTO tenant_property_payments 
(real_estate_id, payment_id, transaction_id, rent_amount, payment_month, payment_year, payment_status) 
VALUES 
('{$postdata10}','{$postdata4}', '{$postdata3}', '{$postdata11}', '{$postdata5}', '{$postdata6}', '{$status}')";
   
mysqli_query ($connection, $data);

$card_num = $postdata9;

$sqldata2 = "SELECT * FROM recurring_token  WHERE Card_Num = '$card_num'";
$result2 = mysqli_query($connection, $sqldata2);
$row2 = mysqli_fetch_array($result2, MYSQLI_ASSOC);


if($postdata7 == 'yes' && $postdata1 == 0 && $row2 == null){

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $sqldata = "SELECT * FROM real_estate_payment_credentials WHERE merchant_id = '$postdata8'";
    $result = mysqli_query($connection, $sqldata);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

    $merchant_id = $postdata8;
    $secured_key = $row['secured_key'];
    $grant_type = 'client_credentials';

    // echo "\n";
    // echo json_encode($merchant_id);
    // echo "\n";
    // echo json_encode($secured_key);
    // echo "\n";

    if (count($_GET) > 0) {
        processResponse($merchant_id, $_GET);
    }

    $Acc_token = getAccessToken($merchant_id, $secured_key, $grant_type);

    // echo $Acc_token;

    $inst_token = getInstrumentToken($Acc_token, $postdata3);

    // print_r($inst_token); 

    $sqldata = "SELECT * FROM tenant_entry_in_property_by_re WHERE payment_id = '$postdata4'";
    $result = mysqli_query($connection, $sqldata);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

    // echo json_encode($row);

    $real_estate_id = $row["real_estate_id"];
    $real_estate_name = $row["real_estate_name"];
    $tenant_QID = $row["tenant_QID"];
    $tenant_name = $row["tenant_name"];
    $payment_id = $row["payment_id"];
    $card_token = $inst_token[0];
    $card_exp = $inst_token[2];
    $transaction_id = $postdata3;
    $card_num = $postdata9;


    $token_data = "INSERT INTO recurring_token 
    (
        Token_ID,
        Real_Estate_ID, 
        Real_Estate_Name, 
        Tenant_QID, 
        Tenant_Name, 
        Payment_ID,
        Transaction_ID,
        Card_Num,
        Card_Expiry

    ) 
    VALUES 
    (
        UUID(),
        '{$real_estate_id}', 
        '{$real_estate_name}', 
        '{$tenant_QID}', 
        '{$tenant_name}', 
        '{$payment_id}', 
        '{$transaction_id}', 
        '{$card_num}', 
        '{$card_exp}'
    
    )";

    mysqli_query ($connection, $token_data);

    $sqldata2 = "SELECT * FROM recurring_token  WHERE Card_Num = '$card_num'";
    $result2 = mysqli_query($connection, $sqldata2);
    $row2 = mysqli_fetch_array($result2, MYSQLI_ASSOC);

    // echo json_encode($row2);

    $token_id = $row2["Token_ID"];
    $real_estate_id = $row2['Real_Estate_ID'];
    $payment_id = $row2['Payment_ID'];
    $tenant_qid = $row2['Tenant_QID'];
    $card_token = $inst_token[0];

    $rec_token_data = "INSERT INTO recurring_token_data
    (
        Token_ID,
        Card_Token,
        Card_Num,
        real_estate_id,
        payment_id,
        Tenant_QID
    ) 
    VALUES 
    (
        '$token_id',
        '$card_token',
        '$card_num',
        '$real_estate_id',
        '$payment_id',
        '$tenant_qid'

    )";

    mysqli_query ($connection, $rec_token_data);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}else{
    echo json_encode("No Recurring");
}

}


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


function getInstrumentToken($Acc_token, $postdata3)
{
    $tokenApiUrl = sprintf('https://payments.pay2m.com:8443/api/user/instruments?transaction_id=%s', $postdata3);



    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $tokenApiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer $Acc_token"
    ]);
    $response = curl_exec($ch);
    curl_close($ch);
    $payload = json_decode($response);

    // print_r($payload[0]);

    $Instrument_token = isset($payload[0]->instrument_token) ? $payload[0]->instrument_token : '';
    $Instrument_alias= isset($payload[0]->instrument_alias) ? $payload[0]->instrument_alias : '';
    $Card_Expiry = isset($payload[0]->expiry) ? $payload[0]->expiry : '';
    $Account_Type = isset($payload[0]->account_type) ? $payload[0]->account_type : '';

    $response_cred = array($Instrument_token, $Instrument_alias, $Card_Expiry, $Account_Type);

    return $response_cred;
}


?>