<?php

header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, OPTIONS");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");
// header("Content-Type: text/plain, charset=UTF-8");

$connection = mysqli_connect('localhost','root');

mysqli_select_db($connection, 'mydb_2');

$postdata = json_decode(file_get_contents('php://input'), true);

// $postdata =file_get_contents('php://input');

// print_r($postdata);


$landlord_id = $postdata['landlord_id'];
$company_name = $postdata['company_name'];
$reg_id = $postdata['reg_id'];
$full_name = $postdata['full_name'];
$mobile_number = $postdata['mobile_number'];
$email = $postdata['email'];




 $data = "UPDATE real_estate_companies SET first_name = '$full_name', mobile_number='$mobile_number',
 	email = '$email' WHERE real_estate_id = '$landlord_id'";

mysqli_query ($connection, $data);




?>