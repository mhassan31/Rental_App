
<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, OPTIONS");
// header('Access-Control-Allow-Credentials: true');
// header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// header("Content-Type: application/json; charset=UTF-8");

// $connection = mysqli_connect("localhost","root");

// // if($connection){
// //     echo "Connection Established";
// // }
// // else{
// //     echo "Incorrect Username and password";
// // }

// mysqli_select_db ($connection,'mydb_2');

// $sqldata = "SELECT * FROM property_detail_db";



// $result = mysqli_query($connection, $sqldata);


// $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

// // $row = mysqli_fetch_array($result);

// //  echo json_encode($row);



// $completePath = 'C:\\xampp\\htdocs\\angular_app_Rental\\php\\property_images\\AWS.png';

// $handle = fopen($completePath, "rb"); 
// $contents = fread($handle, filesize($completePath)); 
// fclose($handle); 

// // $contents = file_get_contents($completePath);
 
// header("content-type: image/png"); 
 
// echo $contents; 



$dir_path = "property_images/";

if(is_dir($dir_path)){

    echo "Path exists";
}else{
    echo "Path don't exists";
}

$files = scandir($dir_path);

// $counts = count($files);

// echo $counts;

echo "file name -> $file[1]";





?>









