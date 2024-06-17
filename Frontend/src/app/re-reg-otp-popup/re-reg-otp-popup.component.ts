import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { ApiService } from '../api.service';
import { ReOtpService } from '../reg-form-real-estate/re-otp.service';

@Component({
  selector: 'app-re-reg-otp-popup',
  templateUrl: './re-reg-otp-popup.component.html',
  styleUrls: ['./re-reg-otp-popup.component.css']
})
export class ReRegOtpPopupComponent implements OnInit {
  signup_sessData: any;
  new_signup_sessData: any;
  re_otp_verify: any;
  otp_auth: any;
  uploadFormresendOTP: any;
  resend_OTP_Validate: any;

  constructor(private  userdata: ApiService, private router :Router, private fb: FormBuilder, public dialog: MatDialog, public otp_Service : ReOtpService) { }

  uploadForm : any;

  ngOnInit(): void {

    this.signup_sessData = sessionStorage.getItem('re_signup_sessionData');
    this.new_signup_sessData = JSON.parse(this.signup_sessData);

    // console.log(this.new_signup_sessData);

      this.uploadForm = this.fb.group({

      account_type : ['real_estate'],
      company_name : [ this.new_signup_sessData.company_name],
      reg_id : [ this.new_signup_sessData.reg_id],
      first_name : [ this.new_signup_sessData.first_name],
      mobile_number : [ this.new_signup_sessData.mobile_number],
      email : [ this.new_signup_sessData.email],
      pswrd : [ this.new_signup_sessData.pswrd],
      email_otp : [''],
      mobile_number_otp : ['']

    });

  }

  handleChange(){
    console.log("Clicked Outside")
  }

  onUpload(){

    const uploadData = new FormData();

    uploadData.append('account_type', this.uploadForm.get('account_type')?.value);
    uploadData.append('company_name', this.uploadForm.get('company_name')?.value);
    uploadData.append('reg_id', this.uploadForm.get('reg_id')?.value);
    uploadData.append('first_name', this.uploadForm.get('first_name')?.value);
    uploadData.append('mobile_number', this.uploadForm.get('mobile_number')?.value);
    uploadData.append('email', this.uploadForm.get('email')?.value);
    uploadData.append('pswrd', this.uploadForm.get('pswrd')?.value);
    uploadData.append('email_otp', this.uploadForm.get('email_otp')?.value);
    uploadData.append('mobile_number_otp', this.uploadForm.get('mobile_number_otp')?.value);
  
    // console.log(this.uploadForm.value)

    this.userdata.re_otp_verify(this.uploadForm.value).subscribe((result:any)=>{

      this.re_otp_verify = result;

      if(this.re_otp_verify == "Authentication Successfull"){

        // console.log("Authentication Successfull please post data");

        this.otp_auth = "Authentication Successfull";

                this.userdata.post_real_estate_Data(this.uploadForm.value).subscribe((real_estate_data_response : any) => {
                  console.log(real_estate_data_response);
  
                  this.router.navigate(['/', 'userlogin']);

                  sessionStorage.removeItem('re_signup_sessionData');

                  this.dialog.closeAll();

                  this.userdata.del_respective_temp_otp(this.uploadForm.value).subscribe((result: any)=>{})

                })




      }else{
        // console.log("OTP Authentication Failure");
        this.otp_auth = "Invalid OTP";
      }

    })

  }

  Cancel_Reg(){
    this.userdata.del_respective_temp_otp(this.uploadForm.value).subscribe((result: any)=>{})
    sessionStorage.removeItem('re_signup_sessionData');
    this.dialog.closeAll();
    this.otp_Service.showDialog = false;
    // this.router.navigate(['/', 'reg-form-real-estate']);2q

  }

  resend_OTP(){

    this.uploadFormresendOTP = this.fb.group({

      company_name : [this.new_signup_sessData.company_name],
      reg_id : [this.new_signup_sessData.reg_id],
      first_name : [this.new_signup_sessData.first_name],
      mobile_number : [this.new_signup_sessData.mobile_number],
      email : [this.new_signup_sessData.email],
      pswrd : [this.new_signup_sessData.pswrd],
    });


    const uploadData = new FormData();

    uploadData.append('company_name', this.uploadFormresendOTP.get('company_name')?.value);
    uploadData.append('reg_id', this.uploadFormresendOTP.get('reg_id')?.value);
    uploadData.append('first_name', this.uploadFormresendOTP.get('first_name')?.value);
    uploadData.append('mobile_number', this.uploadFormresendOTP.get('mobile_number')?.value);
    uploadData.append('email', this.uploadFormresendOTP.get('email')?.value);
    uploadData.append('pswrd', this.uploadFormresendOTP.get('pswrd')?.value);

    // console.log(this.uploadFormresendOTP.value);
    
    this.userdata.del_respective_temp_otp(this.uploadForm.value).subscribe((result: any)=>{
      if(result == "Respective OTP Deleted"){
        this.userdata.Re_Resend_OTP(this.uploadFormresendOTP.value).subscribe((res:any)=>{
          this.resend_OTP_Validate = "OTP Resend";
        })
      }
    })





  }

}
