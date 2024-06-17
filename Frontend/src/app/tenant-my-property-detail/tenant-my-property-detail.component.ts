import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { PaymentPaidPopupComponent } from './payment-paid-popup/payment-paid-popup.component';
import { CardSavePermissionPopupComponent } from './card-save-permission-popup/card-save-permission-popup.component';
import { RecTxnResultPopupComponent } from './rec-txn-result-popup/rec-txn-result-popup.component';
import { ProgressBarPopupComponent } from '../property-dashboard/progress-bar-popup/progress-bar-popup.component';

@Component({
  selector: 'app-tenant-my-property-detail',
  templateUrl: './tenant-my-property-detail.component.html',
  styleUrls: ['./tenant-my-property-detail.component.css']
})
export class TenantMyPropertyDetailComponent implements OnInit {
  sessData: any;
  newsessData: any;
  uploadForm: any;
  sessData2: any;
  newsessData2: any;
  property_status: any;
  payment_cred_result: any;
  uploadFormData: any;
  uploadForm_Pay_Status: any;
  payment_detail_Data_Tenant_result: any;
  p1:any;
  uploadForm_Rec! : FormGroup;
  res1: any;
  LocalDate : string = new Date().toLocaleString();
  Date: any;
  month1: any;
  res: any;

  constructor(private userdata: ApiService, private fb: FormBuilder, private _httpA: HttpClient, private router: Router, private dialog : MatDialog) 
  {

   }

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.sessData2 = sessionStorage.getItem('sessionData_2');
    this.newsessData2 = JSON.parse(this.sessData2);

    if (this.newsessData2 == null) {
      this.property_status = "Vacated";
    }
    else {
      this.property_status = "Occupied";

    }

    this.uploadForm = this.fb.group({

      year: ['', [Validators.required]],
      payment_id: [this.newsessData2 && this.newsessData2.payment_id],
      month: ['',[Validators.required]],
      rent: [this.newsessData2 && this.newsessData2.sub_property_rent],
      real_estate_id: [this.newsessData2.real_estate_id],
    
    });

    console.log(this.LocalDate)

    if(this.LocalDate[1] == '/'){

      this.month1 = this.LocalDate[0];

    }else if(this.LocalDate[1] !='/' && this.LocalDate[2]=='/'){
      this.month1 = this.LocalDate[0]+this.LocalDate[1];
    }

    this.userdata.Get_Rec_Data(this.newsessData.reg_id).subscribe((res:any)=>{

      this.res1 = res;

      this.uploadForm_Rec = this.fb.group({

        year: ['', [Validators.required]],
        payment_id: [this.newsessData2 && this.newsessData2.payment_id],
        month: ['',[Validators.required]],
        rent: [this.newsessData2 && this.newsessData2.sub_property_rent],
        real_estate_id: [this.newsessData2.real_estate_id],
        Token_ID : ['',[Validators.required]],
        Order_date : [this.LocalDate],
        Txn_Desc : ['test transaction']
        
  
      });

    })







    this.uploadForm_Pay_Status = this.fb.group({

      year_pay_status: [''],
      payment_id_pay_status: [this.newsessData2 && this.newsessData2.payment_id],
      // month_pay_status :[''],

    });

  }

  onUpload() {

    const uploadData = new FormData();

    uploadData.append('year', this.uploadForm.get('year')?.value);
    uploadData.append('month', this.uploadForm.get('month')?.value);
    uploadData.append('payment_id', this.uploadForm.get('payment_id')?.value);
    uploadData.append('rent', this.uploadForm.get('rent')?.value);
    uploadData.append('real_estate_id', this.uploadForm.get('real_estate_id')?.value);

    console.log(this.uploadForm.value);

    this.userdata.check_payment_existence(this.uploadForm.value).subscribe((result1: any) => {
      console.log(result1);
      if (result1 == null) {
        console.log("Please Proceed for the payment");
        this.dialog.open(ProgressBarPopupComponent,{width : '25%', height : '250px'})
        this.userdata.get_payment_cred(this.uploadForm.value).subscribe((result: any) => {
          this.payment_cred_result = result;

          // console.log(this.payment_cred_result)

          sessionStorage.setItem('Payment_cred_rec_progrss', JSON.stringify(this.payment_cred_result));
          this.dialog.open(CardSavePermissionPopupComponent,{width : '40%', height : '400px'})
        })

      }
      else {
        console.log("You have already Paid for this month");
        console.log(result1)
        this.dialog.open(PaymentPaidPopupComponent,{width : '20%', height : '220px'})

      }
    })

  }

  onUpload_Rec(){

    const uploadData = new FormData();

    uploadData.append('year', this.uploadForm_Rec.get('year')?.value);
    uploadData.append('month', this.uploadForm_Rec.get('month')?.value);
    uploadData.append('payment_id', this.uploadForm_Rec.get('payment_id')?.value);
    uploadData.append('rent', this.uploadForm_Rec.get('rent')?.value);
    uploadData.append('real_estate_id', this.uploadForm_Rec.get('real_estate_id')?.value);
    uploadData.append('Token_ID', this.uploadForm_Rec.get('Token_ID')?.value);
    uploadData.append('Order_date', this.uploadForm_Rec.get('Order_date')?.value);
    uploadData.append('Txn_Desc', this.uploadForm_Rec.get('Txn_Desc')?.value);

    console.log(this.uploadForm_Rec.value);


    this.userdata.check_payment_existence(this.uploadForm_Rec.value).subscribe((result1: any) => {

      if(result1==null){
        this.dialog.open(ProgressBarPopupComponent,{width : '25%', height : '250px'})
    this.userdata.Init_Rec_Payment(this.uploadForm_Rec.value).subscribe((result:any)=>{

      if(result=="Transaction Successful"){

        this.dialog.closeAll();
        this.res = "Transaction Successful"

        this.dialog.open(RecTxnResultPopupComponent,{width : '20%', height : '220px', data : {
          message : "Transaction Successful"
        }})
        
      }else{
        this.dialog.closeAll();
        this.res = "Transaction Failed"

        this.dialog.open(RecTxnResultPopupComponent,{width : '20%', height : '220px', data : {
          message : "Transaction Failed"
        }})
      }




    })

  }else{

    console.log("You have already Paid for this month");
    console.log(result1)
    this.dialog.open(PaymentPaidPopupComponent,{width : '20%', height : '220px'})

  }

  })

  }

  onUpload_Payment_status() {

    const uploadData = new FormData();

    uploadData.append('year_pay_status', this.uploadForm_Pay_Status.get('year_pay_status')?.value);
    uploadData.append('payment_id_pay_status', this.uploadForm_Pay_Status.get('payment_id_pay_status')?.value);

    console.log(this.uploadForm_Pay_Status.value);

    this.userdata.get_payment_detail_Data_Tenant(this.uploadForm_Pay_Status.value).subscribe((res: any) => {
      console.log(res);
      this.payment_detail_Data_Tenant_result = res;
    })
  }



  get year(){
    return this.uploadForm.get('year');
  }

  get month(){
    return this.uploadForm.get('month');
  }

  get Token_ID(){
    return this.uploadForm.get('Token_ID');
  }


  signout(){

    sessionStorage.removeItem('sessionData_6');
    sessionStorage.removeItem('sessionData_2');
    sessionStorage.removeItem('sessionData');

    this.router.navigate(['/','userlogin']);

  }

}
