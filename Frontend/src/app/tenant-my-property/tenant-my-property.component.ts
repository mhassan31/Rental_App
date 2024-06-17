import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tenant-my-property',
  templateUrl: './tenant-my-property.component.html',
  styleUrls: ['./tenant-my-property.component.css']
})
export class TenantMyPropertyComponent implements OnInit {
  sessData: any;
  newsessData: any;
  result_flag: any;
  property_status: any;
  result1: any;
  uploadForm: any;
  result2: any;
  real_estate_id: any;
  payment_cred_result: any;
  uploadFormData: any;
  access_token_request: any;
  payment_response: any;

  p:any;
  Reg_Tenant_detail: any;

  constructor(private userdata : ApiService, private fb: FormBuilder, private _httpA : HttpClient, private router : Router) { }

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    // console.log(this.newsessData.tenant_ID);

    //this function checking tenant availability in property if available result will be something and status will be occupied, else status will be vacated
    //this function checking data availability in property_with_tenant_db
    this.userdata.tenant_details(this.newsessData.reg_id).subscribe((result:any)=>{
      this.result1 = result;

      console.log(this.result1)

      if(this.result1==null)
      {
        this.property_status = "Vacated";
      }
      else{
        this.property_status = "Occupied";

      }

      this.uploadForm = this.fb.group({

        year : [''],
        payment_id : [this.result1 && this.result1.payment_id],
        month :[''],
        rent : [this.result1 && this.result1.sub_property_rent],
        real_estate_id : [this.newsessData.selected_realestate_landlord_id]
  
      });
  

    })

    // this.uploadForm = this.fb.group({

    //   year : [''],
    //   payment_id : [this.result1 && this.result1.payment_id]

    // });

    // this.userdata.get_subproperty_dashboard_Data(sub_property_id).subscribe((result : any) => {
    //   this.result1 = result
    //   console.log(this.result1)
  
    // sessionStorage.setItem('sessionData_3', JSON.stringify(result));

  }


  onUpload(){


    const uploadData = new FormData();

    uploadData.append('year', this.uploadForm.get('year')?.value);
    uploadData.append('month', this.uploadForm.get('month')?.value);
    uploadData.append('payment_id', this.uploadForm.get('payment_id')?.value);
    uploadData.append('rent', this.uploadForm.get('rent')?.value);
    uploadData.append('real_estate_id', this.uploadForm.get('real_estate_id')?.value);

    console.log(this.uploadForm.value);

      this.userdata.get_payment_cred(this.uploadForm.value).subscribe((result : any)=>{
      this.payment_cred_result = result;

      // console.log(this.payment_cred_result)



      

      this.uploadFormData = this.fb.group({


        Currency_Code : ['QAR'],
        merchant_id : [this.payment_cred_result[5]],
        token : [this.payment_cred_result[0]],
        Success_Url : ['http://http://localhost:4200/tenant-payment-status?year='+this.payment_cred_result[4]+'&month='+ this.payment_cred_result[3]],
        Failure_Url : ['http://http://localhost:4200/tenant-payment-status?year='+this.payment_cred_result[4]+'&month='+ this.payment_cred_result[3]],
        Checkout_Url :[Environment.baseUrl+'php/API_POST_Transaction_response.php?year='+this.payment_cred_result[4]+'&month='+ this.payment_cred_result[3]],
        Customer_Email : [''],
        Customer_Mobile : [''],
        Transaction_amount : [this.payment_cred_result[2]],
        Basket_ID : [this.payment_cred_result[1]],
        Transaction_Date : [''],
        Signature : [''],
        Item_Description : [''],
        Procode : [''],

        
        
      });

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

      console.log(this.uploadFormData.value);

      sessionStorage.setItem('sessionData_6', JSON.stringify(this.uploadFormData.value));

      this.router.navigate(['/', 'tenant-payment-confirmation']);

      // this.router.navigate(['/', 'tenant-payment-conf']);

      // this.router.navigate(['/', 'https://payments.pay2m.com/Ecommerce/api/Transaction/PostTransaction']);
      
      this.userdata.payment_gateway_redirection(this.uploadFormData.value).subscribe((response : any)=>{
        this.payment_response = response;
      })




    })

  }

  respectiveData(sub_property_id : any){

    // console.log(sub_property_id);

    this.userdata.Get_Reg_Tenant_detail(sub_property_id).subscribe((result:any)=>{
      this.Reg_Tenant_detail = result;
      console.log(this.Reg_Tenant_detail);

      sessionStorage.setItem('sessionData_2', JSON.stringify(this.Reg_Tenant_detail));
      this.router.navigate(['/','tenant-my-property-detail'])
    })

  }


  signout(){

    sessionStorage.removeItem('sessionData_6');
    sessionStorage.removeItem('sessionData_2');
    sessionStorage.removeItem('sessionData');

    this.router.navigate(['/','userlogin']);

  }

}
