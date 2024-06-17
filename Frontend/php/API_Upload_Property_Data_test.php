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


// print_r($_FILES);

mysqli_select_db($connection, 'mydb_2');

// $propertydatapost = json_decode(file_get_contents('php://input'), true);


// print_r( $_FILES);

// print_r($_POST);

$propertyname = $_POST['property_name'];
$landlord_id = $_POST['landlord_id'];
$landlord_name = $_POST['real_estate_name'];
$property_legal_id = $_POST['property_legal_id'];
$building_no = $_POST['building_no'];
$street_no = $_POST['street_no'];
$zone_no = $_POST['zone_no'];
$property_type = $_POST['property_type'];
$property_ownership = $_POST['ownership'];

$propertyimagename = $_FILES['myFile']['name'];
$propertyimagepath = $_FILES['myFile']['tmp_name'];

$propertycontractname = $_FILES['myFile2']['name'];
$propertycontractpath = $_FILES['myFile2']['tmp_name'];








        $destfile = 'property_images/'.$propertyimagename;
        // echo $destfile;
        move_uploaded_file($propertyimagepath, $destfile);

        

        $destfile2 = 'property_contract/'.$propertycontractname;
        // echo $destfile2;
        move_uploaded_file($propertycontractpath, $destfile2);




       

        $propertydata = "INSERT INTO property_detail_db (main_property_id, property_type, landlord_id, landlord_real_estate_name, property_ownership, main_property_name, main_property_legal_id, main_property_building_no, main_property_street_no, main_property_zone_no, main_property_image, main_property_contract) 
        VALUES (UUID(), '{$property_type}', '{$landlord_id}', '{$landlord_name}', '{$property_ownership}', '{$propertyname}','{$property_legal_id}', '{$building_no}','{$street_no}','{$zone_no}', '{$destfile}', '{$destfile2}')";

        mysqli_query ($connection, $propertydata);
    





?>