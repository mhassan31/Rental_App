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
$mainpropertyid = $_POST['main_property_id'];
$sub_property_id = $_POST['sub_property_id'];
$propertyimagename = $_FILES['myFile']['name'];
$propertyimagepath = $_FILES['myFile']['tmp_name'];

// echo $propertyimagepath;






        $destfile = 'property_images/'.$propertyimagename;
        // echo $destfile;
        move_uploaded_file($propertyimagepath, $destfile);



       

        $subpropertydata = "UPDATE sub_property_detail_db SET sub_property_image = '$destfile'
        WHERE landlord_id = '$landlord_id' AND main_property_id = '$mainpropertyid' AND sub_property_id = '$sub_property_id'";



        mysqli_query ($connection, $subpropertydata);

    





?>