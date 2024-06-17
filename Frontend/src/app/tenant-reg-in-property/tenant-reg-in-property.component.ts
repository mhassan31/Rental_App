import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tenant-reg-in-property',
  templateUrl: './tenant-reg-in-property.component.html',
  styleUrls: ['./tenant-reg-in-property.component.css']
})
export class TenantRegInPropertyComponent implements OnInit {
  sessData: any;
  newsessData: any;
  propertydataresult1: any;
  p:any;
  propertydetail1: any;
  propertydetail_lenght: any;
  propertydetail1_lenght: any;
  arrlenght: any;
  arrlength: any;

  constructor(private userdata : ApiService, private router :Router) { }

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    console.log(this.newsessData.selected_realestate_landlord_id)

    this.userdata.getrepropertyData(this.newsessData.selected_realestate_landlord_id).subscribe((propertydataresult : any) => {
      this.propertydataresult1 = propertydataresult

      console.log(this.propertydataresult1)
    })
    
  }

  respectiveData(main_property_id : any){

    // console.log(main_property_id);

    this.userdata.getsubpropertyDetail(main_property_id).subscribe((propertydetail : any) => {
      this.propertydetail1 = propertydetail;

      sessionStorage.setItem('sessionData_2', JSON.stringify(propertydetail));

      this.router.navigate(['/', 'tenant-reg-in-subproperty']);


    })

  }

}
