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




// print_r($_FILES);
// print_r($_POST);

$main_property_id = $_POST['main_property_id'];
$landlord_id = $_POST['landlord_id'];
$sub_property_id = $_POST['sub_property_id'];
$tenant_qid = $_POST['tenant_QID'];
$contract_no = $_POST['contract_no'];
$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];
$Rent_due_date = $_POST['Rent_due_date'];
$renewel_no = $_POST['Renewel_No'];


$propertycontractname = $_FILES['contract']['name'];
$propertycontractpath = $_FILES['contract']['tmp_name'];


        $destfile2 = 'property_contract/'.$propertycontractname;
        // echo $destfile2;
        move_uploaded_file($propertycontractpath, $destfile2);


        $contract_data = "UPDATE tenant_entry_in_property_by_re
        SET 
        cont_path = '{$destfile2}', con_ref = '{$contract_no}', startdate = '{$start_date}', end_date = '{$end_date}', tenant_rent_date = '{$Rent_due_date}'
        WHERE
        sub_property_id = '$sub_property_id' 
        AND 
        tenant_QID = '$tenant_qid'";

        mysqli_query ($connection, $contract_data);



        $contract_data = "UPDATE reg_and_active_tenant
        SET 
        cont_path = '{$destfile2}', con_ref = '{$contract_no}', startdate = '{$start_date}', end_date = '{$end_date}', tenant_rent_date = '{$Rent_due_date}'
        WHERE
        sub_property_id = '$sub_property_id' 
        AND 
        tenant_QID = '$tenant_qid'";

        mysqli_query ($connection, $contract_data);



        $contract_data = "UPDATE cont_renewel_data
        SET 
        cont_path = '{$destfile2}', con_ref = '{$contract_no}', startdate = '{$start_date}', end_date = '{$end_date}', tenant_rent_date = '{$Rent_due_date}'
        WHERE
        sub_property_id = '$sub_property_id' 
        AND 
        tenant_QID = '$tenant_qid'
        AND 
        cont_renewel_no = '$renewel_no'";

        mysqli_query ($connection, $contract_data);



        // //////////////////////////////////////////////////////////////////////////////////////////




?>