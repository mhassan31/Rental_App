
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ApiService } from '../api.service';
import { User } from '../user';
import { Real_estate_member } from '../real_estate_member';
import { Tenant_member } from '../tenant_member';
import { Local_landlord_member } from '../local_landlord_member';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ReRegOtpPopupComponent } from '../re-reg-otp-popup/re-reg-otp-popup.component';
import { MatDialog } from '@angular/material/dialog';

import { passwordMismatch } from './Validators/passwordMismatch';
import { AbstractControl } from "@angular/forms";
import { ReOtpService } from './re-otp.service';


@Component({
  selector: 'app-reg-form-real-estate',
  templateUrl: './reg-form-real-estate.component.html',
  styleUrls: ['./reg-form-real-estate.component.css']
})
export class RegFormRealEstateComponent implements OnInit {
  breakloop1: boolean = false;
  breakloop2: boolean = false;
  realestate_db_data_flag: any;
  tenant_db_data_response_flag: any;
  real_estate_reg_current_form_data: any;
  signup_otp_auth_result: any;
  blockZeroError: any;
  blockfourError: boolean = false;
  blockaplhaError: boolean = false;
  blockalphabetError: boolean = false;

  constructor(private userdata: ApiService, private router: Router, private fb: FormBuilder, public dialog: MatDialog, public otp_Service : ReOtpService) { }

  uploadForm: any;

  real_estate_reg_data_var: any;
  real_estate_reg_data_result_var: any;
  real_estate_reg_db_data_result_var: any;
  real_estate_reg_current_form_data_var: any;
  local_landlord_reg_db_data_result_var: any;
  real_estate_reg_db_data_result_length: any;
  real_estate_reg_db_data: any;
  real_estate_post_flag = "";

  local_landlord_reg_db_data_result_length: any;
  local_landlord_reg_db_data: any;
  local_landlord_db_data_response_flag: any;
  local_landlord_post_flag = "";

  tenant_db_data_length: any;
  tenant_db_data: any;
  tenant_post_flag = "";

  registerArray:any={};

  country_code = "+974";

  // event1 : any;

 

  ngOnInit(): void {

    this.uploadForm = this.fb.group({

      account_type : ['Real Estate'],
      company_name: ['',[Validators.required]],
      reg_id: ['',[Validators.required]],
      first_name: ['',[Validators.required]],
      cc : [this.country_code,[Validators.required]],
      mobile_number: ['',[Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      email: ['',[Validators.required, Validators.email]],
      pswrd: ['',[Validators.required, Validators.minLength(8)]],
      c_pswrd : ['', [Validators.required]]

    }
    , { validators: this.MustMatch('pswrd','c_pswrd')}

    );

  }


  get f()
  {
    return this.uploadForm.controls
  }


  MustMatch(controlName : string, matchingControlName: string){
    return (formGroup: FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['MustMatch']) {
          return;
        }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
        } 
      else {
        matchingControl.setErrors(null);
        }
    }
  }


