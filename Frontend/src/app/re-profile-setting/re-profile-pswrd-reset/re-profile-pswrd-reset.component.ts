import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UpdateConfirmPopupComponent } from '../update-confirm-popup/update-confirm-popup.component';

@Component({
  selector: 'app-re-profile-pswrd-reset',
  templateUrl: './re-profile-pswrd-reset.component.html',
  styleUrls: ['./re-profile-pswrd-reset.component.css']
})
export class ReProfilePswrdResetComponent implements OnInit {
  sessData: any;
  newsessData: any;
  uploadForm: any;
  update_real_estate_detail_result: any;
  update_real_estate_pswrd_result: any;
  current_password_status: boolean = false;

  constructor( private  userdata: ApiService, private _httpA : HttpClient, private fb: FormBuilder, 
    private router : Router, private dialog : MatDialog, private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.uploadForm = this.fb.group({
    
      landlord_id : [this.newsessData.real_estate_id],
      current_pswrd : ['',[Validators.required, Validators.minLength(8)]],
      pswrd : ['', [Validators.required, Validators.minLength(8)]],
      c_pswrd : ['', [Validators.required]]
 
      } 
      , { validators: this.MustMatch('pswrd','c_pswrd')}
      );

  }

  get f(){return this.uploadForm.controls}

  MustMatch(controlName : string, matchingControlName: string){
    return (formGroup: FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['MustMatch']) {
        return;
        }
        if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
        } else {
        matchingControl.setErrors(null);
        }
    }
  }


  onUpload(){

    const uploadData = new FormData();

    uploadData.append('landlord_id', this.uploadForm.get('landlord_id')?.value);
    uploadData.append('current_pswrd', this.uploadForm.get('current_pswrd')?.value);
    uploadData.append('pswrd', this.uploadForm.get('pswrd')?.value);

    console.log(this.uploadForm.value);

    this.userdata.update_real_estate_password(this.uploadForm.value).subscribe((result : any)=>{
      this.update_real_estate_pswrd_result = result;
     if(this.update_real_estate_pswrd_result == "Wrong Current Password"){
      this.current_password_status=true;
     }
     else{
      this.current_password_status=false;
     }

      this.dialog.open(UpdateConfirmPopupComponent, {width : '20%', height : '300px',    data : {
        message : "Password Updated Successfully"
      }})

      this.ngOnInit();

    })

    // alert("Data Updated Successfully Please Sign Out and Sign In again to see the updated details");
    // this.router.navigate(['/','userprofile']);

  }

  get current_pswrd(){
    return this.uploadForm.get('current_pswrd');
  }

  get pswrd(){
    return this.uploadForm.get('pswrd');
  }

  get c_pswrd(){
    return this.uploadForm.get('c_pswrd');
  }



}
