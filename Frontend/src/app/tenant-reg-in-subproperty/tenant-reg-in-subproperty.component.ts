import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tenant-reg-in-subproperty',
  templateUrl: './tenant-reg-in-subproperty.component.html',
  styleUrls: ['./tenant-reg-in-subproperty.component.css']
})
export class TenantRegInSubpropertyComponent implements OnInit {
  sessData: any;
  newsessData: any;
  sessData2: any;
  newsessData2: any;
  p:any;
  result1: any;
  uploadForm: any;
  tenant_reg_in_property_result_flag: any;
  objlength: any;
  Property_status: any;
  property_status: any;
  subproperty_detail_for_form_result: any;

  constructor(private userdata : ApiService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.sessData2 = sessionStorage.getItem('sessionData_2');
    this.newsessData2 = JSON.parse(this.sessData2);

    console.log(this.newsessData2);

    // this.objlength = this.newsessData2.length;

    // console.log(this.objlength);

  }

  respectiveData(sub_property_id : any){


    // console.log(sub_property_id)

    this.userdata.get_subproperty_dashboard_Data(sub_property_id).subscribe((result : any) => {
      this.result1 = result
      console.log(this.result1)

      sessionStorage.setItem('sessionData_3', JSON.stringify(result));

      this.userdata.get_subproperty_detail_for_form(sub_property_id).subscribe((result: any)=>{

        this.subproperty_detail_for_form_result = result;

        console.log(this.subproperty_detail_for_form_result)

        sessionStorage.setItem('sessionData_4', JSON.stringify(this.subproperty_detail_for_form_result));
      
        this.router.navigate(['/','tenant-property-reg-form'])
      })


      
  })

      // sessionStorage.setItem('sessionData_3', JSON.stringify(sub_property_id));
      // this.router.navigate(['/','tenant-property-reg-form'])

    

  // const uploadData = new FormData();

  // // uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

  // uploadData.append('myFile', this.uploadForm.get('profile')?.value);
  // uploadData.append('property_name', this.uploadForm.get('property_name')?.value);
  // uploadData.append('landlord_id', this.uploadForm.get('landlord_id')?.value);
  // uploadData.append('real_estate_name', this.uploadForm.get('real_estate_name')?.value);
  // uploadData.append('main_property_id', this.uploadForm.get('main_property_id')?.value);
  // uploadData.append('main_property_name', this.uploadForm.get('main_property_name')?.value);
  // uploadData.append('sub_property_id', this.uploadForm.get('sub_property_id')?.value);
  // uploadData.append('sub_property_name', this.uploadForm.get('sub_property_name')?.value);
  // uploadData.append('sub_property_legal_id', this.uploadForm.get('sub_property_legal_id')?.value);
  // uploadData.append('tenant_id', this.uploadForm.get('tenant_id')?.value);
  // uploadData.append('tenant_QID', this.uploadForm.get('tenant_QID')?.value);
  // uploadData.append('tenant_name', this.uploadForm.get('tenant_name')?.value);


  // console.log(this.uploadForm.value);

  // this.userdata.tenant_reg_in_property(this.uploadForm.value).subscribe((tenant_reg_in_property_result : any)=>{
  //   this.tenant_reg_in_property_result_flag = tenant_reg_in_property_result;
  // })



 

}

}
