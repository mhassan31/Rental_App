import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-re-tenant-details',
  templateUrl: './re-tenant-details.component.html',
  styleUrls: ['./re-tenant-details.component.css']
})
export class ReTenantDetailsComponent implements OnInit {
  sessData: any;
  newsessData: any;
  respective_tenants_data_flag: any;
  dasboard_Data_result: any;
  p:any;
  arr : any =[];

  constructor(private  userdata: ApiService, private router :Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    // console.log(this.newsessData.real_estate_id);

    // this.userdata.get_respective_tenants_Data(this.newsessData['real_estate_id']).subscribe((respective_tenants_data_res : any) => {
    //   this.respective_tenants_data_flag = respective_tenants_data_res;
    //   console.log(this.respective_tenants_data_flag);
    // })


    this.userdata.Get_tenant_Data(this.newsessData['real_estate_id']).subscribe((result:any)=>{
      this.dasboard_Data_result = result;
      // sessionStorage.setItem('sessionData_3', JSON.stringify(this.dasboard_Data_result));

      console.log(this.dasboard_Data_result)
    })

    


  }

  respectiveData(Subpropertyid : any, tenantqid:any){

    // console.log(Subpropertyid, tenantqid )

    this.arr.push(Subpropertyid)

    this.arr.push(tenantqid)

    // console.log(this.arr);

    sessionStorage.setItem('Ten_Page_Property_detail', JSON.stringify(this.arr));
    this.router.navigate(['/','tenant-detail-dashboard']);

  }


  signout(){

    sessionStorage.removeItem('Tab_Data');
    sessionStorage.removeItem('property_type');
    sessionStorage.removeItem('Ten_Page_Property_detail');
    sessionStorage.removeItem('sessionData_9');
    sessionStorage.removeItem('sessionData_8');
    sessionStorage.removeItem('sessionData_5');
    sessionStorage.removeItem('sessionData_4');
    sessionStorage.removeItem('sessionData_3');
    sessionStorage.removeItem('sessionData_2');
    sessionStorage.removeItem('sessionData');

    this.router.navigate(['/','userlogin']);

  }


  

}
