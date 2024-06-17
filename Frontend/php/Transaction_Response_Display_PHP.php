<?php


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
$postdata8 = $postdata['real_estate_id'];
$postdata9 = $postdata['amount'];

// $myfile = fopen("transaction_log.txt", "w") or die("Unable to open file!");
// $txt = $postdata1;
// fwrite($myfile, $txt);
// fclose($myfile);


if($postdata1==0)
{
    $trnxn_res = "Transaction Successful";

    // echo $trnxn_res;

    $sqldata = "SELECT * FROM tenant_property_payments 
    WHERE 
    payment_id = '$postdata4' AND payment_year='$postdata6' AND payment_month = '$postdata5'";
    $result = mysqli_query($connection, $sqldata);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

    if($row==null){

        $status = "Success";
        $data = "INSERT INTO tenant_property_payments (payment_link_id, real_estate_id, payment_id, transaction_id, rent_amount, payment_month, payment_year, payment_status) VALUES ('{$postdata7}', '{$postdata8}', '{$postdata4}', '{$postdata3}', '{$postdata9}', '{$postdata5}', '{$postdata6}', '{$status}')";
        mysqli_query ($connection, $data);


        $result = "DELETE FROM pay_link_entry_db WHERE 	payment_link_id = '$postdata7'";
        mysqli_query ($connection, $result);

    }
    else{

        // echo "Data Already Exist";

    }


}
else
{
    $trnxn_res = "Transaction Failed";
    // echo $trnxn_res;
}

}

?>


<!DOCTYPE html>
<html>

<style>

  body{
    background-color: #f5f9fc;
  }

.container{
  /* border : 1px solid black; */
  height : 440px;
  width : 30%;
  margin-left:35%;
  background-color: #ffffff;
  box-shadow: 2px 2px 4px 4px #eaf0f4;
  border-radius : 5px;
}

.heading{
  border : 1px solid #ffffff;
  height : 60px;
  width : 100%;
}

.submit_btn{
  /* border : 1px solid black; */
  height : 60px;
  width : 100%;
}

.submit_btn button{
  padding : 10px 15px 10px 15px;
  margin-left : 42.5%;
  margin-top : 10px;
  background-color : #0a4f5f;
  color : white;
  border-radius : 5px;
  outline : #0a4f5f;

}

.invoice_data{
  /* border : 1px solid black; */
  height : 130px;
  width : 100%;
}

.invoice_data a{
 margin-top : 20px;
}

.image{

  /* border : 1px solid black; */
  height : 142px;
  width : 100%;

}



</style>
<body>

<?php if ($trnxn_res == "Transaction Successful" ) { ?>


<div class="container">
  <div class="image">
    <img style=" height : 150px; width : 150px; margin-left : 35%;" src="http://localhost:8080/angular_app_Rental_Updated/php/pay2m_logo_2.JPG">
  </div>
  <div class="heading"><h2 style="margin-left:27%;"><?php echo $trnxn_res ?></h2></div>
<form method="post" action="tenant_rent_payment_confirm.php">
    <div id="div_login">
        <div class="invoice_data">
          <br>
          <a style="margin-left:22.5%; padding : 20px 10px 20px 10px;">Thank you for the payment of <?php echo $postdata5 ?>, <?php echo $postdata6 ?> </a>
          <br>
          <br>
          <a style="margin-left:22.5%; padding : 90px ;"> Invoice# : <?php echo $postdata7 ?></a>
          <br>
          <img style=" height : 100px; width : 150px; margin-left : 37%; margin-top : 40px;" src="http://localhost:8080/angular_app_Rental_Updated/php/paid-stamp.JPG">
        </div>
    </div>
</form>
</div>

<?php } else{ ?>


    <div class="container">
  <div class="image">
    <img style=" height : 150px; width : 150px; margin-left : 36%;" src="http://localhost:8080/angular_app_Rental_Updated/php/pay2m_logo_2.JPG">
  </div>
  <!-- <div class="heading"><h2 style="margin-left:25%;"><?php echo $trnxn_res ?></h2></div> -->
<form method="post" action="tenant_rent_payment_confirm.php">
    <div id="div_login">
        <div class="invoice_data">
          <br>

          <a style="margin-left:22.5%; padding : 90px ;"> Invoice# : <?php echo $postdata7 ?></a>
          <br>
          <img style=" height : 170px; width : 300px; margin-left : 23%; margin-top : 40px;" src="http://localhost:8080/angular_app_Rental_Updated/php/Transaction_failed.png">
          
        </div>
    </div>
</form>
</div>



<?php } ?>

</body>
</html>



