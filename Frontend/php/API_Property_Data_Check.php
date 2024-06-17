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




$postdata = json_decode(file_get_contents('php://input'),true);

$property_legal_id = $postdata['property_legal_id'];
$landlord_id = $postdata['landlord_id'];


$sqldata = "SELECT * FROM property_detail_db WHERE main_property_legal_id = '$property_legal_id' AND landlord_id = '$landlord_id'";



$result = mysqli_query($connection, $sqldata);




$row = mysqli_fetch_array($result, MYSQLI_ASSOC);



  echo json_encode($row);

// print_r(json_encode($row));




?>






