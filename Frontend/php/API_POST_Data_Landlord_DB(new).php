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

if($postdata != null){
$company_name = $postdata['company_name'];
$reg_id = $postdata['reg_id'];
$first_name = $postdata['first_name'];
$last_name = $postdata['last_name'];
$country_name = $postdata['country_name'];
$mobile_number = $postdata['mobile_number'];
$email = $postdata['email'];
$pswrd = $postdata['pswrd'];




$data = "INSERT INTO local_landlords (landlord_id, company_name, reg_id, first_name, last_name, country_name, mobile_number, email, pswrd ) VALUES (UUID(), '{$company_name}', '{$reg_id}', '{$first_name}', '{$last_name}', '{$country_name}', '{$mobile_number}', '{$email}', '{$pswrd}')";

$result = mysqli_query($connection, $data);



// print_r($result);

// echo $email;

}




?>