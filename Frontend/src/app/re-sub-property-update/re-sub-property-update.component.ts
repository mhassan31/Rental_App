import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { UpdateSuccessPopupComponent } from './update-success-popup/update-success-popup.component';
import { Environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-re-sub-property-update',
  templateUrl: './re-sub-property-update.component.html',
  styleUrls: ['./re-sub-property-update.component.css']
})
export class ReSubPropertyUpdateComponent implements OnInit {
  newsessData: any;
  sessData: any;
  sessData9: any;
  newsessData9: any;
  uploadForm: any;
  uploadForm_Img: any;
  message_data: any;


  constructor(private dataService: DataService, private userdata: ApiService, private _httpA: HttpClient, private fb: FormBuilder, 
   private router:Router, private dialog : MatDialog) {}

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.sessData9 = sessionStorage.getItem('sessionData_9');
    this.newsessData9 = JSON.parse(this.sessData9);

    console.log(this.newsessData9);

    this.uploadForm = this.fb.group({
      // profile: ['',[Validators.required]],
      landlord_id: [this.newsessData.real_estate_id],
      real_estate_name: [this.newsessData.company_name],
      main_property_id: [this.newsessData9.main_property_id],
      main_property_name: [this.newsessData9.main_property_name],
      main_property_legal_id: [this.newsessData9.main_property_legal_id],
      building_no : [this.newsessData9.mainproperty_building_no],
      street_no : [this.newsessData9.mainproperty_street_no],
      zone_no : [this.newsessData9.mainproperty_zone_no],
      sub_property_id: [this.newsessData9.sub_property_id],
      sub_property_name: [this.newsessData9.sub_property_name,[Validators.required]],
      sub_property_legal_id: [this.newsessData9.sub_property_legal_id,[Validators.required]],
      sub_property_rent : [this.newsessData9.sub_property_rent,[Validators.required]]

    });


    this.uploadForm_Img = this.fb.group({
      profile: ['',[Validators.required]],
      landlord_id: [this.newsessData.real_estate_id],
      main_property_id: [this.newsessData9.main_property_id],
      sub_property_id: [this.newsessData9.sub_property_id],
    });



  }


  onFileChanged(event: any) {

    // this.selectedFile = event.target.files[0];
    const file = event.target.files[0];

    this.uploadForm_Img.get('profile')?.setValue(file)

    console.log(file);

    // console.log(this.selectedFile);

  }

  onUpload(){

    const uploadData = new FormData();

    // uploadData.append('myFile', this.uploadForm.get('profile')?.value);
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

    console.log(this.uploadForm.value);

    this._httpA.post(Environment.baseUrl+'php/API_Update_SuB-Property_Data.php', uploadData)
    .subscribe(event => {
      console.log(event);

      this.dialog.open(UpdateSuccessPopupComponent,{width : '20%', height : '225px',
    
      data : {
        message : 'Data Successfully Updated'
      }
    });
      this.router.navigate(['/','property-details'])
    })



  }

  onUpload_Img(){

    const uploadData = new FormData();

    uploadData.append('myFile', this.uploadForm_Img.get('profile')?.value);
    uploadData.append('landlord_id', this.uploadForm_Img.get('landlord_id')?.value);
    uploadData.append('main_property_id', this.uploadForm_Img.get('main_property_id')?.value);
    uploadData.append('sub_property_id', this.uploadForm_Img.get('sub_property_id')?.value);

    console.log(this.uploadForm_Img.value);

    this._httpA.post(Environment.baseUrl+'php/API_Update_SuB-Property_Img.php', uploadData)
    .subscribe(event => {
      console.log(event);

      this.dialog.open(UpdateSuccessPopupComponent,{width : '20%', height : '225px',
    
      data : {
        message : 'Image Successfully Updated'
      },

    });
    this.router.navigate(['/','property-details'])
      

    })

  }

  get profile(){
   return this.uploadForm.get('profile')
  }

  get sub_property_name(){
    return this.uploadForm.get('sub_property_name')
   }

   get sub_property_legal_id(){
    return this.uploadForm.get('sub_property_legal_id')
   }

   get sub_property_rent(){
    return this.uploadForm.get('sub_property_rent')
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
