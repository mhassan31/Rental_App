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

$account_type = $postdata['account_type'];
$reg_id = $postdata['reg_id'];
$full_name = $postdata['full_name'];
$mobile_number = $postdata['mobile_number'];
$email = $postdata['email'];
$pswrd = $postdata['pswrd'];

$data = "INSERT INTO tenant_signup_db 
(
    account_type,
    tenant_ID, 
    reg_id, 
    full_name, 
    mobile_number, 
    email, 
    pswrd 
) 
VALUES 
(
    '{$account_type}',
    UUID(), 
    '{$reg_id}', 
    '{$full_name}', 
    '{$mobile_number}', 
    '{$email}', 
    '{$pswrd}'
)";

$result = mysqli_query($connection, $data);


$sqldata = "SELECT * FROM reg_and_active_tenant WHERE tenant_qid = '{$reg_id}'";
$result = mysqli_query($connection, $sqldata);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

if($row!=null){
    $data2 = "UPDATE reg_and_active_tenant SET tenant_status = 'Active' WHERE tenant_qid = '$reg_id'";
    mysqli_query ($connection, $data2);

    $data3 = "UPDATE tenant_entry_in_property_by_re SET tenant_status = 'Active' WHERE tenant_QID = '$reg_id'";
    mysqli_query ($connection, $data3);
}

}



?>