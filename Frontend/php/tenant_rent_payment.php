<?php

$connection = mysqli_connect('localhost','root');

mysqli_select_db($connection, 'mydb_2');

// echo "Bismillah";

$link_id = $_REQUEST['link_id'];
$status_flag = "";

$sqldata = "SELECT * FROM pay_link_entry_db WHERE payment_link_id = '$link_id'";
$result = mysqli_query($connection, $sqldata);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

$Payment_ID = $row['payment_id'];
$Real_Estate_ID = $row['real_estate_id'];
$Month = $row['payment_month'];
$Year = $row['payment_year'];

$sqldata2 = "SELECT * FROM tenant_property_payments 
WHERE 
payment_id = '$Payment_ID' AND real_estate_id = '$Real_Estate_ID' AND payment_month = '$Month' AND payment_year = '$Year' AND payment_status = 'Success'";
$result2 = mysqli_query($connection, $sqldata2);
$row2 = mysqli_fetch_array($result2, MYSQLI_ASSOC);


if($row!=null && $row2 == null){

$status_flag = "Proceed to Pay";
// echo $status_flag;

$payment_month = $row['payment_month'];
$payment_year = $row['payment_year'];
$payment_amount = $row['payment_amount'];
$real_estate_id = $row['real_estate_id'];


}else{

  $sqldata3 = "SELECT * FROM tenant_property_payments 
  WHERE 
  payment_link_id = '$link_id'";
  $result3 = mysqli_query($connection, $sqldata3);
  $row3 = mysqli_fetch_array($result3, MYSQLI_ASSOC);
  if($row3!=null || $row2 != null){

    // echo "This Invoice has already paid";

    $status_flag = "This Invoice has already paid HTML";
    // echo $status_flag;
    
    $result = "DELETE FROM pay_link_entry_db WHERE 	payment_link_id = '$link_id'";
    mysqli_query ($connection, $result);

  }
  else{
    $status_flag = "This invoice is invalid please investigate with your service provider";
  
  }

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


?>


<!DOCTYPE html>
<html>

<style>

  body{
    background-color: #f5f9fc;
  }

.container{
  /* border : 1px solid black; */
  height : 400px;
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

  <?php if ( $status_flag == "Proceed to Pay" ) { ?>

    <div class="container">
      <div class="image">
        <img style=" height : 150px; width : 150px; margin-left : 35%;" src="http://localhost:8080/angular_app_Rental_Updated/php/pay2m_logo_2.JPG">
      </div>
      <div class="heading"><h2 style="margin-left:22.5%;">Submit Payment Confirmation</h2></div>
    <form method="post" action="tenant_rent_payment_confirm.php">
        <div id="div_login">
            <div>
                <input hidden type="text" class="textbox" id="txt_uname" name="link_id" value="<?php echo $link_id ?>" required = "required"/>
            </div>
            <div class="invoice_data">
              <br>
              <a style="margin-left:22.5%; padding : 20px 10px 20px 10px;">This is the Rent Invoice of <?php echo $payment_month ?>, <?php echo $payment_year ?> </a>
              <br>
              <br>
              <a style="margin-left:22.5%; padding : 90px ;"> Invoice# : <?php echo $link_id ?></a>
              <br>
              <br>
              <a style="margin-left:22.5%; padding : 65px ;"> Rent Amount :  <?php echo $payment_amount ?> QAR</a>
            </div>
            <div class="submit_btn">
                <button type="submit">Pay Now</button>
            </div>
        </div>
    </form>
</div>
  
  <?php } else if($status_flag == "This Invoice has already paid HTML"){ ?>

    <div class="container">
    <div class="image">
        <img style=" height : 150px; width : 150px; margin-left : 35%;" src="http://localhost:8080/angular_app_Rental_Updated/php/pay2m_logo_2.JPG">
      </div>
      <div class="heading"><h2 style="margin-left:25%;">This Invoice has been Paid</h2></div>
      <div class="invoice_data">
      <a style="margin-left:22.5%; padding : 90px; font-size : 18px;"> Invoice# : <?php echo $link_id ?></a>
      <img style=" height : 100px; width : 150px; margin-left : 35%; margin-top : 40px;" src="http://localhost:8080/angular_app_Rental_Updated/php/paid-stamp.JPG">
      </div>

    </div>

    <?php }else { ?>


      <h2><?php echo $status_flag ?></h2>


      <?php } ?>



</body>
</html>




