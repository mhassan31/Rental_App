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
const { jwtDecode } = require('jwt-decode');
const { Where } = require('sequelize/lib/utils');
const { Op } = require("sequelize");



router.post("/login_re", async (request, response) => {

    const email = request.body.Email;
    const pswrd = request.body.Pswrd;

    const verify_result = await db_model.RE_Members_Models.findOne({
        where: {
            email: email
        }
    });

    if (verify_result) {

        const extracted_pswrd = verify_result.pswrd;
        const valid = await bcrypt.compare(pswrd, extracted_pswrd);
        const real_estate_id = verify_result.real_estate_id;
        const reg_id = verify_result.reg_id;
        const company_name = verify_result.company_name;
        const first_name = verify_result.first_name;
        const mobile_number = verify_result.mobile_number;
        const account_type = verify_result.account_type;

        if (valid === true) {
            // response.send(verify_result)
            const token = jwt.sign({ userId: email, real_estate_id, reg_id, company_name, first_name, mobile_number, account_type }, 'your-secret-key', {
                expiresIn: '1h',
            });
            response.status(200).json({ token, first_name });

        }
        else if (valid === false) {
            response.json(null)
        }

    } else {
        response.json(verify_result)
    }

})


//Testings
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

router.post("/user_detail", verify_token, (request, response) => {

    jwt.verify(request.token, 'your-secret-key', async (err, authData) => {
        if (err)
            console.log(err);
        else {

            try {
                const user_data = await db_model.RE_Members_Models.findOne({
                    where: {
                        real_estate_id: authData.real_estate_id
                    }
                });
                response.json(user_data);
            }
            catch (error) {
                response.json(error);
            }
        }
    })

})


router.post("/update_user_detail", verify_token, async (request, response) => {

    jwt.verify(request.token, 'your-secret-key', async (err, authData) => {
        if (err)
            console.log("Error is "+err);
        else {

            try {
                const post_data = await db_model.RE_Members_Models.update({
                    company_name: request.body.real_estate_name,
                    email: request.body.email,
                    first_name: request.body.full_name,
                    mobile_number: request.body.mobile_number,
                    reg_id: request.body.reg_id
                }, {
                    where: {
                        real_estate_id: request.body.landlord_id,
                    },
                })
                response.json("Detail Updated Successfully")
            } catch (error) {
                response.json(error)
            }

        }
    })

})


router.post("/update_user_password", verify_token, async (request, response) => {

    jwt.verify(request.token, 'your-secret-key', async (err, authData) => {
        if (err)
            console.log(err);
        else {

            // response.json(request.body.pswrd);

            const get_data = await db_model.RE_Members_Models.findOne({},
                {
                    where: {
                        real_estate_id: authData.real_estate_id
                    },
                })
            const valid = await bcrypt.compare(request.body.current_pswrd, get_data.pswrd);

            if (valid === true) {
                response.json("Current Password is Correct");
                const pswrd_hashing = await hashing.hash_data(request.body.pswrd);

                const post_data = await db_model.RE_Members_Models.update({

                    pswrd: pswrd_hashing

                }, {
                    where: {
                        real_estate_id: authData.real_estate_id
                    },
                })


            } else {
                response.json("Current Password is Wrong");
            }




        }
    })



})


router.post("/DB_Prop_data", verify_token, (request, response) => {

    jwt.verify(request.token, 'your-secret-key', async (err, authData) => {
        if (err)
            console.log("Error is "+err);
        else {
            try {
                const user_data = await db_model.RE_Prop_Detail_Models.findAll({
                    where: {
                        landlord_id: authData.real_estate_id
                    }
                });
                response.json(user_data);
            }
            catch (error) {
                response.json(error);
            }
        }
    })

})

router.post("/DB_Unit_data", verify_token, (request, response) => {

    jwt.verify(request.token, 'your-secret-key', async (err, authData) => {
        if (err)
            console.log("Error is "+err);
        else {
            try {
                const user_data = await db_model.RE_Unit_Detail_Models.findAll({
                    where: {
                        landlord_id: authData.real_estate_id
                    }
                });
                response.json(user_data);
            }
            catch (error) {
                response.json(error);
            }
        }
    })
})


