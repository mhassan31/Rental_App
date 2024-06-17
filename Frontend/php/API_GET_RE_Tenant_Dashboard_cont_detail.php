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


// $postdata = file_get_contents('php://input');

$postdata = json_decode(file_get_contents('php://input'), true);


// $sub_property_id = $postdata;

// print_r($postdata);

$sub_property_id = $postdata[0];

// echo "\n";

$tenant_QID = $postdata[1];




$sqldata = "SELECT * FROM cont_renewel_data WHERE sub_property_id = '$sub_property_id' AND tenant_qid = '$tenant_QID'";
$result = mysqli_query($connection, $sqldata);
$row = mysqli_fetch_all($result, MYSQLI_ASSOC);

 echo json_encode($row);




?>






