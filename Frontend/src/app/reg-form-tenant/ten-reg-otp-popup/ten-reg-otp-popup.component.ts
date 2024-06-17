import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { TenOtpService } from '../ten-otp.service';


@Component({
  selector: 'app-ten-reg-otp-popup',
  templateUrl: './ten-reg-otp-popup.component.html',
  styleUrls: ['./ten-reg-otp-popup.component.css']
})
export class TenRegOtpPopupComponent implements OnInit {

  uploadForm : any;
  ten_signup_sessData: any;
  new_ten_signup_sessData: any;
  ten_otp_verify: any;
  resend_OTP_Validate: string |undefined;

  

  constructor(private  userdata: ApiService, private router :Router, private fb: FormBuilder, public dialog: MatDialog, public ten_otp_service : TenOtpService) { }

  ngOnInit(): void {

    this.ten_signup_sessData = sessionStorage.getItem('ten_signup_sessionData');
    this.new_ten_signup_sessData = JSON.parse(this.ten_signup_sessData);

    this.uploadForm = this.fb.group({

      account_type : [this.new_ten_signup_sessData.account_type],
      reg_id : [ this.new_ten_signup_sessData.reg_id],
      full_name : [ this.new_ten_signup_sessData.full_name],
      cc : [this.new_ten_signup_sessData.cc],
      mobile_number : [ this.new_ten_signup_sessData.mobile_number],
      email : [ this.new_ten_signup_sessData.email],
      pswrd : [ this.new_ten_signup_sessData.pswrd],
      email_otp : [''],
      mobile_number_otp : ['']

    });
    
  }

  onUpload(){

    const uploadData = new FormData();

    uploadData.append('account_type', this.uploadForm.get('account_type')?.value);
    uploadData.append('reg_id', this.uploadForm.get('reg_id')?.value);
    uploadData.append('full_name', this.uploadForm.get('full_name')?.value);
    uploadData.append('cc', this.uploadForm.get('cc')?.value);
    uploadData.append('mobile_number', this.uploadForm.get('mobile_number')?.value);
    uploadData.append('email', this.uploadForm.get('email')?.value);
    uploadData.append('pswrd', this.uploadForm.get('pswrd')?.value);
    uploadData.append('email_otp', this.uploadForm.get('email_otp')?.value);
    uploadData.append('mobile_number_otp', this.uploadForm.get('mobile_number_otp')?.value);

    this.userdata.ten_otp_verify(this.uploadForm.value).subscribe((result:any)=>{

      this.ten_otp_verify = result;

      if(this.ten_otp_verify == "Authentication Successfull"){

                this.userdata.post_tenant_Data(this.uploadForm.value).subscribe((tenant_Data_response : any) => {
                  console.log(tenant_Data_response);
                
                   this.router.navigate(['/', 'userlogin']);

                   sessionStorage.removeItem('ten_signup_sessionData');

                  //  this.dialog.closeAll();
 
                   this.userdata.del_respective_temp_otp_ten(this.uploadForm.value).subscribe((result: any) => {})
                
                })

      }

    })


  }

  Cancel_Reg(){

    this.userdata.del_respective_temp_otp_ten(this.uploadForm.value).subscribe((result: any) => {})
    sessionStorage.removeItem('ten_signup_sessionData');
    this.ten_otp_service.ten_showDialog = false;

  }

  resend_OTP(){
    this.userdata.del_respective_temp_otp_ten(this.uploadForm.value).subscribe((result: any) => {
      if(result=='Respective OTP Deleted'){
    this.userdata.ten_otp_resend(this.uploadForm.value).subscribe((result:any)=>{
      this.resend_OTP_Validate = "OTP Resend";
    })
  }
  })
  }

}
