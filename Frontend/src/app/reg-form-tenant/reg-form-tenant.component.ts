import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {ApiService} from '../api.service';
import {User} from '../user';
import { Real_estate_member } from '../real_estate_member';
import { Tenant_member } from '../tenant_member';
import { Local_landlord_member } from '../local_landlord_member';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TenOtpService } from './ten-otp.service';

@Component({
  selector: 'app-reg-form-tenant',
  templateUrl: './reg-form-tenant.component.html',
  styleUrls: ['./reg-form-tenant.component.css']
})
export class RegFormTenantComponent implements OnInit {
  tenant_db_data_respnse_flag: any;
  real_estate_db_data_response_flag: any;
  landlord_db_Data_response_flag: any;
  realestate_db_data_response_flag : any;
  landlord_db_data_response_flag : any;
  uploadForm : any;
  country_code = "+974";
  tenant_reg_current_form_data: any;
  otp_for_ten_Reg: any;
  blockaplhaError: boolean = false;
  blockalphabetError: boolean = false;
  blockfourError: boolean = false;
  flag: boolean = false;


  constructor(private userdata: ApiService, private router: Router, private fb: FormBuilder, public dialog: MatDialog, public ten_otp_service : TenOtpService) { }

  tenant_data : any;

 

  ngOnInit(): void {



    // this.userdata.get_real_estate_db_Data().subscribe((realestate_db_data_response : any) => {
    //   this.realestate_db_data_response_flag = realestate_db_data_response;
    //   console.log(this.realestate_db_data_response_flag);
    // })

    // this.userdata.get_local_landlord_db_Data().subscribe((landlord_db_data_response : any) => {
    //   this.landlord_db_data_response_flag = landlord_db_data_response;
    //   console.log(this.landlord_db_data_response_flag);
    // })

    this.uploadForm = this.fb.group({

      account_type : ['Tenant'],
      reg_id: ['',[Validators.required]],
      full_name: ['',[Validators.required]],
      cc : [this.country_code,[Validators.required]],
      mobile_number: ['',[Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      email: ['',[Validators.required, Validators.email]],
      pswrd: ['',[Validators.required, Validators.minLength(8)]],
      c_pswrd : ['', [Validators.required]]

    }
    , { validators: this.MustMatch('pswrd','c_pswrd')}
    )

  }

  ownership = [
    {id : '1', value : 'Yes', name :'Yes'},
  ]

  get f(){return this.uploadForm.controls}

  MustMatch(controlName : string, matchingControlName: string){
    return (formGroup: FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['MustMatch']) {
        return;
        }
        if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
        } else {
        matchingControl.setErrors(null);
        }
    }
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

    this.tenant_reg_current_form_data = this.uploadForm.value;
    // sessionStorage.setItem('ten_signup_sessionData', JSON.stringify(this.tenant_reg_current_form_data));
    // this.ten_otp_service.ten_showDialog =true;

    console.log(this.tenant_reg_current_form_data);

    this.userdata.check_post_tenant_db_Data(this.tenant_reg_current_form_data).subscribe((tenant_db_data_response : any) => {
      this.tenant_db_data_respnse_flag = tenant_db_data_response;
      this.tenant_data = this.tenant_db_data_respnse_flag;
      // console.log(this.tenant_db_data_respnse_flag);
      if(this.tenant_db_data_respnse_flag == null){
        console.log("Data does not exist in tenant DB please proceed to check data availability in real estate db");
        this.userdata.check_post_real_estate_db_Data(this.tenant_reg_current_form_data).subscribe((real_estate_db_data_response : any) => {
          // console.log(real_estate_db_data_response);
          this.real_estate_db_data_response_flag = real_estate_db_data_response;
          if(this.real_estate_db_data_response_flag == null){
            console.log("Data does not exist in real estate DB please proceed to check data availability in landlord db")
            this.userdata.check_post_landlord_db_Data(this.tenant_reg_current_form_data).subscribe((landlord_db_Data_response : any) => {
              this.landlord_db_Data_response_flag = landlord_db_Data_response;
              if(this.landlord_db_Data_response_flag == null){
                console.log("Data does not exist in in landlord DB please generate otp and proceed to post data");

                this.userdata.del_respective_temp_otp_ten(this.uploadForm.value).subscribe((result: any) => {
                  if (result == "Respective OTP Deleted") {
                    sessionStorage.setItem('ten_signup_sessionData', JSON.stringify(this.tenant_reg_current_form_data));
                    this.ten_otp_service.ten_showDialog =true;
                    this.userdata.ten_signup_otp_generate(this.tenant_reg_current_form_data).subscribe((result : any)=>{
                      this.otp_for_ten_Reg = result;
                    })
                  }
                })




                // this.userdata.post_tenant_Data(this.tenant_reg_current_form_data).subscribe((tenant_Data_response : any) => {
                //   console.log(tenant_Data_response);
                
                //    this.router.navigate(['/', 'userlogin']);
                
                // })
              }else{
                console.log("Email Address exist as Landlord");
              }
            })
          }else{
            console.log("Email Address already exist Real Estate member");
          }
        })
      }else{
        console.log("Email Address already exist as tenant");
      }

    }) 




  }

  // ownership = [
  //   {id : '1', value : 'Yes', name :'Yes'},
  // ]


  getvalue(value:any){
    console.log(value);
    if(value == 'Yes' ){
      this.flag =true;

    }
    else{
      
      this.flag = false;
      
    }
    }

    // checkValidations(){
    //   this.uploadForm = new FormGroup({
    //     'contract' : new FormControl(null,Validators.required),
    //   })
    // }

  get reg_id(){
    return this.uploadForm.get('reg_id');
  }

  get full_name(){
    return this.uploadForm.get('full_name');
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
