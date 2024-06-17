// console.log("Bismillah")
const { Op } = require("sequelize");
const express = require('express');
var cors = require('cors');


const db_model = require("./models/index");

const app = express();
app.use(express.json());
app.use(cors());

const bodyParser = require('body-parser');

app.get("/",async (request, response)=>{

    // db_connection.query("Select * from tenant_entry_in_property_by_re", (error,result)=>{
    //     if(error){
    //         response.send("Error");
    //     }else{
    //         response.send(result);
    //     }
    // })

    const data =await db_model.RE_Members_Models.findOne();

    response.send(data);
});

    const signupRouter = require('./routes/signup/real_estate');
    app.use("/signup_process", signupRouter); //------/signup_process/check_re_table


    const signupRouter_Ten = require('./routes/signup/tenant');
    app.use("/signup_process_Ten", signupRouter_Ten); //------/signup_process/check_re_table


    const loginRouter = require('./routes/login/login_re');
    app.use("/login_process_re", loginRouter); //------/signup_process/check_re_table


    const loginRouter_ten = require('./routes/login/login_ten');
    app.use("/login_process_ten", loginRouter_ten); //------/signup_process/check_re_table
    

// app.post("/", (request, response)=>{
//     // const data={name:'Muhammad', password:'abcd@1234', user_type:'Elite'};

//     const data=request.body;

//     db_connection.query('INSERT INTO test1 SET?', data, (error, result, fields)=>{
//         if(error){
//             response.send("Error")
//         }else{
//             response.send(result)
//         }
//     })
// })


// app.put("/", (request, response)=>{

//     const data = [request.body.name, request.body.password, request.body.user_type, request.body.id];

//     db_connection.query("UPDATE test1 SET name = ?, password = ?, user_type = ? where id = ?", data, (error, result, fields)=>{
//         if(error){
//             response.send("Error");
//         }else{
//             response.send(result);
//         }
//     });
// })


// app.delete("/", (request, response)=>{

//     const data = request.body.id;

    // db_connection.query("DELETE FROM test1 WHERE id = ?",data, (error, result, fields)=>{

//         if(error){
//             throw error
//         }
//         else{
//             response.send(result);
//         };
//     })

// })

app.listen(5000, console.log('Server is listening at PORT : 5000'));