router.post("/DB_Tenant_data", verify_token, (request, response) => {

    jwt.verify(request.token, 'your-secret-key', async (err, authData) => {
        if (err)
            console.log("Error is "+err);
        else {
            try {
                const user_data = await db_model.RE_Tenant_Entry_Models.findAll({
                    where: {
                        real_estate_id: authData.real_estate_id
                    }
                });
                response.json(user_data);
            }
            catch (error) {
                response.json(error);
            }
        }
    })
})


router.post("/Tenant_Payment_Data", verify_token, (request, response) => {

    jwt.verify(request.token, 'your-secret-key', async (err, authData) => {
        if (err)
            console.log("Error is "+err);
        else {

            var datetime = new Date();
            var month = datetime.getMonth()+1;
            var year = datetime.getFullYear();
        
            switch(month){
                case 1:
                    month = "January";
                    break;
                
                case 2:
                    month = "February";
                    break; 
            
                case 3:
                    month = "March";
                    break; 
            
                case 4:
                    month = "April";
                    break; 
            
                case 5:
                    month = "May";
                    break; 
            
                case 6:
                    month = "June";
                    break; 
            
                case 7:
                    month = "July";
                    break; 
            
                case 8:
                    month = "August";
                    break; 
            
                case 9:
                    month = "September";
                    break; 
            
                case 10:
                    month = "October";
                    break; 
            
                case 11:
                    month = "November";
                    break; 
            
                case 12:
                    month = "December";
                    break; 
              }

            try {
                const user_data = await db_model.TEN_Payment_models.findAll({
                    where: {
                        [Op.and]:[
                            {real_estate_id: authData.real_estate_id}, 
                            {payment_month: month}, 
                            {payment_year: year}, 
                            {payment_status: 'Success'}
                        ]
                    }
                });
                response.json(user_data);
            }
            catch (error) {
                response.json(error);
            }
        }
    })
});


router.post("/Registered_Ten_Data", verify_token, (request, response) => {

    jwt.verify(request.token, 'your-secret-key', async (err, authData) => {
        if (err)
            console.log("Error is "+err);
        else {
            try {
                const user_data = await db_model.RE_Tenant_Entry_Models.findAll({
                    where: {
                        real_estate_id: authData.real_estate_id
                    }
                });
                response.json(user_data);
            }
            catch (error) {
                response.json(error);
            }
        }
    })
});


router.post("/Tenant_Payment_Data_Bar_Chart", verify_token, (request, response) => {

    jwt.verify(request.token, 'your-secret-key', async (err, authData) => {
        if (err)
            console.log("Error is "+err);
        else {

            var datetime = new Date();
            var month = datetime.getMonth()+1;
            var year = datetime.getFullYear();
        

            try {
                const user_data = await db_model.TEN_Payment_models.findAll({
                    where: {
                        [Op.and]:[
                            {real_estate_id: authData.real_estate_id}, 
                            // {payment_month: month}, 
                            {payment_year: year}, 
                            {payment_status: 'Success'}
                        ]
                    }
                });
                response.json(user_data);
            }
            catch (error) {
                response.json(error);
            }
        }
    })
});


router.post("/Prop_Unit_Data", verify_token, (request, response) => {

    jwt.verify(request.token, 'your-secret-key', async (err, authData) => {
        if (err)
            console.log("Error is "+err);
        else {
            try {
                const user_data = await db_model.RE_Unit_Detail_Models.findAll({
                    where: {
                        [Op.and]:[
                            {landlord_id: authData.real_estate_id},
                            {main_property_id: request.body.newData}
                        ]
                    }
                });
                response.json(user_data);
            }
            catch (error) {
                response.json(error);
            }

         
        }
    })
});











function verify_token(request, response, next) {

    const bearerHeader = request.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        request.token = bearerHeader;
        next();

    } else {
        response.sendStatus(403);
    }
}




module.exports = router;