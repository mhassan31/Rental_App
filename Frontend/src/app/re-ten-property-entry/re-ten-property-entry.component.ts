import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { DataService } from '../data.service';
import { MatDialog,  MatDialogRef,  MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { PropertyEntrySuccessPopupComponent } from './property-entry-success-popup/property-entry-success-popup.component';
import { Environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-re-ten-property-entry',
  templateUrl: './re-ten-property-entry.component.html',
  styleUrls: ['./re-ten-property-entry.component.css']
})
export class ReTenPropertyEntryComponent implements OnInit {
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
  sessData5: any;
  newsessData5: any;
  re_tenant_entry_result: any;
  blockaplhaError_permit_no: boolean=false;

  constructor(private dataService: DataService, private  userdata: ApiService, private _httpA : HttpClient, private fb: FormBuilder, 
    private router : Router, private dialog : MatDialog) 
  {}

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

    // console.log(this.newsessData5.main_property_legal_id);


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
      tenant_QID : ['',[Validators.required]],
      tenant_name : ['',[Validators.required]],
      contract_reference : ['',[Validators.required]],
      start_date : ['',[Validators.required]],
      end_date :['',[Validators.required]],
      contract : ['',[Validators.required]],
      email : ['',[Validators.required, Validators.email]],
      mobile_number : ['',[Validators.required]],
      rent_date : ['',[Validators.required]],
      tenant_reg : ['Registered'],
      tenant_status : ['InActive'],
      property_status:['Occupied']

    });

  }

  onUpload(){

    console.log(this.newsessData5.main_property_legal_id);

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
    uploadData.append('contract_reference', this.uploadForm.get('contract_reference')?.value);
    uploadData.append('email', this.uploadForm.get('email')?.value);
    uploadData.append('mobile_number', this.uploadForm.get('mobile_number')?.value);
    uploadData.append('rent_date', this.uploadForm.get('rent_date')?.value);
    uploadData.append('start_date', this.uploadForm.get('start_date')?.value);
    uploadData.append('end_date', this.uploadForm.get('end_date')?.value);
    uploadData.append('myFile', this.uploadForm.get('contract')?.value);
    uploadData.append('tenant_reg', this.uploadForm.get('tenant_reg')?.value);
    uploadData.append('tenant_status', this.uploadForm.get('tenant_status')?.value);
    uploadData.append('property_status', this.uploadForm.get('property_status')?.value);

    console.log(this.uploadForm.value);

    this._httpA.post(Environment.baseUrl+'php/API_Upload_RE_tenant_Entry_Data.php' , uploadData)
    .subscribe(event => {
    // console.log(event);
    const popup = this.dialog.open(PropertyEntrySuccessPopupComponent,{width : '20%', height : '220px'})
    // this.router.navigate(['/','property-dashboard']);
    popup.afterClosed().subscribe((item:any)=>{
      if(item == 'close'){

        this.router.navigate(['/','sub-property-detail']);

      }else{
        console.log('not closed');
      }
    })
    })


  }

  onFileChanged(event : any) {
  
    // this.selectedFile = event.target.files[0];
    const file = event.target.files[0];

    this.uploadForm.get('contract')?.setValue(file)

    console.log(file);
    
    // console.log(this.selectedFile);

  }

  get tenant_QID(){
   return this.uploadForm.get('tenant_QID');
  }

  get tenant_name(){
    return this.uploadForm.get('tenant_name');
   }

   get contract_reference(){
    return this.uploadForm.get('contract_reference');
   }

   get start_date(){
    return this.uploadForm.get('start_date');
   }

   get end_date(){
    return this.uploadForm.get('end_date');
   }

   get contract(){
    return this.uploadForm.get('contract');
   }

   OnlyNumbersAllowed(event : any) {
    const charCode = (event.which)?event.which: event.keycode;
      if(charCode>31 && (charCode < 48 || charCode > 57))
      {
        console.log("this is not a number")
        this.blockaplhaError_permit_no = true;
        return false;
      }
      else{
        this.blockaplhaError_permit_no = false;
        return true;
      }
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
