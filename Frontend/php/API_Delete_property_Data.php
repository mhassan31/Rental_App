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

$postdata = file_get_contents('php://input');



// echo $postdata;




        $result = "DELETE FROM property_detail_db WHERE main_property_id = '$postdata'";

        mysqli_query ($connection, $result);

        $result = "DELETE FROM sub_property_detail_db WHERE main_property_id = '$postdata'";

        mysqli_query ($connection, $result);

        $result = "DELETE FROM tenant_entry_in_property_by_re WHERE main_property_id = '$postdata'";

        mysqli_query ($connection, $result);



?>