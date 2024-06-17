
<?php





   $merchant_id =  1076;
   $secured_key = 'SprBEnBZhFj9cYtwthf2';
 $num=1;
   $basket_id = 'Basket Item-1';
   $trans_amount = $num;
   if (count($_GET) > 0) {
       processResponse($merchant_id, $basket_id, $trans_amount, $_GET);
   }
   $token = getAccessToken($merchant_id, $secured_key, $basket_id, $trans_amount);
   /**
    * get access token with merchant id, secured key, basket id, transaction amount
    * 
    */
   function getAccessToken($merchant_id, $secured_key, $basket_id, $trans_amount)
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
       return $token;
   }
   /**
    * process response coming from pay2m
    * 
    */
   function processResponse($merchant_id, $original_basket_id, $txnamt, $response)
   {
       /**
        * following parameters sent from pay2m after success/failed transaction
        * 
        */
       $trans_id = $response['transaction_id'];
       $err_code = $response['err_code'];
       $err_msg = $response['err_msg'];
       $basket_id = $response['basket_id'];
       $order_date = $response['order_date'];
       $response_key = $response['Response_Key'];
       $payment_name = $response['PaymentName'];
       $secretword = ''; // No secret code defined for merchant id 102, secret code can be entered in merchant portal.
       $response_string = sprintf("%s%s%s%s%s", $merchant_id, $original_basket_id, $secretword, $txnamt, $err_code);
       $response_hash = hash('MD5', $response_string);
       if (strtolower($response_hash) != strtolower($response_key)) {
           echo "<br/>Transaction could not be varified<br/>";
           return;
       }

       if ($err_code == '000' || $err_code == '00') {
           echo "<strong>Transaction Successfully Completed. Transaction ID: " . $trans_id . "</strong><br/>";
           echo "<br/>Date: " . $order_date;
           return;
       }
       echo "<br/>Transaction Failed. Message: " . $err_msg;
   }
   
   













?>









