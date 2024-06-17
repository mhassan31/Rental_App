import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-card-save-permission-popup',
  templateUrl: './card-save-permission-popup.component.html',
  styleUrls: ['./card-save-permission-popup.component.css']
})
export class CardSavePermissionPopupComponent implements OnInit {
  payment_cred_rec: any;
  new_payment_cred_rec: any;
  display_message: any;
  uploadFormData :any;
  payment_cred_result: any;
  uploadRecFormData: any;

  constructor(private userdata: ApiService, private fb: FormBuilder, private _httpA: HttpClient, private router: Router, private dialog : MatDialog) { }

  ngOnInit(): void {

    this.payment_cred_rec = sessionStorage.getItem('Payment_cred_rec_progrss');
    this.payment_cred_result = JSON.parse(this.payment_cred_rec);

    console.log(this.payment_cred_result)


            this.uploadFormData = this.fb.group({

            Currency_Code: ['QAR'],
            merchant_id: [this.payment_cred_result[5]],
            token: [this.payment_cred_result[0]],
            Success_Url: [Environment.baseUrl+'tenant-payment-status?recurring=no&year=' + this.payment_cred_result[4] + '&month=' + this.payment_cred_result[3] + '&merchant_id=' + this.payment_cred_result[5] + '&real_estate_id=' + this.payment_cred_result[6] + '&amount=' + this.payment_cred_result[2]],
            Failure_Url: [Environment.baseUrl+'tenant-payment-status?recurring=no&year=' + this.payment_cred_result[4] + '&month=' + this.payment_cred_result[3] + '&merchant_id=' + this.payment_cred_result[5] + '&real_estate_id=' + this.payment_cred_result[6] + '&amount=' + this.payment_cred_result[2]],
            Checkout_Url: [Environment.baseUrl+'php/API_POST_Transaction_response.php?recurring=no&year=' + this.payment_cred_result[4] + '&month=' + this.payment_cred_result[3] + '&merchant_id=' + this.payment_cred_result[5] + '&real_estate_id=' + this.payment_cred_result[6] + '&amount=' + this.payment_cred_result[2]],
            Customer_Email: [''],
            Customer_Mobile: [''],
            Transaction_amount: [this.payment_cred_result[2]],
            Basket_ID: [this.payment_cred_result[1]],
            Transaction_Date: [''],
            Signature: [''],
            Item_Description: [''],
            Procode: [''],
            Recurring : ['no']
          });



          this.uploadRecFormData = this.fb.group({

            Currency_Code: ['QAR'],
            merchant_id: [this.payment_cred_result[5]],
            token: [this.payment_cred_result[0]],
            Success_Url: [Environment.baseUrl+'tenant-payment-status?recurring=yes&year=' + this.payment_cred_result[4] + '&month=' + this.payment_cred_result[3] + '&merchant_id=' + this.payment_cred_result[5] + '&real_estate_id=' + this.payment_cred_result[6] + '&amount=' + this.payment_cred_result[2]],
            Failure_Url: [Environment.baseUrl+'tenant-payment-status?recurring=yes&year=' + this.payment_cred_result[4] + '&month=' + this.payment_cred_result[3] + '&merchant_id=' + this.payment_cred_result[5] + '&real_estate_id=' + this.payment_cred_result[6] + '&amount=' + this.payment_cred_result[2]],
            Checkout_Url: [Environment.baseUrl+'php/API_POST_Transaction_response.php?recurring=yes&year=' + this.payment_cred_result[4] + '&month=' + this.payment_cred_result[3] + '&merchant_id=' + this.payment_cred_result[5] + '&real_estate_id=' + this.payment_cred_result[6] + '&amount=' + this.payment_cred_result[2]],
            Customer_Email: [''],
            Customer_Mobile: [''],
            Transaction_amount: [this.payment_cred_result[2]],
            Basket_ID: [this.payment_cred_result[1]],
            Transaction_Date: [''],
            Signature: [''],
            Item_Description: [''],
            Procode: [''],
            Recurring : ['yes']
          });
  }


  Agree(){

    const uploadData = new FormData();

    uploadData.append('Currency_Code', this.uploadRecFormData.get('Currency_Code')?.value);
    uploadData.append('merchant_id', this.uploadRecFormData.get('merchant_id')?.value);
    uploadData.append('token', this.uploadRecFormData.get('token')?.value);
    uploadData.append('Success_Url', this.uploadRecFormData.get('Success_Url')?.value);
    uploadData.append('Failure_Url', this.uploadRecFormData.get('Failure_Url')?.value);
    uploadData.append('Checkout_Url', this.uploadRecFormData.get('Checkout_Url')?.value);
    uploadData.append('Customer_Email', this.uploadRecFormData.get('Customer_Email')?.value);
    uploadData.append('Customer_Mobile', this.uploadRecFormData.get('Customer_Mobile')?.value);
    uploadData.append('Transaction_amount', this.uploadRecFormData.get('Transaction_amount')?.value);
    uploadData.append('Basket_ID', this.uploadRecFormData.get('Basket_ID')?.value);
    uploadData.append('Transaction_Date', this.uploadRecFormData.get('Transaction_Date')?.value);
    uploadData.append('Signature', this.uploadRecFormData.get('Signature')?.value);
    uploadData.append('Item_Description', this.uploadRecFormData.get('Item_Description')?.value);
    uploadData.append('Procode', this.uploadRecFormData.get('Procode')?.value);
    uploadData.append('Recurring', this.uploadRecFormData.get('Recurring')?.value);

    console.log(this.uploadRecFormData.value);

    sessionStorage.setItem('sessionData_6', JSON.stringify(this.uploadRecFormData.value));

    this.router.navigate(['/', 'tenant-payment-confirmation']);

    this.dialog.closeAll();



  }

  Disagree(){

          const uploadData = new FormData();

          uploadData.append('Currency_Code', this.uploadFormData.get('Currency_Code')?.value);
          uploadData.append('merchant_id', this.uploadFormData.get('merchant_id')?.value);
          uploadData.append('token', this.uploadFormData.get('token')?.value);
          uploadData.append('Success_Url', this.uploadFormData.get('Success_Url')?.value);
          uploadData.append('Failure_Url', this.uploadFormData.get('Failure_Url')?.value);
          uploadData.append('Checkout_Url', this.uploadFormData.get('Checkout_Url')?.value);
          uploadData.append('Customer_Email', this.uploadFormData.get('Customer_Email')?.value);
          uploadData.append('Customer_Mobile', this.uploadFormData.get('Customer_Mobile')?.value);
          uploadData.append('Transaction_amount', this.uploadFormData.get('Transaction_amount')?.value);
          uploadData.append('Basket_ID', this.uploadFormData.get('Basket_ID')?.value);
          uploadData.append('Transaction_Date', this.uploadFormData.get('Transaction_Date')?.value);
          uploadData.append('Signature', this.uploadFormData.get('Signature')?.value);
          uploadData.append('Item_Description', this.uploadFormData.get('Item_Description')?.value);
          uploadData.append('Procode', this.uploadFormData.get('Procode')?.value);
          uploadData.append('Recurring', this.uploadFormData.get('Recurring')?.value);

          console.log(this.uploadFormData.value);

          sessionStorage.setItem('sessionData_6', JSON.stringify(this.uploadFormData.value));

          this.router.navigate(['/', 'tenant-payment-confirmation']);

          this.dialog.closeAll();

  }

}
