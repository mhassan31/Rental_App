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

if($postdata)
{

$landlord_id=$postdata['landlord_id'];
$real_estate_name=$postdata['real_estate_name'];
$main_property_id=$postdata['main_property_id'];
$main_property_name=$postdata['main_property_name'];
$main_property_legal_id=['main_property_legal_id'];
$sub_property_id=$postdata['sub_property_id'];
$sub_property_name=$postdata['sub_property_name'];
$sub_property_legal_id=$postdata['sub_property_legal_id'];
$sub_property_rent=$postdata['sub_property_rent'];
$tenant_id=$postdata['tenant_id'];
$tenant_QID=$postdata['tenant_QID'];
$tenant_name=$postdata['tenant_name'];


print_r( $main_property_legal_id);



// print_r($postdata);

// echo $accounttype

// $data = "INSERT INTO property_with_tenant_db (payment_id, real_estate_id, real_estate_name, main_property_id, main_property_name, main_property_legal_id, sub_property_id, sub_property_name, sub_property_legal_id, tenant_id, tenant_QID, tenant_name) 
// VALUES (UUID(),'$landlord_id', '$real_estate_name', '$main_property_id', '$main_property_name','$main_property_legal_id', '$sub_property_id', '$sub_property_name', '$sub_property_legal_id','$tenant_id', '$tenant_QID', '$tenant_name')";


$data = "INSERT INTO property_with_tenant_db (payment_id, real_estate_id, real_estate_name, main_property_id, main_property_name, main_property_legal_id, sub_property_id, sub_property_name, sub_property_legal_id, sub_property_rent, tenant_id, tenant_QID, tenant_name) 
VALUES (UUID(),'$landlord_id', '$real_estate_name', '$main_property_id', '$main_property_name', '$main_property_legal_id', '$sub_property_id', '$sub_property_name', '$sub_property_legal_id','$sub_property_rent','$tenant_id', '$tenant_QID', '$tenant_name')";


mysqli_query ($connection, $data);
}




?>