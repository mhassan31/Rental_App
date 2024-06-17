import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-tenant-detail-dashboard',
  templateUrl: './tenant-detail-dashboard.component.html',
  styleUrls: ['./tenant-detail-dashboard.component.css']
})
export class TenantDetailDashboardComponent implements OnInit {
  sessData: any;
  newsessData: any;
  Ten_Data: any;
  newTen_Data: any;
  tenant_dasboard_Data_result: any;
  Ten_Dashboard_Data: any;
  uploadForm! : FormGroup;
  result2: any;
  p1:any;
  result1: any;

  constructor(private  userdata: ApiService, private router :Router, private route: ActivatedRoute, private fb : FormBuilder) { }

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.Ten_Data = sessionStorage.getItem('Ten_Page_Property_detail');
    this.newTen_Data  = JSON.parse(this.Ten_Data);

    // console.log(this.newTen_Data);



    this.userdata.Get_Ten_Dashboard_Data(this.newTen_Data).subscribe((response:any)=>{
      this.Ten_Dashboard_Data = response;
      console.log(this.Ten_Dashboard_Data);

      this.uploadForm = this.fb.group({
        year : ['All'],
        payment_id : [this.Ten_Dashboard_Data.payment_id]
      })

      this. onUpload();
    })


    this.userdata.Get_Ten_Cont_detail(this.newTen_Data).subscribe((result:any)=>{
      console.log(result)

      this.result1 = result;

    })



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

  onUpload(){

    const uploadData = new FormData();
    uploadData.append('year', this.uploadForm.get('year')?.value);
    uploadData.append('payment_id', this.uploadForm.get('payment_id')?.value);

      // console.log(this.uploadForm.value);

    this.userdata.get_payment_detail_Data(this.uploadForm.value).subscribe((result:any)=>{
      this.result2 = result;

      console.log(this.result2);
    })

  }

}
