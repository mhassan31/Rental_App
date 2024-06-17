import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthGuardService } from 'src/app/auth-guard.service';

@Component({
  selector: 'app-dashboard-sub-properties',
  templateUrl: './dashboard-sub-properties.component.html',
  styleUrls: ['./dashboard-sub-properties.component.css']
})
export class DashboardSubPropertiesComponent implements OnInit {
  sessData: any;
  newsessData: any;
  result1: any;
  result_data: any;
  p1:any;
  Reg_Tenant_detail: any;

  constructor( private userdata: ApiService, private _httpA: HttpClient, private fb: FormBuilder,
    private router: Router, private authService: AuthGuardService) { }

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.userdata.Get_Subproperties_Data_Dashboard(this.newsessData['real_estate_id']).subscribe((result:any)=>{

      this.result_data= result

      console.log(result)

    })

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
