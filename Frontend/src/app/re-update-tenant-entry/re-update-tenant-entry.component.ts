import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from 'src/environments/environment.prod';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { UpdateTenEntryPopupComponent } from './update-ten-entry-popup/update-ten-entry-popup.component';


@Component({
  selector: 'app-re-update-tenant-entry',
  templateUrl: './re-update-tenant-entry.component.html',
  styleUrls: ['./re-update-tenant-entry.component.css']
})
export class ReUpdateTenantEntryComponent implements OnInit {

  sessData: any;
  newsessData: any;

  sessData2: any;
  newsessData2: any;
  uploadForm: any;
  upload_Con_Form: any;
  tenant_reg_in_property_result_flag: any;
  sessData3: any;
  newsessData3: any;
  property_status: any;
  result1: any;
  sessData4: any;
  newsessData4: any;
  ten_status_result: any;
  sessData5: any;
  newsessData5: any;
  re_tenant_entry_result: any;
  Update_re_ten_detail: any;


  constructor(private dataService: DataService, private  userdata: ApiService, private _httpA : HttpClient, 
    private fb: FormBuilder, private router : Router, private dialog : MatDialog, private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.sessData2 = sessionStorage.getItem('sessionData_2');
    this.newsessData2 = JSON.parse(this.sessData2);

    this.sessData3 = sessionStorage.getItem('sessionData_3');
    this.newsessData3 = JSON.parse(this.sessData3);

    this.sessData4 = sessionStorage.getItem('sessionData_4');
    this.newsessData4 = JSON.parse(this.sessData4);

    this.sessData5 = sessionStorage.getItem('sessionData_5');
    this.newsessData5 = JSON.parse(this.sessData5);

    this.uploadForm = this.fb.group({

      landlord_id : [this.newsessData5.landlord_id],
      real_estate_name : [this.newsessData5.real_estate_landlord_name],
      main_property_id : [this.newsessData5.main_property_id],
      main_property_name : [this.newsessData5.main_property_name],
      main_property_legal_id : [this.newsessData5.main_property_legal_id],
      building_no : [this.newsessData5.mainproperty_building_no],
      street_no : [this.newsessData5.mainproperty_street_no],
      zone_no : [this.newsessData5.mainproperty_zone_no],
      sub_property_id : [this.newsessData5.sub_property_id],
      sub_property_name : [this.newsessData5.sub_property_name],
      sub_property_legal_id : [this.newsessData5.sub_property_legal_id],
      sub_property_rent : [this.newsessData5.sub_property_rent],
      tenant_QID : [this.newsessData3.tenant_QID],
      tenant_name : [this.newsessData3.tenant_name, [Validators.required]],
      tenant_email : [this.newsessData3.tenant_email, [Validators.required, Validators.email]],
      tenant_mobile : [this.newsessData3.tenant_mobile_number, [Validators.required]]
    });


    this.upload_Con_Form = this.fb.group({

      landlord_id : [this.newsessData5.landlord_id],
      real_estate_name : [this.newsessData5.real_estate_landlord_name],
      main_property_id : [this.newsessData5.main_property_id],
      main_property_name : [this.newsessData5.main_property_name],
      main_property_legal_id : [this.newsessData5.main_property_legal_id],
      building_no : [this.newsessData5.mainproperty_building_no],
      street_no : [this.newsessData5.mainproperty_street_no],
      zone_no : [this.newsessData5.mainproperty_zone_no],
      sub_property_id : [this.newsessData5.sub_property_id],
      sub_property_name : [this.newsessData5.sub_property_name],
      sub_property_legal_id : [this.newsessData5.sub_property_legal_id],
      sub_property_rent : [this.newsessData5.sub_property_rent],
      tenant_QID : [this.newsessData3.tenant_QID],
      contract_no : [this.newsessData3.con_ref, [Validators.required]],
      start_date : [this.newsessData3.startdate, [Validators.required]],
      end_date : [this.newsessData3.end_date, [Validators.required]],
      Rent_due_date : [this.newsessData3.tenant_rent_date, [Validators.required]],
      contract : ['', [Validators.required]],
      Renewel_No : [this.newsessData3.cont_renewel_no]
    });

  }

