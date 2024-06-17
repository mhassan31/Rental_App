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

$postdata = file_get_contents('php://input');
// echo $postdata;

$real_estate_id=$postdata;

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
real_estate_id = '$real_estate_id' AND payment_month = '$month' AND payment_year = '$year' AND payment_status = 'Success'";

$result = mysqli_query($connection, $sqldata);

$row = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($row);

?>






