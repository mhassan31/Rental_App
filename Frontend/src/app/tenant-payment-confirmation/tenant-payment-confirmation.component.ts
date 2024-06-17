import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tenant-payment-confirmation',
  templateUrl: './tenant-payment-confirmation.component.html',
  styleUrls: ['./tenant-payment-confirmation.component.css']
})
export class TenantPaymentConfirmationComponent implements OnInit {
  sessData6: any;
  newsessData6: any;
  sessData: any;
  newsessData: any;

  url ="https://payments.pay2m.com/Ecommerce/api/Transaction/PostTransaction";

  constructor(private fb: FormBuilder) { }

  uploadForm: any;

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.sessData6 = sessionStorage.getItem('sessionData_6');
    this.newsessData6 = JSON.parse(this.sessData6);

    console.log(this.newsessData6);
  }

  onUpload(){

  alert('Redirection');

  }

}
