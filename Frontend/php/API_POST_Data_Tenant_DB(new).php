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


$company_name = $postdata['company_name'];
$selected_realestate_landlord_id = $postdata['selected_realestate_landlord_id'];
$reg_id = $postdata['reg_id'];
$first_name = $postdata['first_name'];
$last_name = $postdata['last_name'];
$country_name = $postdata['country_name'];
$mobile_number = $postdata['mobile_number'];
$email = $postdata['email'];
$pswrd = $postdata['pswrd'];




$data = "INSERT INTO tenant_db (tenant_ID, selected_realestate_landlord_id, reg_id, first_name, last_name, country_name, mobile_number, email, pswrd ) VALUES (UUID(), '{$selected_realestate_landlord_id}', '{$reg_id}', '{$first_name}', '{$last_name}', '{$country_name}', '{$mobile_number}', '{$email}', '{$pswrd}')";

$result = mysqli_query($connection, $data);


// $data = "INSERT INTO tenant_sigup_db (tenant_ID, email, pswrd ) VALUES (UUID(), '{$email}', '{$pswrd}')";

// $result = mysqli_query($connection, $data);



// print_r($result);

// echo $email;






?>