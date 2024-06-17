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
$landlord_id = $_POST['landlord_id'];

$propertycontractname = $_FILES['myFile2']['name'];
$propertycontractpath = $_FILES['myFile2']['tmp_name'];


        $destfile2 = 'property_contract/'.$propertycontractname;
        // echo $destfile2;
        move_uploaded_file($propertycontractpath, $destfile2);


        $propertydata = "UPDATE property_detail_db 
        SET 
        main_property_contract = '{$destfile2}' 
        WHERE
        landlord_id = '$landlord_id' 
        AND 
        main_property_id = '$property_id'";

        mysqli_query ($connection, $propertydata);


        // //////////////////////////////////////////////////////////////////////////////////////////




?>