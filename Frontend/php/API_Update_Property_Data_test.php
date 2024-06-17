<?php

header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: GET, OPTIONS");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$connection = mysqli_connect('localhost','root');

// if($connection){
//     echo "Connection Established";
// }
// else{
//     echo "COnnection Failed";
// }




mysqli_select_db($connection, 'mydb_2');




// print_r( $_FILES);

$property_id = $_POST['property_id'];
$propertyname = $_POST['property_name'];
$landlord_id = $_POST['landlord_id'];
$landlord_name = $_POST['real_estate_name'];
$property_legal_id = $_POST['property_legal_id'];
$building_no = $_POST['building_no'];
$street_no = $_POST['street_no'];
$zone_no = $_POST['zone_no'];


        $propertydata = "UPDATE property_detail_db 
        SET 
        main_property_legal_id = '$property_legal_id', 
        main_property_name = '$propertyname',
        main_property_building_no ='$building_no',  
        main_property_street_no = '$street_no', 
        main_property_zone_no = '$zone_no'
        WHERE
        landlord_id = '$landlord_id' 
        AND 
        main_property_id = '$property_id'";

        mysqli_query ($connection, $propertydata);


        // //////////////////////////////////////////////////////////////////////////////////////////


        $subpropertydata = "UPDATE sub_property_detail_db 
        SET 
        main_property_name = '$propertyname', 
        main_property_legal_id = '$property_legal_id', 
        mainproperty_building_no ='$building_no', 
        mainproperty_street_no ='$street_no', 
        mainproperty_zone_no = '$zone_no' 
        WHERE 
        landlord_id = '$landlord_id' 
        AND 
        main_property_id = '$property_id'";

        mysqli_query ($connection, $subpropertydata);





?>