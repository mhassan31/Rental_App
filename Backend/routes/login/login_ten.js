const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const fs = require('fs');
const nodemailer = require('nodemailer');
const util = require('util');
const path = require('path');
const dirPath = path.join(__dirname, 'logs');
// console.log(dirPath);
const hashing = require('../../models/hash_library');
const db_model = require("../../models/index");
const { QueryTypes, UUID } = require('sequelize');
const jwt = require('jsonwebtoken');
const  {jwtDecode}  = require('jwt-decode');


router.post("/login_ten", async (request, response) => {

    const email = request.body.Email;
    const pswrd = request.body.Pswrd;

    const verify_result = await db_model.TEN_Members_Models.findOne({
        where: {
            email: email
        }
    });

    if (verify_result) {

        const extracted_pswrd = verify_result.pswrd;
        const valid = await bcrypt.compare(pswrd, extracted_pswrd);
        const tenant_id = verify_result.tenant_id;
        const reg_id = verify_result.reg_id;
        const company_name = verify_result.company_name;
        const full_name = verify_result.full_name;
        const mobile_number = verify_result.mobile_number;
        const account_type = verify_result.account_type;

        if(valid === true){
            // response.send(verify_result)
            const token = jwt.sign({ userId: email, tenant_id, reg_id, company_name, full_name, mobile_number, account_type }, 'your-secret-key', {
                expiresIn: '1h',
                });
                response.status(200).json({ token, full_name });
        }
        else if(valid === false){
            response.json(null)
        }

    } else{
        response.json(verify_result)
    }

})


// //Testings
// router.post("/test_jwt", async (request, response)=>{

//     const email = request.body.Email;
//     const pswrd = request.body.Pswrd;

//     const verify_result = await db_model.RE_Members_Models.findOne({
//         where: {
//             email:email
//         }
//       });

//       if (verify_result) {

//         const extracted_pswrd = verify_result.pswrd;
//         const valid = await bcrypt.compare(pswrd, extracted_pswrd);
//         const real_estate_id = verify_result.real_estate_id;
//         const reg_id = verify_result.reg_id;
//         const company_name = verify_result.company_name;
//         const first_name = verify_result.first_name;
//         const mobile_number = verify_result.mobile_number;
//         const account_type = verify_result.account_type;

//         if(valid === true){
//             // response.send(verify_result)
//                 const token = jwt.sign({ userId: email, real_estate_id, reg_id }, 'your-secret-key', {
//                 expiresIn: '1h',
//                 });
//                 response.status(200).json({ token });
//         }
//         else if(valid === false){
//             response.json(null)
//         }

//     } else{
//         response.json(verify_result)
//     }

// })

// router.post("/decode_JWT_test", async (request,response)=>{

//     const token = request.body.token;
//     const decoded = jwtDecode(token);

//     response.json(decoded);

// })

// router.post("/test_jwt_api", verify_token, (request, response)=>{

//     jwt.verify(request.token, 'your-secret-key', (err, authData)=>{
//         if(err)
//             console.log(err);
//             else{
//                 response.json({
//                     message : "Welcome to Profile",
//                     userData : authData
//                 })
//             }
//     })

// })


// router.post("/test_jwt_post",verify_token, async (request, response)=>{

//     jwt.verify(request.token, 'your-secret-key', async (err, authData)=>{
//         if(err)
//             console.log(err);
//             else{
//                 response.json({
//                     message : "Post to DB",
//                 })

//                 const post_data = await db_model.RE_Members_Models.update({ 
//                     company_name : request.body.real_estate_name,
//                     email : request.body.email,
//                     first_name : request.body.full_name,
//                     mobile_number : request.body.mobile_number,
//                     reg_id : request.body.reg_id
//                 },{
//                 where: {
//                     real_estate_id: request.body.landlord_id,
//                 },
//               })

//             }
//     })
      
//     })



function verify_token(request, response, next){

    const bearerHeader = request.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        request.token = bearerHeader;

        next();

    }else{
        response.sendStatus(403);
    }
}




module.exports = router;