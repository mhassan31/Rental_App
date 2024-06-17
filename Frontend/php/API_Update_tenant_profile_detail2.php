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


$tenant_id = $postdata['tenant_id'];
$Password = $postdata['Password'];

$data = "UPDATE tenant_signup_db 
SET 
pswrd = '$Password'
WHERE 
tenant_id = '$tenant_id'";

mysqli_query ($connection, $data);

?>