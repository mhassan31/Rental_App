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

print_r($postdata);


if($postdata)
{

$landlord_id=$postdata['landlord_id'];
$real_estate_name=$postdata['real_estate_name'];
$main_property_id=$postdata['main_property_id'];
$main_property_name=$postdata['main_property_name'];
$main_property_legal_id=$postdata['main_property_legal_id'];
$main_building_no=$postdata['building_no'];
$main_street_no=$postdata['street_no'];
$main_zone_no=$postdata['zone_no'];
$sub_property_id=$postdata['sub_property_id'];
$sub_property_name=$postdata['sub_property_name'];
$sub_property_legal_id=$postdata['sub_property_legal_id'];
$sub_property_rent=$postdata['sub_property_rent'];
$tenant_QID=$postdata['tenant_QID'];
$tenant_name=$postdata['tenant_name'];
$contract_ref=$postdata['contract_reference'];
$start_date=$postdata['start_date'];
$end_date=$postdata['end_date'];


// print_r( $main_property_legal_id);



$data = "INSERT INTO tenant_entry_in_property_by_re (real_estate_id, real_estate_name, main_property_id, main_property_name, main_property_legal_id, main_property_building_no, main_property_street_no, main_property_zone_no, sub_property_id, sub_property_name, sub_property_legal_id, sub_property_rent, tenant_QID, tenant_name, con_ref, startdate, end_date,  payment_id) 
VALUES ('$landlord_id', '$real_estate_name', '$main_property_id', '$main_property_name', '$main_property_legal_id', '$main_building_no', '$main_street_no', '$main_zone_no', '$sub_property_id', '$sub_property_name', '$sub_property_legal_id','$sub_property_rent', '$tenant_QID', '$tenant_name', '$contract_ref', '$start_date', '$end_date', UUID())";


mysqli_query ($connection, $data);
}




?>