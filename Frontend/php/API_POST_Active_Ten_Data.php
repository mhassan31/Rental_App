<?php

header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: GET, OPTIONS");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$connection = mysqli_connect('localhost','root');

mysqli_select_db($connection, 'mydb_2');

$postdata = json_decode(file_get_contents('php://input'),true);

$main_property_id = $postdata['main_property_id'];
$main_property_name = $postdata['main_property_name'];
$payment_id = $postdata['payment_id'];
$real_estate_id = $postdata['real_estate_id'];
$real_estate_name = $postdata['real_estate_name'];
$sub_property_id = $postdata['sub_property_id'];
$sub_property_legal_id = $postdata['sub_property_legal_id'];
$sub_property_name = $postdata['sub_property_name'];
$tenant_name = $postdata['tenant_name'];
$tenant_qid = $postdata['tenant_QID'];
$tenant_reg = $postdata['tenant_reg'];
$tenant_status = $postdata['tenant_status'];
$tenant_email = $postdata['tenant_email'];
$tenant_mobile_number = $postdata['tenant_mobile_number'];




$year = date("Y"); 

$month = date('m');

switch($month){
    case '1':
        $month = "January";
        break;
    
    case '2':
        $month = "February";
        break; 

    case '3':
        $month = "March";
        break; 

    case '4':
        $month = "April";
        break; 

    case '5':
        $month = "May";
        break; 

    case '6':
        $month = "June";
        break; 

    case '7':
        $month = "July";
        break; 

    case '8':
        $month = "August";
        break; 

    case '9':
        $month = "September";
        break; 

    case '10':
        $month = "October";
        break; 

    case '11':
        $month = "November";
        break; 

    case '12':
        $month = "December";
        break; 
  }


        $sqldata = "SELECT * FROM tenant_property_payments 
        WHERE 
        payment_id = '$payment_id' AND payment_month = '$month' AND payment_year = $year";
        $result = mysqli_query($connection, $sqldata);
        $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

        if($row!=null){


            $compiled_data_array = array(
                'main_property_id' => $main_property_id, 
                'main_property_name' => $main_property_name,
                'payment_id'=> $payment_id,
                'real_estate_id'=> $real_estate_id,
                'real_estate_name'=>$real_estate_name,
                'sub_property_id'=>$sub_property_id,
                'sub_property_legal_id'=>$sub_property_legal_id,
                'sub_property_name'=>$sub_property_name,
                'tenant_name'=>$tenant_name,
                'tenant_qid'=>$tenant_qid,
                'tenant_reg'=>$tenant_reg,
                'tenant_status'=>$tenant_status,
                'tenant_email'=>$tenant_email,
                'tenant_mobile_number'=>$tenant_mobile_number,
                'current_month_payment'=>'Paid'
            );

            echo json_encode($compiled_data_array);

            }else{

            $compiled_data_array = array(
                'main_property_id' => $main_property_id, 
                'main_property_name' => $main_property_name,
                'payment_id'=> $payment_id,
                'real_estate_id'=> $real_estate_id,
                'real_estate_name'=>$real_estate_name,
                'sub_property_id'=>$sub_property_id,
                'sub_property_legal_id'=>$sub_property_legal_id,
                'sub_property_name'=>$sub_property_name,
                'tenant_name'=>$tenant_name,
                'tenant_qid'=>$tenant_qid,
                'tenant_reg'=>$tenant_reg,
                'tenant_status'=>$tenant_status,
                'tenant_email'=>$tenant_email,
                'tenant_mobile_number'=>$tenant_mobile_number,
                'current_month_payment'=>'Not Yet Paid'
            );

                echo json_encode($compiled_data_array);

        }




        



?>