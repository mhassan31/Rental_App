import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { UpdateSuccessPopupComponent } from './update-success-popup/update-success-popup.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-re-update-property-detail',
  templateUrl: './re-update-property-detail.component.html',
  styleUrls: ['./re-update-property-detail.component.css']
})
export class REUpdatePropertyDetailComponent implements OnInit {
  sessData: any;
  newsessData: any;

  checkpropertyid: any;
  checklandlordid: any;
  result1: any;
  note: any;
  dbdata: any;

  form!: FormGroup;
  response1 : any;
  formdata : any;
  uploadForm!: FormGroup;
  uploadForm_Img!: FormGroup;
  uploadForm_Contract!: FormGroup;
  propertydataresult1 : any;
  selectedFile!: File;
  sessData8: any;
  newsessData8: any;
  Update_main_property_detail_result: any;
  blockaplhaError_permit_no: boolean = false;
  blockaplhaError_building_no: boolean = false;
  blockaplhaError_st_no: boolean = false;
  blockaplhaError_zone: boolean = false;
  message_data: any = "Property Data Successfully Updated";

  constructor(private dataService: DataService, private  userdata: ApiService, private _httpA : HttpClient, private fb: FormBuilder,
    private router :Router, private dialog : MatDialog) {}



  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.sessData8 = sessionStorage.getItem('sessionData_8');
    this.newsessData8 = JSON.parse(this.sessData8);





    this.uploadForm = this.fb.group({
      property_id:[this.newsessData8.main_property_id,[Validators.required]],
      property_name : [this.newsessData8.main_property_name,[Validators.required]],
      property_legal_id : [this.newsessData8.main_property_legal_id,[Validators.required]],
      landlord_id : [this.newsessData.real_estate_id,[Validators.required]],
      real_estate_name : [this.newsessData.company_name,[Validators.required]],
      building_no : [this.newsessData8.main_property_building_no,[Validators.required]],
      street_no : [this.newsessData8.main_property_street_no,[Validators.required]],
      zone_no : [this.newsessData8.main_property_zone_no,[Validators.required]]
    });


    this.uploadForm_Img = this.fb.group({
      profile : ['',[Validators.required]],
      property_id:[this.newsessData8.main_property_id,[Validators.required]],
      landlord_id : [this.newsessData.real_estate_id,[Validators.required]],
    });


    this.uploadForm_Contract = this.fb.group({
      contract : ['',[Validators.required]],
      property_id:[this.newsessData8.main_property_id,[Validators.required]],
      landlord_id : [this.newsessData.real_estate_id,[Validators.required]],
    });

  }

  onFileChanged(event : any){

    const file = event.target.files[0];
    this.uploadForm_Img.get('profile')?.setValue(file)
    console.log(file);
    
}

onFileChanged2(event : any) {
  
  const file = event.target.files[0];
  this.uploadForm_Contract.get('contract')?.setValue(file)
  console.log(file);

}




  onUpload(){

    const uploadData = new FormData();

    uploadData.append('property_id', this.uploadForm.get('property_id')?.value);
    uploadData.append('property_name', this.uploadForm.get('property_name')?.value);
    uploadData.append('landlord_id', this.uploadForm.get('landlord_id')?.value);
    uploadData.append('real_estate_name', this.uploadForm.get('real_estate_name')?.value);
    uploadData.append('property_legal_id', this.uploadForm.get('property_legal_id')?.value);
    uploadData.append('building_no', this.uploadForm.get('building_no')?.value);
    uploadData.append('street_no', this.uploadForm.get('street_no')?.value);
    uploadData.append('zone_no', this.uploadForm.get('zone_no')?.value);

    console.log(this.uploadForm.value);

    this._httpA.post(Environment.baseUrl+'php/API_Update_Property_Data_test.php' , uploadData)
    .subscribe(event => {
   console.log(event);
   this.dialog.open(UpdateSuccessPopupComponent,{width : '20%', height : '300px',
      data : {
        message : this.message_data
      }
  })
   
   
  })

  // alert("Property Details Updated Successfully");
  // this.router.navigate(['/', 're-update-property-detail']);

  }

  Upload_Img(){

    const uploadData = new FormData();

    uploadData.append('myFile', this.uploadForm_Img.get('profile')?.value);
    uploadData.append('property_id', this.uploadForm_Img.get('property_id')?.value);
    uploadData.append('landlord_id', this.uploadForm_Img.get('landlord_id')?.value);

    console.log(this.uploadForm_Img.value);

    this._httpA.post(Environment.baseUrl+'php/API_Update_Property_Image_test.php' , uploadData)
    .subscribe(event => {
   console.log(event);
   this.dialog.open(UpdateSuccessPopupComponent,{width : '20%', height : '300px',
   data : {
     message : "Image Successfully Updated"
   }
})


  })

  }

  Upload_Contract(){

    const uploadData = new FormData();

    uploadData.append('myFile2', this.uploadForm_Contract.get('contract')?.value);
    uploadData.append('property_id', this.uploadForm_Contract.get('property_id')?.value);
    uploadData.append('landlord_id', this.uploadForm_Contract.get('landlord_id')?.value);

    console.log(this.uploadForm_Contract.value);

    this._httpA.post(Environment.baseUrl+'php/API_Update_Property_contract_test.php' , uploadData)
    .subscribe(event => {
   console.log(event);
   this.dialog.open(UpdateSuccessPopupComponent,{width : '20%', height : '150px',
   data : {
     message : "Contract Successfully Updated"
   }
})
   
   
  })

  }

  get profile(){
    return this.uploadForm.get('profile');
  }

  get contract(){
    return this.uploadForm.get('contract');
  }

  get property_name(){
    return this.uploadForm.get('property_name');
  }

  get property_legal_id(){
    return this.uploadForm.get('property_legal_id');
  }

  get building_no(){
    return this.uploadForm.get('building_no');
  }

  get street_no(){
    return this.uploadForm.get('street_no');
  }

  get zone_no(){
    return this.uploadForm.get('zone_no');
  }

  OnlyNumbersAllowed_Permit_no(event : any) {
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

    OnlyNumbersAllowed_Builing_no(event : any){
      const charCode = (event.which)?event.which: event.keycode;
      if(charCode>31 && (charCode < 48 || charCode > 57))
      {
        console.log("this is not a number")
        this.blockaplhaError_building_no = true;
        return false;
      }
      else{
        this.blockaplhaError_building_no = false;
        return true;
      }
    }

    OnlyNumbersAllowed_st_no(event : any){
      const charCode = (event.which)?event.which: event.keycode;
      if(charCode>31 && (charCode < 48 || charCode > 57))
      {
        console.log("this is not a number")
        this.blockaplhaError_st_no = true;
        return false;
      }
      else{
        this.blockaplhaError_st_no = false;
        return true;
      }
    }

    OnlyNumbersAllowed_zone(event : any){
      const charCode = (event.which)?event.which: event.keycode;
      if(charCode>31 && (charCode < 48 || charCode > 57))
      {
        console.log("this is not a number")
        this.blockaplhaError_zone = true;
        return false;
      }
      else{
        this.blockaplhaError_zone = false;
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
