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


// $postdata = json_decode(file_get_contents('php://input'), true);

// $realestate_id = $postdata;

$realestate_id = file_get_contents('php://input');



$sqldata = "SELECT * FROM tenant_db WHERE selected_realestate_landlord_id = '$realestate_id'";


$result = mysqli_query($connection, $sqldata);


$row = mysqli_fetch_all($result, MYSQLI_ASSOC);


echo json_encode($row);

?>