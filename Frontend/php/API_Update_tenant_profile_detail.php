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
$reg_id = $postdata['reg_id'];
$full_name = $postdata['full_name'];
$mobile_number = $postdata['mobile_number'];
$Email = $postdata['Email'];

$data = "UPDATE tenant_signup_db 
SET 
reg_id = '$reg_id', full_name = '$full_name', mobile_number ='$mobile_number', 	email = '$Email'
WHERE 
tenant_id = '$tenant_id'";

mysqli_query ($connection, $data);




$sqldata = "SELECT * FROM reg_and_active_tenant WHERE tenant_qid = '{$reg_id}'";
$result = mysqli_query($connection, $sqldata);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);



if($row!=null){
    $data2 = "UPDATE reg_and_active_tenant SET tenant_status = 'Active' WHERE tenant_qid = '$reg_id'";
    mysqli_query ($connection, $data2);

    $data3 = "UPDATE tenant_entry_in_property_by_re SET tenant_status = 'Active' WHERE tenant_QID = '$reg_id'";
    mysqli_query ($connection, $data3);
}



?>