import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tenant-property-reg-form',
  templateUrl: './tenant-property-reg-form.component.html',
  styleUrls: ['./tenant-property-reg-form.component.css']
})
export class TenantPropertyRegFormComponent implements OnInit {


  sessData: any;
  newsessData: any;
  sessData2: any;
  newsessData2: any;
  uploadForm: any;
  tenant_reg_in_property_result_flag: any;
  sessData3: any;
  newsessData3: any;
  property_status: any;
  result1: any;
  sessData4: any;
  newsessData4: any;
  ten_status_result: any;

  constructor(private fb: FormBuilder, private userdata : ApiService, private router: Router) { }

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.sessData2 = sessionStorage.getItem('sessionData_2');
    this.newsessData2 = JSON.parse(this.sessData2);

    this.sessData3 = sessionStorage.getItem('sessionData_3');
    this.newsessData3 = JSON.parse(this.sessData3);

    this.sessData4 = sessionStorage.getItem('sessionData_4');
    this.newsessData4 = JSON.parse(this.sessData4);

    console.log(this.newsessData3)

    if(this.newsessData3==null)
    {
      this.property_status = "Vacated";
    }
    else
    {
      this.property_status = "Occupied";
    }

    this.uploadForm = this.fb.group({

      landlord_id : [this.newsessData4.landlord_id],
      real_estate_name : [this.newsessData4.real_estate_landlord_name],
      main_property_id : [this.newsessData4.main_property_id],
      main_property_name : [this.newsessData4.main_property_name],
      main_property_legal_id : [this.newsessData4.main_property_legal_id],
      sub_property_id : [this.newsessData4.sub_property_id],
      sub_property_name : [this.newsessData4.sub_property_name],
      sub_property_legal_id : [this.newsessData4.sub_property_legal_id],
      sub_property_rent : [this.newsessData4.sub_property_rent],
      tenant_id : [this.newsessData.tenant_ID],
      tenant_QID : [this.newsessData.reg_id],
      tenant_name : [this.newsessData['first_name']+this.newsessData['last_name']]
    });

  }

  onFileChanged(event : any) {
  
    // this.selectedFile = event.target.files[0];
    // const file = event.target.files[0];

    // this.uploadForm.get('profile')?.setValue(file)

    // console.log(file);
    
    // console.log(this.selectedFile);

  }

  onUpload(){

    const uploadData = new FormData();

    uploadData.append('landlord_id', this.uploadForm.get('landlord_id')?.value);
    uploadData.append('real_estate_name', this.uploadForm.get('real_estate_name')?.value);
    uploadData.append('main_property_id', this.uploadForm.get('main_property_id')?.value);
    uploadData.append('main_property_name', this.uploadForm.get('main_property_name')?.value);
    uploadData.append('main_property_legal_id', this.uploadForm.get('main_property_legal_id')?.value);
    uploadData.append('sub_property_id', this.uploadForm.get('sub_property_id')?.value);
    uploadData.append('sub_property_name', this.uploadForm.get('sub_property_name')?.value);
    uploadData.append('sub_property_legal_id', this.uploadForm.get('sub_property_legal_id')?.value);
    uploadData.append('sub_property_rent', this.uploadForm.get('sub_property_rent')?.value);
    uploadData.append('tenant_id', this.uploadForm.get('tenant_id')?.value);
    uploadData.append('tenant_QID', this.uploadForm.get('tenant_QID')?.value);
    uploadData.append('tenant_name', this.uploadForm.get('tenant_name')?.value);

    console.log(this.uploadForm.value);



    if(this.property_status == "Vacated"){

      this.userdata.check_ten_status(this.newsessData.tenant_ID).subscribe((result:any)=>{
        this.ten_status_result=result;
        if(result==null){

          this.userdata.tenant_reg_in_property(this.uploadForm.value).subscribe((tenant_reg_in_property_result : any)=>{
            this.tenant_reg_in_property_result_flag = tenant_reg_in_property_result;
      
            this.router.navigate(['/','tenant-reg-in-property']);
      
            alert("Succcessfully Registered");
          })

        }else{

          alert("You have already a Registered Tenant please check My Property section");
          
        }
      })
      


    }
    else
    {
      alert("This property Occupied");
    }






  
  }

}
