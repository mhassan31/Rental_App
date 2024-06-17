import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { PaymentStatusPopupComponent } from './payment-status-popup/payment-status-popup.component';
import { ProgressBarPopupComponent } from './progress-bar-popup/progress-bar-popup.component';
import { PropertyOccupiedPopupComponent } from './property-occupied-popup/property-occupied-popup.component';

@Component({
  selector: 'app-property-dashboard',
  templateUrl: './property-dashboard.component.html',
  styleUrls: ['./property-dashboard.component.css']
})
export class PropertyDashboardComponent implements OnInit {
  sessData: any;
  newsessData: any;
  sessData1: any;
  newsessData1: any;
  result1: any;
  property_status: any;
  result2: any;
  payid: any;
  
  Date1 : Date = new Date();
  LocalDate : string = new Date().toLocaleString();
  // LocalDate : string = '11/8/2023'
  year2 = new Date().getFullYear();
  month2 = new Date().getMonth();
  month: any;
  year: any;
  year1: any;
  month1: any;
  unreg_tenant_dasboard_Data_result: any;
  payment_id: any;
  Date2 = new Date().getDate();
  // date2 = 16;
  flag: boolean = false;
  response_data: any;
  uploadForm_Rec!: FormGroup;
  p1:any;
  month_No: any;
  flag1: boolean = false;
  flag2: boolean =  false;
  
  

  constructor(private dataService: DataService, private  userdata: ApiService, private _httpA : HttpClient, private fb: FormBuilder, 
    private router:Router, private dialog : MatDialog) {}

   uploadForm!: FormGroup;
   uploadForm_Rent_Reminder! : FormGroup;
   uploadForm_EndContract! : FormGroup;


  ngOnInit(): void {
    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.sessData1 = sessionStorage.getItem('sessionData_3');
    this.newsessData1 = JSON.parse(this.sessData1);

    // console.log(this.newsessData1);


    this.userdata.RE_Get_Rec_Data(this.newsessData1).subscribe((response:any)=>{
      this.response_data = response;

      // console.log(this.response_data);

      this.uploadForm_Rec = this.fb.group({

        rec_year: ['', [Validators.required]],
        payment_id: [this.newsessData1 && this.newsessData1.payment_id],
        rec_month: ['',[Validators.required]],
        rent: [this.newsessData1 && this.newsessData1.sub_property_rent],
        real_estate_id: [this.newsessData1 && this.newsessData1.real_estate_id],
        Token_ID : ['',[Validators.required]],
        Order_date : [this.LocalDate],
        Txn_Desc : ['test transaction']
      });

    })

    this.unreg_tenant_dasboard_Data_result = this.newsessData1;

    if(this.unreg_tenant_dasboard_Data_result == null)
    {
      this.property_status = "Vacant";
    }
    else
    {
      this.property_status = "Occupied";
    }


    this.uploadForm = this.fb.group({
      year : [''],
      payment_id : [this.unreg_tenant_dasboard_Data_result.payment_id]

    })


    this.uploadForm_EndContract = this.fb.group({
      Tenant_QID : [this.unreg_tenant_dasboard_Data_result.tenant_QID],
      payment_id : [this.unreg_tenant_dasboard_Data_result.payment_id],
      sub_property_id : [this.unreg_tenant_dasboard_Data_result.sub_property_id],

    })



    // this.month1 = this.LocalDate[0];
    this.year1 = this.LocalDate[4]+this.LocalDate[5]+this.LocalDate[6]+this.LocalDate[7];

    if(this.LocalDate[1] == '/'){

      this.month1 = this.LocalDate[0];
      this.month_No = this.month1;

    }else if(this.LocalDate[1] !='/' && this.LocalDate[2]=='/'){
      this.month1 = this.LocalDate[0]+this.LocalDate[1];
      this.month_No = this.month1;
      
    }

    // console.log(this.month1);

    // console.log(this.Date2);
    // console.log(this.unreg_tenant_dasboard_Data_result.tenant_rent_date);


    if(this.Date2 < this.unreg_tenant_dasboard_Data_result.tenant_rent_date){
      this.flag = true;
      // console.log('flag is true');
    }else{
      this.flag = false;
    }
  


    switch(this.month1){
      case '1':
          this.month1 = "January";
          break;
      
      case '2':
          this.month1 = "February";
          break; 

      case '3':
          this.month1 = "March";
          break; 

      case '4':
          this.month1 = "April";
          break; 

      case '5':
          this.month1 = "May";
          break; 

      case '6':
          this.month1 = "June";
          break; 

      case '7':
          this.month1 = "July";
          break; 

      case '8':
          this.month1 = "August";
          break; 

      case '9':
          this.month1 = "September";
          break; 

      case '10':
          this.month1 = "October";
          break; 

      case '11':
          this.month1 = "November";
          break; 

      case '12':
          this.month1 = "December";
          break; 
    }
  }

  



