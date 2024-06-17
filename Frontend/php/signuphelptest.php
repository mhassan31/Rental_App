<?php

header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: GET, OPTIONS");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$connection = mysqli_connect('localhost','root');

mysqli_select_db($connection, 'mydb_2');

$postdata = json_decode(file_get_contents('php://input'), true);

$firstname = $postdata['FName'];
$lastname = $postdata['LName'];
$Email = $postdata['Email'];
$password = $postdata['Pswrd'];

 $data = "INSERT INTO auth (FName, LName, Email, Pswrd) VALUES ('{$firstname}', '{$lastname}', '{$Email}', '{$password}')";

mysqli_query ($connection, $data);

//header ('location: loginfile.php');

?>