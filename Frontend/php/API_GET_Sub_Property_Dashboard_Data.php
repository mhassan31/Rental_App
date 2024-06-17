<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Content-Type: application/json; charset=UTF-8");

    $connection = mysqli_connect("localhost","root");

    mysqli_select_db ($connection,'mydb_2');

    $postdata = file_get_contents('php://input');

    $sub_property_id = $postdata;

    $sqldata = "SELECT * FROM property_with_tenant_db WHERE sub_property_id = '$sub_property_id'";

    $result = mysqli_query($connection, $sqldata);

    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

    echo json_encode($row);

?>






