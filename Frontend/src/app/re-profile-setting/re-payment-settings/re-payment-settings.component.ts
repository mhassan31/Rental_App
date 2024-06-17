import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { PayCredSetPopupComponent } from './pay-cred-set-popup/pay-cred-set-popup.component';

@Component({
  selector: 'app-re-payment-settings',
  templateUrl: './re-payment-settings.component.html',
  styleUrls: ['./re-payment-settings.component.css']
})
export class RePaymentSettingsComponent implements OnInit {

  uploadForm:any;
  sessData: any;
  newsessData: any;

  constructor(private  userdata: ApiService, private _httpA : HttpClient, private fb: FormBuilder, 
    private router : Router, private dialog : MatDialog) { }

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.uploadForm = this.fb.group({
      real_estate_id : [this.newsessData.real_estate_id],
      real_estate_name : [this.newsessData.company_name],
      Merchant_ID : ['',[Validators.required]],
      Secured_Key : ['',[Validators.required]]
    });

  }

  onUpload(){

    const uploadData = new FormData();

    uploadData.append('real_estate_id', this.uploadForm.get('real_estate_id')?.value);
    uploadData.append('real_estate_name', this.uploadForm.get('real_estate_name')?.value);
    uploadData.append('Merchant_ID', this.uploadForm.get('Merchant_ID')?.value);
    uploadData.append('Secured_Key', this.uploadForm.get('Secured_Key')?.value);
    
    console.log(this.uploadForm.value)

    

    this.userdata.set_payment_credentials(this.uploadForm.value).subscribe((result: any)=>{
      this.dialog.open(PayCredSetPopupComponent,{width : '20%', height:'225px'})
      this.ngOnInit();
    })
  }

  get Merchant_ID(){
    return this.uploadForm.get('Merchant_ID');
  }

  get Secured_Key(){
    return this.uploadForm.get('Secured_Key');
  }

}
