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

$landlord_id=$_POST['landlord_id'];
$real_estate_name=$_POST['real_estate_name'];
$main_property_id=$_POST['main_property_id'];
$main_property_name=$_POST['main_property_name'];
$main_property_legal_id=$_POST['main_property_legal_id'];
$main_building_no=$_POST['building_no'];
$main_street_no=$_POST['street_no'];
$main_zone_no=$_POST['zone_no'];
$sub_property_id=$_POST['sub_property_id'];
$sub_property_name=$_POST['sub_property_name'];
$sub_property_legal_id=$_POST['sub_property_legal_id'];
$sub_property_rent=$_POST['sub_property_rent'];
$tenant_QID=$_POST['tenant_QID'];
$tenant_name=$_POST['tenant_name'];
$contract_ref=$_POST['contract_reference'];
$tenant_reg = $_POST['tenant_reg'];
$tenant_status = $_POST['tenant_status'];
$renewel_no = $_POST['Renewel_No'];
$new_rent = $_POST['New_Rent'];

$email=$_POST['email'];
$mobile_number=$_POST['mobile_number'];
$rent_date=$_POST['rent_date'];

$start_date=$_POST['start_date'];
$end_date=$_POST['end_date'];

$propertyimagename = $_FILES['myFile']['name'];
$propertyimagepath = $_FILES['myFile']['tmp_name'];

// echo $propertyimagepath;


        $destfile = 'property_images/'.$propertyimagename;
        // echo $destfile;
        move_uploaded_file($propertyimagepath, $destfile);



        $data = "INSERT INTO cont_renewel_data (real_estate_id, real_estate_name, main_property_id, main_property_name, 
        main_property_legal_id, main_property_building_no, main_property_street_no, main_property_zone_no, sub_property_id, 
        sub_property_name, sub_property_legal_id, sub_property_rent, tenant_QID, tenant_name, con_ref, tenant_email, tenant_mobile_number,
        tenant_rent_date, startdate, end_date,
        cont_path, cont_renewel_no) 
        VALUES ('$landlord_id', '$real_estate_name', '$main_property_id', '$main_property_name', '$main_property_legal_id', 
        '$main_building_no', '$main_street_no', '$main_zone_no', '$sub_property_id', '$sub_property_name', '$sub_property_legal_id', 
        '$new_rent', '$tenant_QID', '$tenant_name', '$contract_ref', '$email', '$mobile_number', '$rent_date', '$start_date',
        '$end_date', '$destfile', '$renewel_no')";
        
        mysqli_query ($connection, $data);

        
 
        $data5 = "UPDATE sub_property_detail_db SET sub_property_rent = '$new_rent'
        WHERE sub_property_id = '$sub_property_id'";

        mysqli_query ($connection, $data5);


        $data6 = "UPDATE reg_and_active_tenant SET sub_property_rent = '$sub_property_rent' , startdate = '$start_date', 
        end_date = '$end_date', cont_path = '$destfile', cont_renewel_no = '$renewel_no', sub_property_rent = '$new_rent'  WHERE sub_property_id = '$sub_property_id' AND tenant_qid = '$tenant_QID'";

        mysqli_query ($connection, $data6);


        $data7 = "UPDATE tenant_entry_in_property_by_re SET sub_property_rent = '$sub_property_rent' , startdate = '$start_date', 
        end_date = '$end_date', cont_path = '$destfile', cont_renewel_no = '$renewel_no', sub_property_rent = '$new_rent' WHERE sub_property_id = '$sub_property_id' AND tenant_qid = '$tenant_QID'";

        mysqli_query ($connection, $data7);









?>