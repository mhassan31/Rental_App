import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  uploadForm! : FormGroup

  constructor(private router : Router, private userdata : ApiService, private dataService : DataService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.uploadForm = this.fb.group({

      Email : ['',[Validators.required, Validators.email]]
      

    });


  }

  onUpload(){

    const uploadData = new FormData();

    uploadData.append('Email', this.uploadForm.get('Email')?.value);
    console.log(this.uploadForm.value)

    this.userdata.forget_password(this.uploadForm.value).subscribe((result:any)=>{
      console.log(result)
    })

  }

  get Email(){
    return this.uploadForm.get('Email')
  }

}
