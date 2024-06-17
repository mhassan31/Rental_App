import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthGuardService } from '../auth-guard.service';
// import { ReactiveFormsModule } from '@angular/forms';
//import 'rxjs/add/operator/map';


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

 response  : any;
 responsetenant  : any;

  //result1: any;
  //result: any;

  data : any;
   text = "";
   responsenull = "";
   responsenulltenant="";
  real_estate_data_result_flag: any;
  message: string | undefined;

  uploadForm : any;
  
  
  constructor(private router : Router, private userdata : ApiService, private dataService : DataService, 
    private fb: FormBuilder, private authService : AuthGuardService) { }

  ngOnInit(): void { 

    this.uploadForm = this.fb.group({

      Email : ['',[Validators.required, Validators.email]],
      Pswrd : ['',[Validators.required,Validators.minLength(8)]]

    });

   }



  onUpload(){

    const uploadData = new FormData();

    uploadData.append('Email', this.uploadForm.get('Email')?.value);
    uploadData.append('Pswrd', this.uploadForm.get('Pswrd')?.value);

    // console.log(this.uploadForm.value);

    this.data = this.uploadForm.value;



    this.userdata.loginData(this.data).subscribe((result:any)=>{
     
      {this.response=result}

      console.log(this.response);

      if(this.response == null){
        this.responsenull ="No user found in loadlord DB please proceed to check userdata in tenant DB";
        console.warn(this.responsenull);

        //this funcction will check data tenant db for user login
        this.userdata.logintenantData(this.data).subscribe((resulttenant : any) => {
          {this.responsetenant = resulttenant}

          if(this.responsetenant == null){
            this.responsenulltenant = "No user found in tenant DB please proceed to check userdata in real estate db";
            console.warn(this.responsenulltenant);

            //this funcction will check data real estate db for user login
            this.userdata.login_real_estate_Data(this.data).subscribe((real_estate_data_result : any) => {
              this.real_estate_data_result_flag = real_estate_data_result; 
              if(this.real_estate_data_result_flag == null){
                alert( "No user found you are using incorrect email address or password");
                console.log(this.message);
                

              }else{
                // this.dataService.sendData(real_estate_data_result)
                sessionStorage.setItem('sessionData', JSON.stringify(real_estate_data_result));
                this.authService.login();
                this.router.navigate(['/','userprofile']);
                this.responsenulltenant = "Result found in Real Estate DB Proceed to login to the RE Profile";
                console.log(this.responsenulltenant);
              }
            })

          }
          else{
            
            sessionStorage.setItem('sessionData', JSON.stringify(resulttenant));
            this.authService.login();
            this.router.navigate(['/','tenantprofile']); 
            this.responsenulltenant = "Result found in Tenant DB Proceed to login to the Tenant Profile";
            console.warn(this.responsenulltenant);

          }
        
        })
      }
      else{

        this.responsenull = "Result found in Landlord DB Proceed to login to the Landlord Profile";
        // console.warn(this.responsenull);

        

        this.router.navigate(['/','landlord-profile']);
      }

    })

  }

  
  get Email(){
    return this.uploadForm.get('Email')
  }

  get Pswrd(){
    return this.uploadForm.get('Pswrd')
  }

  forget_pswrd(){

  }


  }


