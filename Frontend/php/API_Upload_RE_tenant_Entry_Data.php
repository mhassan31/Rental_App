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
$property_status = $_POST['property_status'];

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

        $data = "INSERT INTO tenant_entry_in_property_by_re (real_estate_id, real_estate_name, main_property_id, main_property_name, 
        main_property_legal_id, main_property_building_no, main_property_street_no, main_property_zone_no, sub_property_id, 
        sub_property_name, sub_property_legal_id, sub_property_rent, tenant_QID, tenant_name, con_ref, tenant_email, tenant_mobile_number,
        tenant_rent_date, startdate, end_date,
        cont_path ,payment_id, tenant_reg, tenant_status, cont_renewel_no) 
        VALUES ('$landlord_id', '$real_estate_name', '$main_property_id', '$main_property_name', '$main_property_legal_id', 
        '$main_building_no', '$main_street_no', '$main_zone_no', '$sub_property_id', '$sub_property_name', '$sub_property_legal_id', 
        '$sub_property_rent', '$tenant_QID', '$tenant_name', '$contract_ref', '$email', '$mobile_number', '$rent_date', '$start_date',
        '$end_date', '$destfile', UUID(), '$tenant_reg', '$tenant_status', 1)";
        
        mysqli_query ($connection, $data);

        $data8 = "INSERT INTO cont_renewel_data (real_estate_id, real_estate_name, main_property_id, main_property_name, 
        main_property_legal_id, main_property_building_no, main_property_street_no, main_property_zone_no, sub_property_id, 
        sub_property_name, sub_property_legal_id, sub_property_rent, tenant_QID, tenant_name, con_ref, tenant_email, tenant_mobile_number,
        tenant_rent_date, startdate, end_date,
        cont_path , cont_renewel_no) 
        VALUES ('$landlord_id', '$real_estate_name', '$main_property_id', '$main_property_name', '$main_property_legal_id', 
        '$main_building_no', '$main_street_no', '$main_zone_no', '$sub_property_id', '$sub_property_name', '$sub_property_legal_id', 
        '$sub_property_rent', '$tenant_QID', '$tenant_name', '$contract_ref', '$email', '$mobile_number', '$rent_date', '$start_date',
        '$end_date', '$destfile', 1)";
        
        mysqli_query ($connection, $data8);


        $data5 = "UPDATE sub_property_detail_db SET sub_property_status = '$property_status' 
        WHERE sub_property_id = '$sub_property_id'";

        mysqli_query ($connection, $data5);


        $sqldata2 = "SELECT * FROM tenant_entry_in_property_by_re WHERE tenant_QID = '$tenant_QID'";
        $result2 = mysqli_query($connection, $sqldata2);
        $row2 = mysqli_fetch_array($result2, MYSQLI_ASSOC);

        $payment_id = $row2['payment_id'];


        $Active_Ten_Data = "INSERT INTO reg_and_active_tenant 
        (
        real_estate_id, 
        real_estate_name, 
        main_property_id, 
        main_property_name,
        main_property_legal_id,
        main_property_building_no,
        main_property_street_no,
        main_property_zone_no,
        sub_property_id,
        sub_property_legal_id,
        sub_property_name,
        sub_property_rent,
        tenant_qid,
        tenant_name,
        con_ref,
        tenant_email,
        tenant_mobile_number,
        tenant_rent_date,
        startdate,
        end_date,
        cont_path,
        tenant_reg,
        tenant_status,
        payment_id,
        cont_renewel_no
        ) 
        VALUES 
        (
        '$landlord_id', 
        '$real_estate_name', 
        '$main_property_id', 
        '$main_property_name',
        '$main_property_legal_id',
        '$main_building_no', 
        '$main_street_no',
        '$main_zone_no',
        '$sub_property_id', 
        '$sub_property_legal_id', 
        '$sub_property_name', 
        '$sub_property_rent',
        '$tenant_QID', 
        '$tenant_name',
        '$contract_ref',
        '$email', 
        '$mobile_number', 
        '$rent_date', 
        '$start_date',
        '$end_date', 
        '$destfile', 
        '$tenant_reg', 
        '$tenant_status',
        '$payment_id',
        1
        )";
    
        mysqli_query ($connection, $Active_Ten_Data);



        $sqldata = "SELECT * FROM tenant_signup_db WHERE reg_id = '$tenant_QID'";
        $result = mysqli_query($connection, $sqldata);
        $row = mysqli_fetch_array($result, MYSQLI_ASSOC);


        if($row!=null){
                $data2 = "UPDATE reg_and_active_tenant SET tenant_status = 'Active' 
                WHERE tenant_qid = '$tenant_QID'";

                mysqli_query ($connection, $data2);

                $data3 = "UPDATE tenant_entry_in_property_by_re SET tenant_status = 'Active' 
                WHERE tenant_QID = '$tenant_QID'";

                mysqli_query ($connection, $data3);
        }




?>