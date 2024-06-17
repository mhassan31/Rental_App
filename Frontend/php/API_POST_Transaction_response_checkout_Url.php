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
//     echo "Connection Denied";
// }

mysqli_select_db($connection, 'mydb_2');

$postdata = $_REQUEST;

if($postdata){

$postdata1 = $postdata['err_code'];
$postdata2 = $postdata['err_msg'];
$postdata3 = $postdata['transaction_id'];
$postdata4 = $postdata['basket_id'];
$postdata5 = $postdata['month'];
$postdata6 = $postdata['year'];
$postdata7 = $postdata['link_id'];

// $myfile = fopen("transaction_log.txt", "w") or die("Unable to open file!");
// $txt = $postdata1;
// fwrite($myfile, $txt);
// fclose($myfile);


if($postdata1==0)
{

    $sqldata = "SELECT * FROM tenant_property_payments 
    WHERE 
    payment_id = '$postdata4' AND payment_year='$postdata6' AND payment_month = '$postdata5'";

    $result = mysqli_query($connection, $sqldata);

    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

    // echo json_encode($row);


    if($row==null){

        // echo "Post Data";

        $status = "Success";
        $data = "INSERT INTO tenant_property_payments (payment_link_id, payment_id, transaction_id, payment_month, payment_year, payment_status) VALUES ('{$postdata7}','{$postdata4}', '{$postdata3}', '{$postdata5}', '{$postdata6}', '{$status}')";
        mysqli_query ($connection, $data);

        $result = "DELETE FROM pay_link_entry_db WHERE 	payment_link_id = '$postdata7'";
        mysqli_query ($connection, $result);

    }
    else{

        echo "Data Already Exist";

    }


}
else
{
    echo "Your Transaction has Failed";
}

}

?>