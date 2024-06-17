import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SubPropUploadPopupComponent } from './sub-prop-upload-popup/sub-prop-upload-popup.component';
import { SubPropUploadSuccessPopupComponent } from './sub-prop-upload-success-popup/sub-prop-upload-success-popup.component';
import { Environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-sub-property-upload',
  templateUrl: './sub-property-upload.component.html',
  styleUrls: ['./sub-property-upload.component.css']
})
export class SubPropertyUploadComponent implements OnInit {
  sessData: any;
  newsessData: any;
  uploadForm: any;
  checklandlordid: any;
  sessData1: any;
  newsessData1: any;
  sessData4: any;
  newsessData4: any;
  upload_result: any;
  data: [][] | any;
  uploadExForm: any;
  sub_property_Ex_name: any;
  sub_property_legal_Ex_id: any;
  sub_property_Ex_rent: any;
  sub_property_image: any;
  datalengthrow: any;

  data2: any;
  sub_property_Ex_image: any;


  constructor(private dataService: DataService, private userdata: ApiService, private _httpA: HttpClient, private fb: FormBuilder,
    private router: Router, private dialog: MatDialog) { }


  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.sessData1 = sessionStorage.getItem('sessionData_2');
    this.newsessData1 = JSON.parse(this.sessData1);

    this.sessData4 = sessionStorage.getItem('sessionData_4');
    this.newsessData4 = JSON.parse(this.sessData4);

    // console.log(this.newsessData4)


    this.uploadForm = this.fb.group({
      profile: ['', [Validators.required]],
      sub_property_name: ['', [Validators.required]],
      sub_property_legal_id: ['', [Validators.required]],
      landlord_id: [this.newsessData.real_estate_id],
      real_estate_name: [this.newsessData.company_name],
      main_property_id: [this.newsessData4.main_property_id],
      main_property_name: [this.newsessData4.main_property_name],
      main_property_legal_id: [this.newsessData4.main_property_legal_id],
      building_no: [this.newsessData4.main_property_building_no],
      street_no: [this.newsessData4.main_property_street_no],
      zone_no: [this.newsessData4.main_property_zone_no],
      sub_property_rent: ['', [Validators.required]],
      sub_property_status:['Vacant']

    });


