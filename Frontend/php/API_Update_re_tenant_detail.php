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

// print_r($postdata);


$real_estate_id = $postdata['landlord_id'];
$real_estate_name = $postdata['real_estate_name'];
$main_property_id = $postdata['main_property_id'];
$main_property_name = $postdata['main_property_name'];
$main_property_legal_id = $postdata['main_property_legal_id'];
$main_property_builing_no = $postdata['building_no'];
$main_property_street_no = $postdata['street_no'];
$main_property_zone_no = $postdata['zone_no'];
$sub_property_id = $postdata['sub_property_id'];
$sub_property_name = $postdata['sub_property_name'];
$sub_property_legal_id = $postdata['sub_property_legal_id'];
$sub_property_rent = $postdata['sub_property_rent'];
$tenant_QID = $postdata['tenant_QID'];
$tenant_name= $postdata['tenant_name'];
$tenant_email=$postdata['tenant_email'];
$tenant_mobile=$postdata['tenant_mobile'];

$data = "UPDATE tenant_entry_in_property_by_re SET tenant_QID = '$tenant_QID', 
tenant_name = '$tenant_name', tenant_email = '$tenant_email', tenant_mobile_number = '$tenant_mobile' 
WHERE sub_property_id = '$sub_property_id'";

mysqli_query ($connection, $data);



$data2 = "UPDATE reg_and_active_tenant SET tenant_qid = '$tenant_QID', 
tenant_name = '$tenant_name', tenant_email = '$tenant_email', tenant_mobile_number = '$tenant_mobile'
WHERE sub_property_id = '$sub_property_id'";

mysqli_query ($connection, $data2);


$data3 = "UPDATE cont_renewel_data SET tenant_qid = '$tenant_QID', 
tenant_name = '$tenant_name', tenant_email = '$tenant_email', tenant_mobile_number = '$tenant_mobile'
WHERE sub_property_id = '$sub_property_id'";

mysqli_query ($connection, $data3);



$sqldata = "SELECT * FROM tenant_signup_db WHERE reg_id = '$tenant_QID'";
$result = mysqli_query($connection, $sqldata);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);


if($row!=null){
        $data3 = "UPDATE reg_and_active_tenant SET tenant_status = 'Active' 
        WHERE tenant_qid = '$tenant_QID'";

        mysqli_query ($connection, $data3);


        $data3 = "UPDATE tenant_entry_in_property_by_re SET tenant_status = 'Active' 
        WHERE tenant_QID = '$tenant_QID'";

        mysqli_query ($connection, $data3);
}




?>