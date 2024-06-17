<?php

header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, OPTIONS");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$connection = mysqli_connect('localhost','root');

mysqli_select_db($connection, 'mydb_2');

$postdata = json_decode(file_get_contents('php://input'), true);

$landlord_id = $postdata['landlord_id'];
$current_password = $postdata['current_pswrd'];
$password = $postdata['pswrd'];

$data_check = "SELECT * From real_estate_companies WHERE real_estate_id = '$landlord_id'";
$result = mysqli_query ($connection, $data_check);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

$row1 = $row['pswrd'];
$current_password1 = $current_password;

if($row1 == $current_password1)
{
	echo json_encode("Correct Current Password");

	$data = "UPDATE real_estate_companies SET pswrd = '$password' WHERE real_estate_id = '$landlord_id'";
	mysqli_query ($connection, $data);

}
else
{
	echo json_encode("Wrong Current Password"); 
}

?>