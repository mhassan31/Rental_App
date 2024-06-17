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


router.post("/check_re_table", async (request, response)=>{

    // response.json("API is Working Working");

    const data_Get = await db_model.RE_Members_Models.findOne({
        where: {
            email:request.body.email
        }
      });

    response.json(data_Get);


})


router.post("/check_ten_table", async (request, response)=>{

    const data_Get = await db_model.TEN_Members_Models.findOne({
        where: {
            email:request.body.email
        }
      });

    response.json(data_Get);
})


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


router.post("/Ten_Verify_OTP", async (request, response)=>{

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

router.post("/Post_Ten_User_Data", async (request, response)=>{

    const account_type = request.body.account_type;
    const email = request.body.email;
    const email_otp = request.body.email_otp;
    const full_name = request.body.first_name;
    const mobile_number = request.body.mobile_number;
    const mobile_number_otp = request.body.mobile_number_otp;
    const pswrd_hashing =  await hashing.hash_data(request.body.pswrd);
    const reg_id = request.body.reg_id;

    // console.log(pswrd_hashing);

    const post_data = await db_model.TEN_Members_Models.create({ 
        account_type : request.body.account_type, 
        email : request.body.email,
        email_otp : request.body.email_otp,
        full_name : request.body.first_name,
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