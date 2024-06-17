<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
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

$payment_id = $postdata['basket_id'];
$payment_month = $postdata['month'];
$payment_year = $postdata['year'];
$transaction_id = $postdata['transaction_id'];

$sqldata = "SELECT * FROM tenant_property_payments 
WHERE 
payment_id = '$payment_id' AND payment_year='$payment_year' AND payment_month = '$payment_month' AND transaction_id = '$transaction_id'";

$result = mysqli_query($connection, $sqldata);

$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

echo json_encode($row);

?>






