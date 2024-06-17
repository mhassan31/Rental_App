<?php

header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: GET, OPTIONS");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$connection = mysqli_connect('localhost','root');

if($connection){
    echo "Connection Established";
}
else{
    echo "COnnection Failed";
}

mysqli_select_db($connection, 'mydb_2');

if(isset($_POST['submit'])){

    $propertyname = $_POST['property_name'];
    $propertyimage = $_FILES['fileToUpload'];

    print_r($propertyimage);

    $propertyimagename = $propertyimage['name'];
    $propertyimgpath = $propertyimage['tmp_name'];
    $imguploaderror = $propertyimage['error'];



    if($imguploaderror == 0){

        //echo $imguploaderror;

        $destfile = 'property_images/'.$propertyimagename;
        //echo $destfile;
        move_uploaded_file($propertyimgpath, $destfile);

        $propertydata = "INSERT INTO property_detail_db (property_name, property_image) VALUES ('{$propertyname}', '{$destfile}')";

        mysqli_query ($connection, $propertydata);
    }

}else{
    echo "no button has been clicked";
}

//$postdata = json_decode(file_get_contents('php://input'), true);


// $firstname = $postdata['FName'];
// $lastname = $postdata['LName'];
// $Email = $postdata['Email'];
// $password = $postdata['Pswrd'];
// $accounttype = $postdata['accounttype'];

// echo $accounttype

 //$data = "INSERT INTO auth (FName, LName, Email, Pswrd, accounttype) VALUES ('{$firstname}', '{$lastname}', '{$Email}', '{$password}', '{$accounttype}')";

//mysqli_query ($connection, $data);

//header ('location: loginfile.php');

?>