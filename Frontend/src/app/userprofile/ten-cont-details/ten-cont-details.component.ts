import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthGuardService } from 'src/app/auth-guard.service';

@Component({
  selector: 'app-ten-cont-details',
  templateUrl: './ten-cont-details.component.html',
  styleUrls: ['./ten-cont-details.component.css']
})
export class TenContDetailsComponent implements OnInit {
  sessData: any;
  newsessData: any;
  Ten_Contract_Data: any;
  Ten_Contract_newData: any;

  constructor( private userdata: ApiService, private _httpA: HttpClient, private fb: FormBuilder,
    private router: Router, private authService: AuthGuardService) { }

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);


    this.Ten_Contract_Data = sessionStorage.getItem('Ten_Contract_Detail');
    this.Ten_Contract_newData = JSON.parse(this.Ten_Contract_Data);

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
