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

$tenant_qid = $postdata['Tenant_QID'];
$tenant_payment_id = $postdata['payment_id'];
$sub_property_id = $postdata['sub_property_id'];


$result = "DELETE FROM tenant_entry_in_property_by_re WHERE tenant_QID = '$tenant_qid' AND payment_id = '$tenant_payment_id'";
mysqli_query ($connection, $result);

$data3 = "UPDATE reg_and_active_tenant SET tenant_status = 'Contract Ended' WHERE tenant_qid = '$tenant_qid' AND payment_id = '$tenant_payment_id'";

mysqli_query ($connection, $data3);


$data4 = "UPDATE sub_property_detail_db SET sub_property_status = 'Vacant' WHERE sub_property_id = '$sub_property_id'";

mysqli_query ($connection, $data4);






?>






