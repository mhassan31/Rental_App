import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthGuardService } from 'src/app/auth-guard.service';
import { Environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cont-renewel-form',
  templateUrl: './cont-renewel-form.component.html',
  styleUrls: ['./cont-renewel-form.component.css']
})
export class ContRenewelFormComponent implements OnInit {
  sessData: any;
  newsessData: any;
  uploadForm! : FormGroup;
  Cont_Renewel_Data: any;
  new_Cont_Renewel_Data: any;
  Date : string = new Date().toLocaleString();

  constructor( private userdata: ApiService, private _httpA: HttpClient, private fb: FormBuilder,
    private router: Router, private authService: AuthGuardService) { }

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.Cont_Renewel_Data = sessionStorage.getItem('Cont_Renewel_Data');
    this.new_Cont_Renewel_Data = JSON.parse(this.Cont_Renewel_Data);

    console.log(this.new_Cont_Renewel_Data);

    // console.log(this.Date);

    this.uploadForm = this.fb.group({



      landlord_id : [this.new_Cont_Renewel_Data.real_estate_id],
      real_estate_name : [this.new_Cont_Renewel_Data.real_estate_name],
      main_property_id : [this.new_Cont_Renewel_Data.main_property_id],
      main_property_name : [this.new_Cont_Renewel_Data.main_property_name],
      main_property_legal_id : [this.new_Cont_Renewel_Data.main_property_legal_id],
      building_no : [this.new_Cont_Renewel_Data.main_property_building_no],
      street_no : [this.new_Cont_Renewel_Data.main_property_street_no],
      zone_no : [this.new_Cont_Renewel_Data.main_property_zone_no],
      sub_property_id : [this.new_Cont_Renewel_Data.sub_property_id],
      sub_property_name : [this.new_Cont_Renewel_Data.sub_property_name],
      sub_property_legal_id : [this.new_Cont_Renewel_Data.sub_property_legal_id],
      sub_property_rent : [this.new_Cont_Renewel_Data.sub_property_rent],
      tenant_QID : [this.new_Cont_Renewel_Data.tenant_QID],
      tenant_name : [this.new_Cont_Renewel_Data.tenant_name],
      contract_reference : [this.new_Cont_Renewel_Data.con_ref],
      Renewel_No : ['', [Validators.required]],
      start_date : ['', [Validators.required]],
      end_date :['', [Validators.required]],
      contract : ['', [Validators.required]],
      New_Rent : [this.new_Cont_Renewel_Data.sub_property_rent, [Validators.required]],
      email : [this.new_Cont_Renewel_Data.tenant_email],
      mobile_number : [this.new_Cont_Renewel_Data.tenant_mobile_number],
      rent_date : [this.new_Cont_Renewel_Data.tenant_rent_date],
      tenant_reg : [this.new_Cont_Renewel_Data.tenant_reg],
      tenant_status : [this.new_Cont_Renewel_Data.tenant_status],
     

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
    uploadData.append('contract_reference', this.uploadForm.get('contract_reference')?.value);
    uploadData.append('email', this.uploadForm.get('email')?.value);
    uploadData.append('mobile_number', this.uploadForm.get('mobile_number')?.value);
    uploadData.append('rent_date', this.uploadForm.get('rent_date')?.value);
    uploadData.append('start_date', this.uploadForm.get('start_date')?.value);
    uploadData.append('end_date', this.uploadForm.get('end_date')?.value);
    uploadData.append('myFile', this.uploadForm.get('contract')?.value);
    uploadData.append('tenant_reg', this.uploadForm.get('tenant_reg')?.value);
    uploadData.append('tenant_status', this.uploadForm.get('tenant_status')?.value);
    uploadData.append('Renewel_No', this.uploadForm.get('Renewel_No')?.value);
    uploadData.append('New_Rent', this.uploadForm.get('New_Rent')?.value);
    
    console.log(this.uploadForm.value);

    this._httpA.post(Environment.baseUrl+'php/API_Upload_Renewel_Cont_Detail.php' , uploadData)
    .subscribe(event => {

      console.log(event)

    })

  }


  onFileChanged(event:any){

    const file = event.target.files[0];

    this.uploadForm.get('contract')?.setValue(file)

    console.log(file);

  }


  signout() {

    sessionStorage.removeItem('Tab_Data');
    sessionStorage.removeItem('property_type');
    sessionStorage.removeItem('sessionData_9');
    sessionStorage.removeItem('sessionData_8');
    sessionStorage.removeItem('sessionData_5');
    sessionStorage.removeItem('sessionData_4');
    sessionStorage.removeItem('sessionData_3');
    sessionStorage.removeItem('sessionData_2');
    sessionStorage.removeItem('sessionData');

    this.authService.logout();

    this.router.navigate(['/', 'userlogin']);

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

   get New_Rent(){
    return this.uploadForm.get('New_Rent');
   }

   get Renewel_No(){
    return this.uploadForm.get('Renewel_No');
   }

   

}
