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

$landlord_id = $_POST['landlord_id'];
$landlord_name = $_POST['real_estate_name'];

$mainpropertyid = $_POST['main_property_id'];
$mainpropertyname = $_POST['main_property_name'];
$mainproperty_legal_id = $_POST['main_property_legal_id'];
$mainproperty_building_no = $_POST['building_no'];
$mainproperty_street_no = $_POST['street_no'];
$mainproperty_zone_no = $_POST['zone_no'];

$sub_property_id = $_POST['sub_property_id'];
$sub_property_legal_id = $_POST['sub_property_legal_id'];
$sub_property_name = $_POST['sub_property_name'];
$sub_property_rent = $_POST['sub_property_rent'];



// $propertyimagename = $_FILES['myFile']['name'];
// $propertyimagepath = $_FILES['myFile']['tmp_name'];

// echo $propertyimagepath;






        // $destfile = 'property_images/'.$propertyimagename;
        // // //echo $destfile;
        // move_uploaded_file($propertyimagepath, $destfile);


        $subpropertydata = "UPDATE sub_property_detail_db SET sub_property_name = '$sub_property_name', sub_property_legal_id ='$sub_property_legal_id', sub_property_rent = '$sub_property_rent'
        WHERE landlord_id = '$landlord_id' AND main_property_id = '$mainpropertyid' AND sub_property_id = '$sub_property_id'";

        mysqli_query ($connection, $subpropertydata);



        $subpropertydatafortenant = "UPDATE tenant_entry_in_property_by_re SET sub_property_name = '$sub_property_name', sub_property_legal_id ='$sub_property_legal_id', sub_property_rent = '$sub_property_rent'
        WHERE real_estate_id = '$landlord_id' AND main_property_id = '$mainpropertyid' AND sub_property_id = '$sub_property_id'";

        mysqli_query ($connection, $subpropertydatafortenant);





?>