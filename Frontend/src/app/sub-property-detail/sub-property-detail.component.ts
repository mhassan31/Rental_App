import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { SubPropDelPopupComponent } from './sub-prop-del-popup/sub-prop-del-popup.component';

@Component({
  selector: 'app-sub-property-detail',
  templateUrl: './sub-property-detail.component.html',
  styleUrls: ['./sub-property-detail.component.css']
})
export class SubPropertyDetailComponent implements OnInit {
  sessData: any;
  newsessData: any;
  response1: any;
  main_property_id: any;
  propertydetail1: any;
  p:any;
  sessData1: any;
  newsessData1: any;
  result1: any;
  Get_sub_property_detail_result: any;
  del_sub_property: any;
  unreg_tenant_dasboard_Data_result: any;
  sessData4: any;
  newsessData4: any;

  constructor(private dataService: DataService, private  userdata: ApiService, private _httpA : HttpClient, private fb: FormBuilder, 
    private router :Router, private dialog : MatDialog) {


  
  }


  ngOnInit(): void {
    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.sessData1 = sessionStorage.getItem('sessionData_2');
    this.newsessData1 = JSON.parse(this.sessData1);

    this.sessData4 = sessionStorage.getItem('sessionData_4');
    this.newsessData4 = JSON.parse(this.sessData4);


    console.log(this.newsessData4);

  
    this.userdata.getsubpropertyDetail(this.newsessData1).subscribe((propertydetail : any) => {
    this.propertydetail1 = propertydetail
    console.log(this.propertydetail1)
  })


  // this.userdata.get_main_property_detail(this.newsessData1).subscribe((propertydetail : any) => {
  //   this.propertydetail1 = propertydetail
  //   console.log(this.propertydetail1)
  // })

}

searchText:string='';

respectiveData(sub_property_id : any){



  this.userdata.Get_Sub_Property_detail_for_Session(sub_property_id).subscribe((Get_Sub_Property_detail_for_Session_result:any)=>{
 
    sessionStorage.setItem('sessionData_5', JSON.stringify(Get_Sub_Property_detail_for_Session_result));

    // sessionStorage.setItem('sessionData_3', JSON.stringify(sub_property_id));
    // this.router.navigate(['/', 'property-dashboard']);



    this.userdata.Get_unreg_tenant_dasboard_Data(sub_property_id).subscribe((result:any)=>{
      this.unreg_tenant_dasboard_Data_result = result;
      // console.log(this.unreg_tenant_dasboard_Data_result);
      sessionStorage.setItem('sessionData_3', JSON.stringify(this.unreg_tenant_dasboard_Data_result));

      this.router.navigate(['/', 'property-dashboard']);
    })


})



}

Update_sub_property_details(sub_property_id : any){

  this.userdata.Get_sub_property_detail(sub_property_id).subscribe((result : any)=>{
    this.Get_sub_property_detail_result = result;
    // console.log(this.Get_sub_property_detail_result);

    sessionStorage.setItem('sessionData_9', JSON.stringify(this.Get_sub_property_detail_result));

    this.router.navigate(['/', 're-sub-property-update']);

  })

}

Delete_sub_property(sub_property_id : any){

 const popup = this.dialog.open(SubPropDelPopupComponent,{width : '20%', height : '225px'})

 popup.afterClosed().subscribe((item:any)=>{
  if(item == "Delete Confirm"){
  this.userdata.del_sub_property(sub_property_id).subscribe((result : any)=>{
    this.del_sub_property = result;
    this.router.navigate(['/', 'property-details']);
  })
  }else{
    console.log("Cancel Delete")
  }
 })

  // this.userdata.del_sub_property(sub_property_id).subscribe((result : any)=>{
  //   this.del_sub_property = result;
  // })

}

pass_main_property_id(){}

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

}