  onUpload(){

    const uploadData = new FormData();

    uploadData.append('landlord_id', this.uploadForm.get('landlord_id')?.value);
    uploadData.append('real_estate_name', this.uploadForm.get('real_estate_name')?.value);
    uploadData.append('main_property_id', this.uploadForm.get('main_property_id')?.value);
    uploadData.append('main_property_name', this.uploadForm.get('main_property_name')?.value);
    uploadData.append('main_property_legal_id', this.uploadForm.get('main_property_legal_id')?.value);
    uploadData.append('building_no', this.uploadForm.get('building_no')?.value);
    uploadData.append('street_no', this.uploadForm.get('street_no')?.value);
    uploadData.append('zone_no', this.uploadForm.get('zone_no')?.value);
    uploadData.append('sub_property_id', this.uploadForm.get('sub_property_id')?.value);
    uploadData.append('sub_property_name', this.uploadForm.get('sub_property_name')?.value);
    uploadData.append('sub_property_legal_id', this.uploadForm.get('sub_property_legal_id')?.value);
    uploadData.append('sub_property_rent', this.uploadForm.get('sub_property_rent')?.value);
    uploadData.append('tenant_QID', this.uploadForm.get('tenant_QID')?.value);
    uploadData.append('tenant_name', this.uploadForm.get('tenant_name')?.value);

    console.log(this.uploadForm.value);

    this.userdata.Update_re_ten_detail(this.uploadForm.value).subscribe((result:any)=>{
      this.Update_re_ten_detail = result;
      this.dialog.open(UpdateTenEntryPopupComponent,{width : '20%', height : '300px'});
    })


  }

  onFileChanged(event:any){

    const file = event.target.files[0];
    this.upload_Con_Form.get('contract')?.setValue(file)
    console.log(file);

    

  }

  Upload_Contract_details(){

    const uploadData = new FormData();

    uploadData.append('landlord_id', this.upload_Con_Form.get('landlord_id')?.value);
    uploadData.append('real_estate_name', this.upload_Con_Form.get('real_estate_name')?.value);
    uploadData.append('main_property_id', this.upload_Con_Form.get('main_property_id')?.value);
    uploadData.append('main_property_name', this.upload_Con_Form.get('main_property_name')?.value);
    uploadData.append('main_property_legal_id', this.upload_Con_Form.get('main_property_legal_id')?.value);
    uploadData.append('building_no', this.upload_Con_Form.get('building_no')?.value);
    uploadData.append('street_no', this.upload_Con_Form.get('street_no')?.value);
    uploadData.append('zone_no', this.upload_Con_Form.get('zone_no')?.value);
    uploadData.append('sub_property_id', this.upload_Con_Form.get('sub_property_id')?.value);
    uploadData.append('sub_property_name', this.upload_Con_Form.get('sub_property_name')?.value);
    uploadData.append('sub_property_legal_id', this.upload_Con_Form.get('sub_property_legal_id')?.value);
    uploadData.append('sub_property_rent', this.upload_Con_Form.get('sub_property_rent')?.value);
    uploadData.append('tenant_QID', this.upload_Con_Form.get('tenant_QID')?.value);
    uploadData.append('contract_no', this.upload_Con_Form.get('contract_no')?.value);
    uploadData.append('start_date', this.upload_Con_Form.get('start_date')?.value);
    uploadData.append('end_date', this.upload_Con_Form.get('end_date')?.value);
    uploadData.append('Rent_due_date', this.upload_Con_Form.get('Rent_due_date')?.value);
    uploadData.append('contract', this.upload_Con_Form.get('contract')?.value);
    uploadData.append('Renewel_No', this.upload_Con_Form.get('Renewel_No')?.value);

    console.log(this.upload_Con_Form.value);

    this._httpA.post(Environment.baseUrl+'php/API_Update_Ten_Contract_data.php' , uploadData)
    .subscribe(event => {
   console.log(event);
   this.dialog.open(UpdateTenEntryPopupComponent,{width : '25%', height : '200px'});
    
  })

  }

  get tenant_name(){
    return this.uploadForm.get('tenant_name');
  }

  get tenant_email(){
    return this.uploadForm.get('tenant_email');
  }

  get tenant_mobile(){
    return this.uploadForm.get('tenant_mobile');
  }


  get contract_no(){
    return this.upload_Con_Form.get('contract_no');
  }

  get start_date(){
    return this.upload_Con_Form.get('start_date');
  }

  get end_date(){
    return this.upload_Con_Form.get('end_date');
  }


  get Rent_due_date(){
    return this.upload_Con_Form.get('Rent_due_date');
  }

  get contract(){
    return this.upload_Con_Form.get('contract');
  }



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
