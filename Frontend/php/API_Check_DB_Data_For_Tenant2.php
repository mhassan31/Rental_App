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


// $company_name = $postdata['company_name'];
$reg_id = $postdata['reg_id'];
// $first_name = $postdata['first_name'];
$full_name = $postdata['full_name'];
$mobile_number = $postdata['mobile_number'];
$email = $postdata['email'];
$pswrd = $postdata['pswrd'];


$postdata = "SELECT * FROM tenant_signup_db WHERE email = '$email'";

$result = mysqli_query($connection, $postdata);

$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

echo json_encode($row);




?>