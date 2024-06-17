<?php

$connection = mysqli_connect('localhost','root');

mysqli_select_db($connection, 'mydb_2');

// echo "Bismillah";

// $link_id = $_REQUEST['link_id'];

$link_id = $_POST['link_id'];

$sqldata = "SELECT * FROM pay_link_entry_db WHERE payment_link_id = '$link_id'";
$result = mysqli_query($connection, $sqldata);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

$real_estate_id = $row['real_estate_id'];

$sqldata2 = "SELECT * FROM real_estate_payment_credentials WHERE real_estate_id = '$real_estate_id'";
$result2 = mysqli_query($connection, $sqldata2);
$row2 = mysqli_fetch_array($result2, MYSQLI_ASSOC);

$num=1;
$merchant_id = $row2['merchant_id'];
$secured_key = $row2['secured_key'];
$basket_id = $row['payment_id'];
$trans_amount = $row['payment_amount'];
$payment_month = $row['payment_month'];
$payment_year = $row['payment_year'];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// if (count($_GET) > 0) {
//     processResponse($merchant_id, $basket_id, $trans_amount, $_GET, $payment_month, $payment_year);
// }
$token = getAccessToken($merchant_id, $secured_key, $basket_id, $trans_amount, $payment_month, $payment_year);
/**
 * get access token with merchant id, secured key, basket id, transaction amount
 * 
 */
function getAccessToken($merchant_id, $secured_key, $basket_id, $trans_amount, $payment_month, $payment_year)
{
    $tokenApiUrl = 'https://payments.pay2m.com/Ecommerce/api/Transaction/GetAccessToken';
    $urlPostParams = sprintf(
        'MERCHANT_ID=%s&SECURED_KEY=%s&TXNAMT=%s&BASKET_ID=%s',
        $merchant_id,
        $secured_key,
        $trans_amount,
        $basket_id
    );
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $tokenApiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $urlPostParams);
    curl_setopt($ch, CURLOPT_USERAGENT, 'CURL/PHP pay2m Example');
    $response = curl_exec($ch);
    curl_close($ch);
    $payload = json_decode($response);
    $token = isset($payload->ACCESS_TOKEN) ? $payload->ACCESS_TOKEN : '';
 //    echo $token;
 //    echo $basket_id;
 //    echo $trans_amount;

    $response_cred = array($token, $basket_id, $trans_amount, $payment_month, $payment_year, $merchant_id);

    // echo json_encode($response_cred);

    return $token;


}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


?>

<!DOCTYPE html>
<html>
<body>

<?php

$access_token = $token;

?> 

<form action=" https://payments.pay2m.com/Ecommerce/api/Transaction/PostTransaction" method="POST" class="paymentWidgets" data-brands="VISA MASTER">

  Currency Code : <input type="text" name="CURRENCY_CODE" value="QAR" readonly><br>
  Merchant ID : <input type="text" name="MERCHANT_ID" value="<?php echo $merchant_id; ?>" readonly><br>
  Merchant Name: <input type="TEXT" name="MERCHANT_NAME" value="UAT Demo Merchant " /><br>
  Token : <input type="text" name="TOKEN" value="<?php echo $access_token; ?>" readonly><br>
  Success Url : <input type="text" name="SUCCESS_URL" value="http://localhost:8080/angular_app_Rental_Updated/php/Transaction_Response_Display_PHP.php?month=<?php echo $payment_month;?>&year=<?php echo $payment_year;?>&link_id=<?php echo $link_id;?>&real_estate_id=<?php echo $real_estate_id;?>&amount=<?php echo $trans_amount;?>" readonly><br>
  Failure Url : <input type="text" name="FAILURE_URL" value="http://localhost:8080/angular_app_Rental_Updated/php/Transaction_Response_Display_PHP.php?month=<?php echo $payment_month;?>&year=<?php echo $payment_year;?>&link_id=<?php echo $link_id;?>&real_estate_id=<?php echo $real_estate_id;?>&amount=<?php echo $trans_amount;?>" readonly><br>
  Checkout Url : <input type="text" name="CHECKOUT_URL" value="http://localhost:8080/angular_app_Rental_Updated/php/API_POST_Transaction_response_checkout_Url.php?month=<?php echo $payment_month;?>&year=<?php echo $payment_year;?>&link_id=<?php echo $link_id;?>&real_estate_id=<?php echo $real_estate_id;?>&amount=<?php echo $trans_amount;?>" readonly><br>
  Customer Email : <input type="text" name="CUSTOMER_EMAIL_ADDRESS" value="engr.mhassan31@gmail.com" readonly><br>
  Customer Mobile : <input type="text" name="CUSTOMER_MOBILE_NO" value="+97431464353" readonly><br>
  Transaction amount : <input type="text" name="TXNAMT" value="<?php echo $trans_amount; ?>" readonly><br>
  Basket ID : <input type="text" name="BASKET_ID" value="<?php echo $basket_id; ?>" readonly><br>
  Transaction Date : <input type="text" name="ORDER_DATE" value="2022-12-15" readonly><br>
  Signature : <input type="text" name="SIGNATURE" value="Tenant_payment" readonly><br>
  Version: <input type="TEXT" name="VERSION" value="MERCHANT-CART-0.1" /><br >
  Item Description : <input type="text" name="TXNDESC" value="Des_value"  readonly><br>
  Procode : <input type="text" name="PROCCODE" value="00"  readonly><br>

  <button type="submit">Pay Now</button>



</form>

</body>
</html>