  onUpload(){

    const uploadData = new FormData();
    uploadData.append('year', this.uploadForm.get('year')?.value);
    uploadData.append('payment_id', this.uploadForm.get('payment_id')?.value);

      // console.log(this.uploadForm.value);

    this.userdata.get_payment_detail_Data(this.uploadForm.value).subscribe((result:any)=>{
      this.result2 = result;

      console.log(this.result2);
    })

  }

  Uploadtenant(){

    if(this.property_status == "Occupied"){
      this.dialog.open(PropertyOccupiedPopupComponent,{width : '20%', height : '220px'})
    }else{

    this.router.navigate(['/', 're-ten-property-entry']);
    }
  }

  Updatetenant(){

    this.router.navigate(['/', 're-update-tenant-entry'])
    
  }

  Rent_Reminder(){

    this.uploadForm_Rent_Reminder = this.fb.group({

      year : [this.year2],
      month : [this.month1],
      payment_id : [this.unreg_tenant_dasboard_Data_result.payment_id],
      rent1 : [this.unreg_tenant_dasboard_Data_result.sub_property_rent],
      email : [this.unreg_tenant_dasboard_Data_result.tenant_email],
      mobile : [this.unreg_tenant_dasboard_Data_result.tenant_mobile_number],
      real_estate_id : [this.unreg_tenant_dasboard_Data_result.real_estate_id]
    });

    const uploadData = new FormData();
    uploadData.append('year', this.uploadForm_Rent_Reminder.get('year')?.value);
    uploadData.append('payment_id', this.uploadForm_Rent_Reminder.get('payment_id')?.value);
    uploadData.append('month', this.uploadForm_Rent_Reminder.get('month')?.value);
    uploadData.append('rent1', this.uploadForm_Rent_Reminder.get('rent1')?.value);
    uploadData.append('email', this.uploadForm_Rent_Reminder.get('email')?.value);
    uploadData.append('mobile', this.uploadForm_Rent_Reminder.get('mobile')?.value);
    uploadData.append('real_estate_id', this.uploadForm_Rent_Reminder.get('real_estate_id')?.value);


    console.log(this.uploadForm_Rent_Reminder.value)

    this.userdata.Rent_Reminder(this.uploadForm_Rent_Reminder.value).subscribe((result:any)=>{
      console.log(result);
    })

  }

