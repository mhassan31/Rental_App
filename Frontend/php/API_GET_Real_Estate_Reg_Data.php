<?php

 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

//============================Live API START========================//

$connection = mysqli_connect("localhost","root");

// if($connection){
//     echo "Connection Established";
// }
// else{
//     echo "Incorrect Username and password";
// }

mysqli_select_db ($connection,'mydb_2');

$postdata = json_decode(file_get_contents('php://input'), true);

// $Email = $postdata['Email'];
// $password = $postdata['Pswrd'];

// $sqldata = "SELECT * FROM real_estate_companies WHERE email = '$Email' and pswrd = '$password'";

$sqldata = "SELECT * FROM real_estate_companies";

$result = mysqli_query($connection, $sqldata);

$row = mysqli_fetch_all($result, MYSQLI_ASSOC);


echo json_encode($row);

 //============================Live API END========================//


?>