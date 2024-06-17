import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { DataService } from '../data.service';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-tenantprofile',
  templateUrl: './tenantprofile.component.html',
  styleUrls: ['./tenantprofile.component.css']
})
export class TenantprofileComponent implements OnInit {
  propertydata: any;
  logoimage1path : any;
  imagepath : any;
  imagedirectoryPath : any = "http://localhost:8080/angular_app_Rental/php/"; 
  sessData:  any;
  newsessData: any;
  result_ten_reg_inProperty_flag: any;

  // imagedirectoryPath : any = "angular_app_Rental/php/";

  constructor(private dataService: DataService, private userdata : ApiService, private router: Router, private authService :AuthGuardService) { }

tenantresponse1 : any;


  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    // console.log(this.newsessData.tenant_ID)

    this.userdata.check_ten_reg_inProperty(this.newsessData.reg_id).subscribe((result_ten_reg_inProperty : any)=>{
      this.result_ten_reg_inProperty_flag = result_ten_reg_inProperty;
      
      if(result_ten_reg_inProperty==null)
      {
        
        alert("You are not registered tenant please contact your landlord for registration in Property");
      }
      else
      {
        console.log("stay here");
      }

    })

    

  }

  displayimage(){

    this.userdata.getpropertyData().subscribe((propertydata: any ) => {
      
      this.propertydata = propertydata

      console.log(this.propertydata['id']);
      console.log(this.propertydata['property_name']);
      {this.logoimage1path  = ((this.imagedirectoryPath),(this.propertydata['property_image']))}

      // console.log((this.imagedirectoryPath),(this.logoimage1path));

      console.log((this.imagepath) = (this.imagedirectoryPath),(this.logoimage1path));

      console.log(this.logoimage1path);

    // this.imagedirectoryPath.this.logoimage1path;
      

    })

  }


  signout(){

    sessionStorage.removeItem('sessionData_6');
    sessionStorage.removeItem('sessionData_2');
    sessionStorage.removeItem('sessionData');

    this.router.navigate(['/','userlogin']);
    this.authService.logout();

  }

}
