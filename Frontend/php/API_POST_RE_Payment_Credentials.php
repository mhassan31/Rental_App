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

    $real_estate_id = $postdata['real_estate_id'];
    $real_estate_name = $postdata['real_estate_name'];
    $merchant_id = $postdata['Merchant_ID'];
    $secured_key = $postdata['Secured_Key'];

    // print_r($postdata);

    $result = "DELETE FROM real_estate_payment_credentials WHERE real_estate_id = '$real_estate_id'";

    mysqli_query ($connection, $result);
    

    $data = "INSERT INTO real_estate_payment_credentials (real_estate_id, real_estate_name, merchant_id, secured_key) VALUES ('{$real_estate_id}', '{$real_estate_name}', '{$merchant_id}', '{$secured_key}')";

    mysqli_query ($connection, $data);


}








?>