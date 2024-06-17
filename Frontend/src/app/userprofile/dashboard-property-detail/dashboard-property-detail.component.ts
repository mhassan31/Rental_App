import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthGuardService } from 'src/app/auth-guard.service';

@Component({
  selector: 'app-dashboard-property-detail',
  templateUrl: './dashboard-property-detail.component.html',
  styleUrls: ['./dashboard-property-detail.component.css']
})
export class DashboardPropertyDetailComponent implements OnInit {
  sessData: any;
  newsessData: any;
  Dashboard_Data: any;
  newDashboard_Data: any;

  constructor( private userdata: ApiService, private _httpA: HttpClient, private fb: FormBuilder,
    private router: Router, private authService: AuthGuardService) { }

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.Dashboard_Data = sessionStorage.getItem('Dashboard_Data');
    this.newDashboard_Data = JSON.parse(this.Dashboard_Data);

    console.log(this.newDashboard_Data)

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


}
