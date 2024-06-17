import { Component } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router'
//import {HttpClient} from '@angular/common/http';

import { ApiService } from './api.service'
import { User } from './user';
import { Observable } from 'rxjs'
import { AuthGuardService } from './auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_app';

  logoimagepath = "assets/Logo.jpg";
  sessData: any;
  newsessData: any;
  currentRoute: any = "";

  RE_Routes = ['/userprofile', '/property-details', '/re-tenant-details', '/re-profile-setting', '/re-profile-setting/re-acc-setting',
    '/re-profile-setting/re-profile-pswrd-reset', '/re-profile-setting/re-payment-settings', '/property-upload',
    '/property-upload/upload-form-compound', '/property-upload/upload-form-villa', '/property-upload/upload-form-aparment',
    '/property-upload/upload-form-office', '/property-upload/upload-form-showroom', '/property-details/compound-details',
    '/property-details/villa-details', '/property-details/apartment-details', '/property-details/office-details',
    '/property-details/showroom-details', '/re-update-property-detail', '/sub-property-detail', '/sub-property-upload',
    '/re-sub-property-update', '/property-dashboard', '/re-update-tenant-entry', '/re-ten-property-entry']

  Ten_Routes = ['/tenantprofile', '/tenant-profile-update', '/tenant-my-property', '/tenant-my-property-detail',
    '/tenant-payment-confirmation', '/tenant-payment-status']
  arr_length: any = "";
  checkRoute: any = "";
  routeStatus: any = "";
  RE_routeStatus: any = "";
  Ten_routeStatus: any = "";
  Ten_checkRoute: any = "";
  RE_checkRoute: any = "";

  constructor(private router: Router, private authService: AuthGuardService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    if ( sessionStorage.getItem('sessionData')) {
      this.authService.login();
    }

      this.router.events.subscribe((event: Event) => {

        if (event instanceof NavigationEnd) {
          this.currentRoute = (<NavigationEnd>event).url;
          this.authService.Current_Route(this.currentRoute);
        }
      })

   





  }

}
