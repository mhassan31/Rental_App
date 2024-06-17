import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-re-acc-setting',
  templateUrl: './re-acc-setting.component.html',
  styleUrls: ['./re-acc-setting.component.css']
})
export class ReAccSettingComponent implements OnInit {
  newsessData: any;
  sessData: any;
  uploadForm: any;
  update_real_estate_detail_result: any;
  blockfourError: boolean = false;
  blockalphabetError: boolean = false;
  blockaplhaError: boolean = false;
  country_code: any = '+974';
  bearer_token : any;
  userData :any;
  token: any;

  constructor(private  userdata: ApiService, private _httpA : HttpClient, private fb: FormBuilder, 
    private router : Router) { }

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

     this.userdata.get_user_details(this.newsessData.token).subscribe((result:any)=>{

      this.userData = result;

      this.uploadForm = this.fb.group({
    
        landlord_id : [this.userData.real_estate_id],
        real_estate_name : [this.userData.company_name, [Validators.required]],
        reg_id : [this.userData.reg_id, [Validators.required]],
        full_name : [this.userData.first_name, [Validators.required]],
        mobile_number : [this.userData.mobile_number, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        email : [this.userData.email, [Validators.required, Validators.email]],
        cc : [this.country_code]
  
      });

     })
  }

  onUpload(){

    const uploadData = new FormData();

    uploadData.append('landlord_id', this.uploadForm.get('landlord_id')?.value);
    uploadData.append('real_estate_name', this.uploadForm.get('real_estate_name')?.value);
    uploadData.append('reg_id', this.uploadForm.get('reg_id')?.value);
    uploadData.append('full_name', this.uploadForm.get('full_name')?.value);
    uploadData.append('mobile_number', this.uploadForm.get('mobile_number')?.value);
    uploadData.append('email', this.uploadForm.get('email')?.value);

    console.log(this.uploadForm.value);

    this.userdata.update_real_estate_detail(this.uploadForm.value).subscribe((result : any)=>{
      this.update_real_estate_detail_result = result;
      // console.log(this.update_real_estate_detail_result)
      alert("Data Updated Successfully");

    })

  }

  get real_estate_name(){
    return this.uploadForm.get('real_estate_name');
  }

  get reg_id(){
    return this.uploadForm.get('reg_id');
  }

  get full_name(){
    return this.uploadForm.get('full_name');
  }

  get mobile_number(){
    return this.uploadForm.get('mobile_number');
  }

  get email(){
    return this.uploadForm.get('email');
  }

  OnlyNumbersAllowed(event : any) {
    const charCode = (event.which)?event.which: event.keycode;
      if(charCode>31 && (charCode < 48 || charCode > 57))
      {
        console.log("this is not a number")
        this.blockaplhaError = true;
        return false;
      }
      else{
        this.blockaplhaError = false;
        return true;
      }
    }
  
    fourNotAllowed(event : any){
      // console.log(event);
      
      const charCode = (event.which)?event.which: event.keycode;
      
      if(charCode>31 && (charCode < 48 || charCode > 57))
      {
        this.blockalphabetError = true;
        return false;
      }
      else
      {
        this.blockalphabetError = false;
        return true;
      }
    }
  
  
    blockfourAsFirstDigit(evt : any){
      console.log(evt);
      if(evt.target.value.length === 0 && (evt.key === "4" || evt.key ==="Backspace")){
        this.blockfourError = true;
        evt.preventDefault();
      }
      else{
        this.blockfourError = false;
      }
    
    }
  


}
function token(value: any, token: any) {
  throw new Error('Function not implemented.');
}

