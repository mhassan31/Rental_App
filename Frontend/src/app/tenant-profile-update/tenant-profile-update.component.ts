import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TenProfileUpdateConfirmPopupComponent } from './ten-profile-update-confirm-popup/ten-profile-update-confirm-popup.component';



@Component({
  selector: 'app-tenant-profile-update',
  templateUrl: './tenant-profile-update.component.html',
  styleUrls: ['./tenant-profile-update.component.css']
})
export class TenantProfileUpdateComponent implements OnInit {
  sessData: any;
  newsessData: any;

  uploadForm!: FormGroup;
  Update_tenant_detail: any;
  uploadForm2!: FormGroup;
  blockaplhaError: boolean = false;
  blockalphabetError: boolean = false;
  blockfourError: boolean = false;
  country_code: any = '+974';

  constructor(private dataService: DataService, private  userdata: ApiService, private _httpA : HttpClient, private fb: FormBuilder, 
    private router : Router, private dialog : MatDialog,) {} 

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.uploadForm = this.fb.group({
      
      tenant_id : [this.newsessData.tenant_id],
      reg_id : [this.newsessData.reg_id,[Validators.required]],
      full_name : [this.newsessData.full_name,[Validators.required]],
      mobile_number : [this.newsessData.mobile_number,[Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      Email : [this.newsessData.email,[Validators.required,  Validators.email]],
      cc : [this.country_code]


    });


    this.uploadForm2 = this.fb.group({
      
      tenant_id : [this.newsessData.tenant_id],
      Password : ['', [Validators.required, Validators.minLength(8)]]

    });

  }

  onUpload(){

    const uploadData = new FormData();

    uploadData.append('tenant_id', this.uploadForm.get('tenant_id')?.value);
    uploadData.append('reg_id', this.uploadForm.get('reg_id')?.value);
    uploadData.append('full_name', this.uploadForm.get('full_name')?.value);
    uploadData.append('mobile_number', this.uploadForm.get('mobile_number')?.value);
    uploadData.append('Email', this.uploadForm.get('Email')?.value);

    console.log(this.uploadForm.value);

    this.userdata.Update_tenant_detail(this.uploadForm.value).subscribe((result:any)=>{
      this.Update_tenant_detail = result;

      this.dialog.open(TenProfileUpdateConfirmPopupComponent,{height:'200px', width:'20%', data:{
        message : "Successfully Updated"
      }}
    )
      this.signout();

    })

  }

  onUpload2(){

    const uploadData = new FormData();

    uploadData.append('tenant_id', this.uploadForm2.get('tenant_id')?.value);
    uploadData.append('Password', this.uploadForm2.get(' Password')?.value);

    console.log(this.uploadForm2.value);

    this.userdata.Update_tenant_detail2(this.uploadForm2.value).subscribe((result:any)=>{
      this.Update_tenant_detail = result;
    })

  }


  signout(){

    sessionStorage.removeItem('sessionData_6');
    sessionStorage.removeItem('sessionData_2');
    sessionStorage.removeItem('sessionData');

    this.router.navigate(['/','userlogin']);

  }

 get reg_id(){
  return this.uploadForm.get('reg_id');
 }

 get full_name(){
  return this.uploadForm.get('full_name');
 }

 get mobile_number(){
  return this.uploadForm.get('mobile_number');
 }

 get Email(){
  return this.uploadForm.get('Email');
 }


 get Password(){
  return this.uploadForm2.get('Password');
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