  onUpload_Rec(){

    const uploadData = new FormData();
    uploadData.append('rec_year', this.uploadForm_Rec.get('rec_year')?.value);
    uploadData.append('payment_id', this.uploadForm_Rec.get('payment_id')?.value);
    uploadData.append('rec_month', this.uploadForm_Rec.get('rec_month')?.value);
    uploadData.append('rent', this.uploadForm_Rec.get('rent')?.value);
    uploadData.append('real_estate_id', this.uploadForm_Rec.get('real_estate_id')?.value);
    uploadData.append('Token_ID', this.uploadForm_Rec.get('Token_ID')?.value);
    uploadData.append('Order_date', this.uploadForm_Rec.get('Order_date')?.value);
    uploadData.append('Txn_Desc', this.uploadForm_Rec.get('Txn_Desc')?.value);

    console.log(this.uploadForm_Rec.value)

    this.userdata.check_payment_existence_RE_Rec(this.uploadForm_Rec.value).subscribe((result: any) => {

      

      if(result==null){

      this.dialog.open(ProgressBarPopupComponent,{width : '25%', height : '250px'})
      this.userdata.RE_Init_Rec_Payment(this.uploadForm_Rec.value).subscribe((response:any)=>{

        

        if(response =="Transaction Successful"){

          this.dialog.closeAll();
          
  
          this.dialog.open(PaymentStatusPopupComponent,{width : '20%', height : '220px', data : {
            message : "Transaction Successful"
          }})
  
        }else{
          this.dialog.closeAll();
  
          this.dialog.open(PaymentStatusPopupComponent,{width : '20%', height : '220px', data : {
            message : "Transaction Failed"
          }})
        }
    


    });

  }else{
    console.log("You have already Paid for this month");
    this.dialog.open(PaymentStatusPopupComponent, {width : '20%', height : '220px', data : {
      message : "You have already Paid for this month"
    }})
  }


    })
    
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

  EndContract(){

    const uploadData = new FormData();
    uploadData.append('year', this.uploadForm_EndContract.get('year')?.value);
    uploadData.append('payment_id', this.uploadForm_EndContract.get('payment_id')?.value);
    uploadData.append('sub_property_id', this.uploadForm_EndContract.get('sub_property_id')?.value);

    console.log(this.uploadForm_EndContract.value);

    this.userdata.Tenant_End_Contract(this.uploadForm_EndContract.value).subscribe((response:any)=>{

    })
    
  }

  getMonthValue(month_event : any){

    var month_value = month_event.target.value;

    console.log(month_value);

    switch(month_value){
      case 'January':
        month_value= "1";
          break;
      
      case 'February':
        month_value = "2";
          break; 

      case 'March':
        month_value = "3";
          break; 

      case 'April':
        month_value = "4";
          break; 

      case 'May':
        month_value = "5";
          break; 

      case 'June':
        month_value = "6";
          break; 

      case 'July':
        month_value = "7";
          break; 

      case 'August':
        month_value = "8";
          break; 

      case 'September':
        month_value = "9";
          break; 

      case 'October':
        month_value = "10";
          break; 

      case 'November':
        month_value = "11";
          break; 

      case 'December':
        month_value = "12";
          break; 
    }

    console.log(month_value);

    console.log(this.month_No);

    if(month_value<this.month_No){

      this.flag1 = false;
      // console.log("Case 1 flag1 ="+this.flag1)

    }else if(month_value==this.month_No && this.Date2 >= this.unreg_tenant_dasboard_Data_result.tenant_rent_date){

      this.flag1 = false;
      // console.log("Case 2 flag1 ="+this.flag1)

    }else{

      this.flag1 = true;
      // console.log("Cases flag1 ="+this.flag1)

    }
    

  }

  getYearValue(year_event:any){

    var year_value = year_event.target.value;

    console.log(year_value);

    console.log(this.year2);

    if(year_value==this.year2){

      this.flag2 = false;

    }else{

      this.flag2 = true;

    }

  }

  Cont_Renewel(){

    console.log(this.newsessData1);

    sessionStorage.setItem('Cont_Renewel_Data',JSON.stringify(this.newsessData1));

    this.router.navigate(['/','cont-renewel-form']);

    

  }


  get rec_year(){
    return this.uploadForm.get('rec_year');
  }

  get rec_month(){
    return this.uploadForm.get('rec_month');
  }

  get Token_ID(){
    return this.uploadForm.get('Token_ID');
  }

}
