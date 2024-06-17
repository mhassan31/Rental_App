import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { HttpClient, HttpEvent } from '@angular/common/http';

import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PropertyUploadPopupComponent } from './property-upload-popup/property-upload-popup.component';
import { PropertyUploadSuccessfulPopupComponent } from './property-upload-successful-popup/property-upload-successful-popup.component';

import { OwnershipValidator } from './custom_validation.directive'; 

import { Environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-property-upload',
  templateUrl: './property-upload.component.html',
  styleUrls: ['./property-upload.component.css']
})
export class PropertyUploadComponent implements OnInit {
  sessData: any;
  newsessData: any;
  checkpropertyid: any;
  checklandlordid: any;
  result1: any;
  note: any;
  dbdata: any;
  blockaplhaError_permit_no: boolean = false;
  blockaplhaError_building_no: boolean= false;
  blockaplhaError_st_no: boolean= false;
  blockaplhaError_zone: boolean= false;
  flag: boolean = true;
  showerr: any;
  flag2: boolean = false;
  flag3: boolean = false;
  sec_owner: boolean = false;
  first_owner: boolean = true;

  constructor(private dataService: DataService, private  userdata: ApiService, private _httpA : HttpClient, 
    private fb: FormBuilder, private router : Router, private dialog : MatDialog, private route : ActivatedRoute) { }

   form!: FormGroup;
   response1 : any;
   formdata : any;
   uploadForm!: FormGroup;
   propertydataresult1 : any;
   selectedFile!: File;


  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    // console.log(this.newsessData)

    this.uploadForm = this.fb.group({
      profile : ['',[Validators.required]],
      contract :[''],
      property_name : ['',[Validators.required]],
      property_legal_id : ['',[Validators.required]],
      landlord_id : [this.newsessData.real_estate_id],
      real_estate_name : [this.newsessData.company_name],
      building_no : ['',[Validators.required]],
      street_no : ['', [Validators.required]],
      zone_no : ['', [Validators.required]],
      property_type : ['', [Validators.required]],
      ownership : ['', [Validators.required]]
    });

    this.uploadCompound();

  }



  onFileChanged(event : any) {
  
    const file = event.target.files[0];
    this.uploadForm.get('profile')?.setValue(file)
    console.log(file);

  }

  onFileChanged2(event : any) {
  
    const file = event.target.files[0];
    this.uploadForm.get('contract')?.setValue(file)
    console.log(file);
    this.flag=true;
    this.flag2 = true;
  }

  onUpload(){

    const uploadData = new FormData();

    uploadData.append('myFile', this.uploadForm.get('profile')?.value);
    uploadData.append('myFile2', this.uploadForm.get('contract')?.value);
    uploadData.append('property_name', this.uploadForm.get('property_name')?.value);
    uploadData.append('landlord_id', this.uploadForm.get('landlord_id')?.value);
    uploadData.append('real_estate_name', this.uploadForm.get('real_estate_name')?.value);
    uploadData.append('property_legal_id', this.uploadForm.get('property_legal_id')?.value);
    uploadData.append('building_no', this.uploadForm.get('building_no')?.value);
    uploadData.append('street_no', this.uploadForm.get('street_no')?.value);
    uploadData.append('zone_no', this.uploadForm.get('zone_no')?.value);
    uploadData.append('property_type', this.uploadForm.get('property_type')?.value);
    uploadData.append('ownership', this.uploadForm.get('ownership')?.value);


    console.log(this.uploadForm.value);

    this.userdata.checkpropertydetail(this.uploadForm.value).subscribe((result : any) => {
      
      if(result == null)
      {
        // console.log("Post Property")
          this._httpA.post(Environment.baseUrl+'php/API_Upload_Property_Data_test.php' , uploadData)
            .subscribe(event => {
           console.log(event);
           this.dialog.open(PropertyUploadSuccessfulPopupComponent,{width : '25%', height : '200px'});
            this.router.navigate(['/','property-details'])
          })
      }
      else
      {
        this.dialog.open(PropertyUploadPopupComponent,{width : '25%', height : '200px'})
      }
    })
  }

  get property_type(){
    return this.uploadForm.get('property_type');
  }

  get profile(){
    return this.uploadForm.get('profile');
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

    ownership = [
      {id : '1', value : 'First_Owner', name :'I am the First Owner of the Property'},
      {id : '2', value : 'Second_Owner', name : 'I am the Second Owner of the property'}
    ]

   getvalue(value:any){
    console.log(value);
    if(value == 'First_Owner' ){
      this.first_owner =true;
      this.sec_owner =false;
      this.flag=true;
      // this.clear_contract_input();
    }


    else if(value == 'Second_Owner'){
      this.first_owner =false;
      this.sec_owner =true;
      this.flag=false;
      if(!this.flag2){
      this.flag=false;
      }
      else{
        this.flag=true;
      }
    }
    
  }


    checkValidations(){
      this.uploadForm = new FormGroup({
        'contract' : new FormControl(null,Validators.required),
      })
    }



    clear_contract_input(){
      this.uploadForm.get('contract')?.setValue('');
    }



    uploadCompound(){
      this.router.navigate(['upload-form-compound'], {relativeTo: this.route});
      sessionStorage.setItem('property_type', JSON.stringify("Compound"));
      
    }

    uploadVilla(){
      this.router.navigate(['upload-form-villa'], {relativeTo: this.route});
      sessionStorage.setItem('property_type', JSON.stringify("Villa"));
    }

    uploadVilla_apartment(){
      this.router.navigate(['upload-form-villa-unit'], {relativeTo: this.route});
      sessionStorage.setItem('property_type', JSON.stringify("Villa_Apartment"));
    }

    uploadApartment(){
      this.router.navigate(['upload-form-aparment'], {relativeTo: this.route});
      sessionStorage.setItem('property_type', JSON.stringify("Apartment"));
    }

    uploadOffice(){
      this.router.navigate(['upload-form-office'], {relativeTo: this.route});
      sessionStorage.setItem('property_type', JSON.stringify("Office"));
    }

    uploadShowroom(){
      this.router.navigate(['upload-form-showroom'], {relativeTo: this.route});
      sessionStorage.setItem('property_type', JSON.stringify("Show_Room"));
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
