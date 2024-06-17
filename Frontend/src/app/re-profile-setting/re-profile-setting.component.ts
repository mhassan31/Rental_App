import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { HttpClient, HttpEvent } from '@angular/common/http';

import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultProfileDisplayService } from './default-profile-display.service';

@Component({
  selector: 'app-re-profile-setting',
  templateUrl: './re-profile-setting.component.html',
  styleUrls: ['./re-profile-setting.component.css']
})
export class ReProfileSettingComponent implements OnInit {
  sessData: any;
  newsessData: any;

  checkpropertyid: any;
  checklandlordid: any;
  result1: any;
  note: any;
  dbdata: any;
  update_real_estate_detail_result: any;
  acc_detail : boolean = false;
  default_component: boolean = true;

  constructor(private dataService: DataService, private  userdata: ApiService, private _httpA : HttpClient, private fb: FormBuilder, 
   private router : Router, public default_display : DefaultProfileDisplayService, private route : ActivatedRoute) { }

  form!: FormGroup;

  response1 : any;
  formdata : any;

  uploadForm!: FormGroup;

  propertydataresult1 : any;

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    // this.default_display.default_display = true;

    // this.default_component = true;

    
    
    this.uploadForm = this.fb.group({
    
      landlord_id : [this.newsessData.real_estate_id],
      real_estate_name : [this.newsessData.company_name],
      reg_id : [this.newsessData.reg_id],
      full_name : [this.newsessData.first_name],
      // last_name :[this.newsessData.last_name],
      mobile_number : [this.newsessData.mobile_number],
      email : [this.newsessData.email],
      pswrd : ['']

    });

    this.general_setting();


  }

  onUpload(){

    const uploadData = new FormData();

    uploadData.append('landlord_id', this.uploadForm.get('landlord_id')?.value);
    uploadData.append('real_estate_name', this.uploadForm.get('real_estate_name')?.value);
    uploadData.append('reg_id', this.uploadForm.get('reg_id')?.value);
    uploadData.append('full_name', this.uploadForm.get('full_name')?.value);
    uploadData.append('mobile_number', this.uploadForm.get('mobile_number')?.value);
    uploadData.append('email', this.uploadForm.get('email')?.value);
    uploadData.append('pswrd', this.uploadForm.get('pswrd')?.value);

    console.log(this.uploadForm.value);

    

    this.userdata.update_real_estate_detail(this.uploadForm.value).subscribe((result : any)=>{
      this.update_real_estate_detail_result = result;
    })

    alert("Data Updated Successfully Please Sign Out and Sign In again to see the updated details");
    this.router.navigate(['/','userprofile']);



  }

  general_setting(){
    this.router.navigate(['re-acc-setting'], {relativeTo: this.route});
  }

  password_reset(){
    this.router.navigate(['re-profile-pswrd-reset'], {relativeTo: this.route});
  }

  payment_setting(){
    this.router.navigate(['re-payment-settings'], {relativeTo: this.route});
  }

  signout(){

    sessionStorage.removeItem('Tab_Data');
    sessionStorage.removeItem('property_type');
    sessionStorage.removeItem('sessionData_9');
    sessionStorage.removeItem('sessionData_8');
    sessionStorage.removeItem('sessionData_5');
    sessionStorage.removeItem('sessionData_4');
    sessionStorage.removeItem('sessionData_3');
    sessionStorage.removeItem('sessionData_2');
    sessionStorage.removeItem('sessionData');

    this.router.navigate(['/','userlogin']);

  }
}
