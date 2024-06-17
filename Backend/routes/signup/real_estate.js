const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const fs = require('fs');

const nodemailer = require('nodemailer');

const util = require('util');

const path = require('path');

const dirPath = path.join(__dirname, 'crud');

// console.log(dirPath);

const hashing = require('../../models/hash_library');

const db_model = require("../../models/index");

const { QueryTypes, UUID } = require('sequelize');



//Check Real Estate table 
router.post("/check_re_table", async (request, response)=>{

    const data_Get = await db_model.RE_Members_Models.findOne({
        where: {
            email:request.body.email
        }
      });

    response.json(data_Get);
})

//Check Tenant Table
router.post("/check_ten_table", async (request, response)=>{

    const data_Get = await db_model.TEN_Members_Models.findOne({
        where: {
            email:request.body.email
        }
      });

    response.json(data_Get);
})


//Delete resoective OTP
router.post("/Del_Resp_OTP", async (request, response)=>{

    const email=request.body.email;
    const mobile_number = request.body.mobile_number;

    const sql = "DELETE FROM temp_otp_tbl WHERE email = :req_email && mobile_number = :req_mobile_number";

    const del_result = await db_model.sequelize.query(sql,{ 
        type: QueryTypes.DELETE, 
        replacements:{
            req_email: email,
            req_mobile_number: mobile_number
        }
    })
    response.json("Respective OTP Deleted");
})


//Generate OTP on Email
router.post("/Gen_OTP_RE", async (request, response)=>{

    // response.send("API is Working")

    // //////

    // var transporter = nodemailer.createTransport({
    //     service: 'smtp.office365.com',
    //     port: 587,
    //     auth: {
    //       user: 'noreply@pay2m.com',
    //       pass: 'Twyla@2022!'
    //     }
    //   });
      
    //   var mailOptions = {
    //     from: 'noreply@pay2m.com',
    //     to: 'engr.mhassan91@gmail.com',
    //     subject: 'Sending Email using Node.js',
    //     text: 'That was easy!'
    //   };
      
    //   transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    //   });

    //////




    //////

    // const frmt = util.format('hello %s', 'world');

    // console.log(frmt);

    // var mobile_number = 31464353;

    // var text = "Your OTP for Registeration is %s";

    // var otp_mobile_number = "123456";

    // var sms_text = util.format(text, otp_mobile_number);

    // var sms_text = encodeURIComponent(sms_text);

    // let sms_url = "https://connectsms.vodafone.com.qa/SMSConnect/SendServlet?application=http_gw1010&password=zm7e8c9s&content=%s&destination=%s&source=97130&mask=PAY2M";

    // sms_url = util.format(sms_url, sms_text, mobile_number);

    

    //////

})


//Verify OTP
router.post("/RE_Verify_OTP", async (request, response)=>{

    const email = request.body.email;
    const mobile_number = request.body.mobile_number;
    const email_otp = request.body.email_otp;
    const mobile_number_otp = request.body.mobile_number_otp;

    const sql = "SELECT * FROM temp_otp_tbl WHERE email = :req_email AND mobile_number = :req_mobile_number";

    const verify_result = await db_model.sequelize.query(sql, {
        type: QueryTypes.SELECT,
        replacements:{
            req_email: email,
            req_mobile_number: mobile_number
        }
    })

    if(verify_result[0].email_otp == email_otp && verify_result[0].mobile_number_otp == mobile_number_otp){
        response.json("Authentication Successfull");
    }else{
        response.json("Wrong OTP");
    }
})


//Finally post data in DB
router.post("/Post_RS_User_Data", async (request, response)=>{

    const account_type = request.body.account_type;
    const company_name = request.body.company_name;
    const email = request.body.email;
    const email_otp = request.body.email_otp;
    const first_name = request.body.first_name;
    const mobile_number = request.body.mobile_number;
    const mobile_number_otp = request.body.mobile_number_otp;
    const pswrd_hashing =  await hashing.hash_data(request.body.pswrd);
    const reg_id = request.body.reg_id;

    // console.log(pswrd_hashing);

    const post_data = await db_model.RE_Members_Models.create({ 
        account_type : request.body.account_type, 
        company_name : request.body.company_name,
        email : request.body.email,
        email_otp : request.body.email_otp,
        first_name : request.body.first_name,
        mobile_number : request.body.mobile_number,
        mobile_number_otp : request.body.mobile_number_otp,
        pswrd : pswrd_hashing,
        reg_id : request.body.reg_id

    })

    // bcrypt.compare(test_data, pswrd_hashing, (err, res)=>{
    // if(err){
    //     console.log("err")
    // }else if(res){
    //     console.log("Success")
    // }else{
    //     console.log("no result")
    // }
    // })

    var datetime = new Date();

    // **Write Log file
    fs.appendFile(dirPath+'/logs_signup_attempt.txt', '\n'+datetime+' email:'+email+',account_type:'+account_type, (err)=>{
        if(err){
        console.log(err)
        }
    })

    response.json("clear")

})


module.exports = router;