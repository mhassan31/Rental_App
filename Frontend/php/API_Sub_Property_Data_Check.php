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

// print_r($postdata);

$landlord_id = $postdata['landlord_id'];
$main_property_id = $postdata['main_property_id'];
// $main_property_legal_id = $postdata['main_property_legal_id'];
$sub_property_legal_id = $postdata['sub_property_legal_id'];




// $sqldata = "SELECT * FROM sub_property_detail_db WHERE main_property_id = '$main_property_id' && landlord_id = '$landlord_id' && sub_property_legal_id = '$sub_property_legal_id'";

$sqldata = "SELECT * FROM sub_property_detail_db WHERE main_property_id = '$main_property_id' AND sub_property_legal_id = '$sub_property_legal_id' AND landlord_id = '$landlord_id'";

$result = mysqli_query($connection, $sqldata);




$row = mysqli_fetch_array($result, MYSQLI_ASSOC);



  echo json_encode($row);






?>