  onUpload() {

    const uploadData = new FormData();

    uploadData.append('account_type', this.uploadForm.get('account_type')?.value);
    uploadData.append('company_name', this.uploadForm.get('company_name')?.value);
    uploadData.append('reg_id', this.uploadForm.get('reg_id')?.value);
    uploadData.append('first_name', this.uploadForm.get('first_name')?.value);
    uploadData.append('mobile_number', this.uploadForm.get('mobile_number')?.value);
    uploadData.append('email', this.uploadForm.get('email')?.value);
    uploadData.append('pswrd', this.uploadForm.get('pswrd')?.value);

    

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // this section of code is belongs to custom dialog popup
    this.real_estate_reg_current_form_data = this.uploadForm.value;
    // sessionStorage.setItem('re_signup_sessionData', JSON.stringify(this.real_estate_reg_current_form_data));
    // this.otp_Service.showDialog = true;
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////

    

    this.userdata.check_realestate_db_Data(this.real_estate_reg_current_form_data).subscribe((realestate_db_data_response: any) => {
      this.realestate_db_data_flag = realestate_db_data_response;
      if (this.realestate_db_data_flag == null) {
        console.log("Data Does not exist in real_estate DB please proceed to check data availability in landlord DB");
        this.userdata.check_local_landlord_db_Data(this.real_estate_reg_current_form_data).subscribe((local_landlord_db_data_response: any) => {
          this.local_landlord_db_data_response_flag = local_landlord_db_data_response;
          if (this.local_landlord_db_data_response_flag == null) {
            console.log("Data Does not exist in landlord DB please proceed to check data availability in tenant DB");
            this.userdata.check_data_tenant_db_Data(this.real_estate_reg_current_form_data).subscribe((tenant_db_Data_response: any) => {
              this.tenant_db_data_response_flag = tenant_db_Data_response;
              if (this.tenant_db_data_response_flag == null) {
                console.log("Generate OTP for Email and Mobile number Authentication");

                // //////////////////////////////////////////////////////////////////////////////////////////////////////////
                // this section of code is belongs to modal popup we comment it out because we have written custom popup code
                // sessionStorage.setItem('re_signup_sessionData', JSON.stringify(this.real_estate_reg_current_form_data));
                // this.dialog.open(ReRegOtpPopupComponent,{width : '20%', height : '300px'})
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////

                this.userdata.del_respective_temp_otp(this.uploadForm.value).subscribe((result: any) => {
                  if (result == "Respective OTP Deleted") {
                    sessionStorage.setItem('re_signup_sessionData', JSON.stringify(this.real_estate_reg_current_form_data));
                    this.otp_Service.showDialog = true;
                    this.userdata.re_signup_otp_generate(this.real_estate_reg_current_form_data).subscribe((signup_otp_auth: any) => {
                      this.signup_otp_auth_result = signup_otp_auth;
                      
                    })
                  }
                })
              } else {
                console.log("Email Address already exist as tenant");
              }
            })
          } else {
            console.log("Email Address already exist as Landlord");
          }
        })
      } else {
        console.log("Email Address already exist as Real Estate Member");
      }
    })

  }



  openDialog() {
    this.dialog.open(ReRegOtpPopupComponent)
  }

  get company_name(){
    return this.uploadForm.get('company_name');
  }

  get reg_id(){
    return this.uploadForm.get('reg_id');
  }

  get first_name(){
    return this.uploadForm.get('first_name');
  }

  get cc(){
    return this.uploadForm.get('cc');
  }

  get mobile_number(){
    return this.uploadForm.get('mobile_number');
  }

  get email(){
    return this.uploadForm.get('email');
  }

  get pswrd(){
    return this.uploadForm.get('pswrd').value;
  }

  get c_pswrd(){
    return this.uploadForm.get('c_pswrd').value;
  }

  OnlyNumbersAllowed(event : any) {
  const charCode = (event.which)?event.which: event.keycode;
    if(charCode>31 && (charCode < 48 || charCode > 57))
    {
      console.log("this is not a number")
      this.blockaplhaError = true;
      return false;
    }
    else{
      this.blockaplhaError = false;
      return true;
    }
  }

  fourNotAllowed(event : any){
    // console.log(event);
    
    const charCode = (event.which)?event.which: event.keycode;
    
    if(charCode>31 && (charCode < 48 || charCode > 57))
    {
      this.blockalphabetError = true;
      return false;
    }
    else
    {
      this.blockalphabetError = false;
      return true;
    }
  }


  blockfourAsFirstDigit(evt : any){
    console.log(evt);
    if(evt.target.value.length === 0 && (evt.key === "4" || evt.key ==="Backspace")){
      this.blockfourError = true;
      evt.preventDefault();
    }
    else{
      this.blockfourError = false;
    }
  
  }

}
