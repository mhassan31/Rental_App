import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthGuardService } from 'src/app/auth-guard.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-tenant-payments',
  templateUrl: './tenant-payments.component.html',
  styleUrls: ['./tenant-payments.component.css']
})
export class TenantPaymentsComponent implements OnInit {
  newsessData: any;
  sessData: any;
  Payment_Data: any;
  newPayment_Data: any;
  month = new Date().getMonth() + 1;
  response1: any;
  Reg_Tenant_detail: any;
  month1: any;

  constructor(private authService: AuthGuardService, private router: Router, private dataService: DataService, private userdata:ApiService) { }

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    // this.Payment_Data = sessionStorage.getItem('Current');
    // this.newPayment_Data = JSON.parse(this.Payment_Data);

    // console.log(this.newPayment_Data);


    this.dataService.data.subscribe((response: any) => {
      this.response1 = response
      // sessionStorage.setItem('Current_Month_Payment', JSON.stringify(response));
      // this.Payment_Data = sessionStorage.getItem('Current_Month_Payments');
      // this.newPayment_Data = JSON.parse(this.Payment_Data);
      console.log(this.response1);
    });

    this.month1 = this.month

    // console.log(this.month1);

    switch(this.month1){
      case 1:
          this.month1 = "January";
          break;
      
      case 2:
          this.month1 = "February";
          break; 

      case 3:
          this.month1 = "March";
          break; 

      case 4:
          this.month1 = "April";
          break; 

      case 5:
          this.month1 = "May";
          break; 

      case 6:
          this.month1 = "June";
          break; 

      case 7:
          this.month1 = "July";
          break; 

      case 8:
          this.month1 = "August";
          break; 

      case 9:
          this.month1 = "September";
          break; 

      case 10:
          this.month1 = "October";
          break; 

      case 11:
          this.month1 = "November";
          break; 

      case 12:
          this.month1 = "December";
          break; 
    }


  }

  signout() {

    sessionStorage.removeItem('Tab_Data');
    sessionStorage.removeItem('property_type');
    sessionStorage.removeItem('sessionData_9');
    sessionStorage.removeItem('sessionData_8');
    sessionStorage.removeItem('sessionData_5');
    sessionStorage.removeItem('sessionData_4');
    sessionStorage.removeItem('sessionData_3');
    sessionStorage.removeItem('sessionData_2');
    sessionStorage.removeItem('sessionData');

    this.authService.logout();

    this.router.navigate(['/', 'userlogin']);

  }

  respectiveData(sub_property_id:any){

    this.userdata.Get_Reg_Tenant_detail(sub_property_id).subscribe((result:any)=>{
      this.Reg_Tenant_detail = result;
      console.log(this.Reg_Tenant_detail);

      sessionStorage.setItem('sessionData_3', JSON.stringify(this.Reg_Tenant_detail));
      this.router.navigate(['/','property-dashboard'])
    })

  }

}