    this.uploadExForm = this.fb.group({
      excel: ['']
    });



  }

  onFileChanged(event: any) {

    // this.selectedFile = event.target.files[0];
    const file = event.target.files[0];

    this.uploadForm.get('profile')?.setValue(file)

    console.log(file);

    // console.log(this.selectedFile);

  }

  onUpload() {

    const uploadData = new FormData();

    uploadData.append('myFile', this.uploadForm.get('profile')?.value);
    uploadData.append('sub_property_name', this.uploadForm.get('sub_property_name')?.value);
    uploadData.append('sub_property_legal_id', this.uploadForm.get('sub_property_legal_id')?.value);
    uploadData.append('landlord_id', this.uploadForm.get('landlord_id')?.value);
    uploadData.append('real_estate_name', this.uploadForm.get('real_estate_name')?.value);
    uploadData.append('main_property_id', this.uploadForm.get('main_property_id')?.value);
    uploadData.append('main_property_name', this.uploadForm.get('main_property_name')?.value);
    uploadData.append('main_property_legal_id', this.uploadForm.get('main_property_legal_id')?.value);
    uploadData.append('building_no', this.uploadForm.get('building_no')?.value);
    uploadData.append('street_no', this.uploadForm.get('street_no')?.value);
    uploadData.append('zone_no', this.uploadForm.get('zone_no')?.value);
    uploadData.append('sub_property_rent', this.uploadForm.get('sub_property_rent')?.value);
    uploadData.append('sub_property_status', this.uploadForm.get('sub_property_status')?.value);

    console.log(this.uploadForm.value);

    this.userdata.check_sub_property_Data(this.uploadForm.value).subscribe((result: any) => {
      this.upload_result = result;

      if (result == null) {
        console.log("Post Property")

        this._httpA.post(Environment.baseUrl+'php/API_Upload_SuB-Property_Data.php', uploadData)
          .subscribe(event => {
            console.log(event);
            const popup = this.dialog.open(SubPropUploadPopupComponent, { width: '20%', height: '250px' });

            popup.afterClosed().subscribe((item: any) => {

              if (item == 'close') {
                this.router.navigate(['/', 'sub-property-detail'])
              } else {
                console.log('Not Close');
              }

            })


          })

      }
      else {
        this.dialog.open(SubPropUploadSuccessPopupComponent, { width: '20%', height: '250px' });
      }
    })

  }

  onEx_FileChange(evt : any){

    const target : DataTransfer = <DataTransfer>(evt.target);

    if(target.files.length !== 1){
      alert("Multiple File upload");
    }

    const reader : FileReader = new FileReader(); 

    reader.onload = (e : any) =>{
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      // console.log(wb)
      const wsname : string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = (XLSX.utils.sheet_to_json(ws, {header:1}));
      // console.log(this.data);

    };
    reader.readAsBinaryString(target.files[0]);
  }


  Excel_Upload(){

    this.datalengthrow = this.data.length;

    console.log(this.datalengthrow);

    let i;
    for(i=0;i<=this.datalengthrow-1;i++){

      if(i!=0){
        this.sub_property_Ex_name =this.data[i][0];
        this.sub_property_legal_Ex_id=this.data[i][1];
        this.sub_property_Ex_rent = this.data[i][2];
        this.sub_property_Ex_image = this.data[i][3];


        this.uploadExForm = this.fb.group({
          profile: [this.sub_property_Ex_image],
          sub_property_name: [this.sub_property_Ex_name],
          sub_property_legal_id: [this.sub_property_legal_Ex_id],
          landlord_id: [this.newsessData.real_estate_id],
          real_estate_name: [this.newsessData.company_name],
          main_property_id: [this.newsessData4.main_property_id],
          main_property_name: [this.newsessData4.main_property_name],
          main_property_legal_id: [this.newsessData4.main_property_legal_id],
          building_no : [this.newsessData4.main_property_building_no],
          street_no : [this.newsessData4.main_property_street_no],
          zone_no : [this.newsessData4.main_property_zone_no],
          sub_property_rent : [this.sub_property_Ex_rent]

        });

        const uploadData = new FormData();

        // uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

        uploadData.append('myFile', this.uploadExForm.get('profile')?.value);
        uploadData.append('sub_property_name', this.uploadExForm.get('sub_property_name')?.value);
        uploadData.append('sub_property_legal_id', this.uploadExForm.get('sub_property_legal_id')?.value);
        uploadData.append('landlord_id', this.uploadExForm.get('landlord_id')?.value);
        uploadData.append('real_estate_name', this.uploadExForm.get('real_estate_name')?.value);
        uploadData.append('main_property_id', this.uploadExForm.get('main_property_id')?.value);
        uploadData.append('main_property_name', this.uploadExForm.get('main_property_name')?.value);
        uploadData.append('main_property_legal_id', this.uploadExForm.get('main_property_legal_id')?.value);
        uploadData.append('building_no', this.uploadExForm.get('building_no')?.value);
        uploadData.append('street_no', this.uploadExForm.get('street_no')?.value);
        uploadData.append('zone_no', this.uploadExForm.get('zone_no')?.value);
        uploadData.append('sub_property_rent', this.uploadExForm.get('sub_property_rent')?.value);

        console.log(this.uploadExForm.value);

        this.userdata.check_sub_property_Data(this.uploadExForm.value).subscribe((result: any) => {
          this.upload_result = result;

          if (result == null) {
            console.log("Post Property")

            this._httpA.post(Environment.baseUrl+'php/API_Upload_SuB-Property_Data.php', uploadData)
              .subscribe(event => {
                console.log(event);

              })

          }
          else {
            // alert("This Unit already exist");
            console.log("This Unit already exist")
          }

          // this.router.navigate(['/','sub-property-detail'])
          // alert('Property Successfully Uploaded')

        })

      }

    }

  }


  // onEx_FileChange(evt: any) {

  //   const file = evt.target.files[0];
  //   this.uploadExForm.get('excel')?.setValue(file)
  //   console.log(file);

  // }

  // Excel_Upload() {

  //   const uploadData = new FormData();

  //   uploadData.append('myFile', this.uploadExForm.get('excel')?.value);

  //   console.log(this.uploadExForm.value);
    
  //   this._httpA.post('http://localhost:8080/angular_app_Rental_Updated/php/Image_Process/phpspreadsheet-Reading-Images-from-an-Excel-File-master/index.php', uploadData)
  //   .subscribe(event => {
  //     console.log(event);
  //   })
  // }

  get profile() {
    return this.uploadForm.get('profile');
  }

  get sub_property_name() {
    return this.uploadForm.get('sub_property_name');
  }

  get sub_property_legal_id() {
    return this.uploadForm.get('sub_property_legal_id');
  }

  get sub_property_rent() {
    return this.uploadForm.get('sub_property_rent');
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
