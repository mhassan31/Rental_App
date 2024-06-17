import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  logged_In : boolean = false;
  sessData: any
  newsessData: any;

  RE_Routes = ['/userprofile', '/property-details', '/re-tenant-details', '/re-profile-setting', '/re-profile-setting/re-acc-setting',
  '/re-profile-setting/re-profile-pswrd-reset', '/re-profile-setting/re-payment-settings', '/property-upload',
  '/property-upload/upload-form-compound', '/property-upload/upload-form-villa', '/property-upload/upload-form-aparment',
  '/property-upload/upload-form-office', '/property-upload/upload-form-showroom', '/property-details/compound-details',
  '/property-details/villa-details', '/property-details/apartment-details', '/property-details/office-details',
  '/property-details/showroom-details', '/re-update-property-detail', '/sub-property-detail', '/sub-property-upload',
  '/re-sub-property-update', '/property-dashboard', '/re-update-tenant-entry', '/re-ten-property-entry', '/tenant-payments', 
  '/tenant-detail-dashboard, /dashboard-sub-properties']

  Ten_Routes = ['/tenantprofile', '/tenant-profile-update', '/tenant-my-property', '/tenant-my-property-detail',
  '/tenant-payment-confirmation', '/tenant-payment-status']

  constructor(private router: Router) { }

  login(){
    this.logged_In = true;
    console.log("Login True")
  }

  logout(){
    this.logged_In = false;
  }

  IsAuthenticated(){
    return this.logged_In;
  }

  Current_Route(event : any){

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    if(this.newsessData && this.newsessData.account_type == "Real Estate"){

      console.log("Real Estate is Login")

      let i=0;

      while(i<=this.Ten_Routes.length-1){

        if(event == this.Ten_Routes[i]){

          this.router.navigate(['/','userprofile'])

          break;

        }

        i++;
      }

    }else if(this.newsessData && this.newsessData.account_type == "Tenant"){

      console.log("Tenant is Login")

      let j=0;
      while(j<=this.RE_Routes.length-1){
        
        if(event == this.RE_Routes[j]){

          this.router.navigate(['/','tenantprofile'])
          break;
        }

        j++;
      }

    }




  }


}
