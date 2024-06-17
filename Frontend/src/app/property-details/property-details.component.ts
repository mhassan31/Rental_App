import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { HttpClient, HttpEvent } from '@angular/common/http';

import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyDelPopupComponent } from './property-del-popup/property-del-popup.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, from, toArray } from 'rxjs';


@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  sessData: any;
  newsessData: any;
  propertydetail1: any;
  main_property_detail: any;
  del_result: any;
  compound_data: any;
  data: any;
  Villa_data: any;
  Aparment_data: any;
  Apartment_data: any;
  Office_data: any;
  Showroom_data: any;

  constructor(private dataService: DataService, private userdata: ApiService, private _httpA: HttpClient, private fb: FormBuilder,
    private router: Router, private dialog: MatDialog, private route: ActivatedRoute) { }

  form!: FormGroup;

  response1: any;
  formdata: any;

  uploadForm!: FormGroup;

  propertydataresult1: any;

  selectedFile!: File;

  p: any

  p1: any;

  p2: any;

  p3: any;

  a: any;

  collapse_side_bar:boolean=true;



  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);



    this.userdata.get_re_db_propertyData().subscribe((propertydataresult: any) => {
      this.propertydataresult1 = propertydataresult
      console.log(this.propertydataresult1.landlord_id)

      const source = from(this.propertydataresult1);

      // Property Type == Compound //

      source.pipe(
        filter((a: any) => a.property_type == 'Compound'),
        toArray()
      )
        .subscribe((Compound: any) => {
          this.compound_data = Compound;
        })

      // Property Type == Villa //

      source.pipe(
        filter((a: any) => a.property_type == 'Villa'),
        toArray()
      )
        .subscribe((Villa: any) => {
          this.Villa_data = Villa;
        })


      source.pipe(
        filter((a: any) => a.property_type == 'Apartment'),
        toArray()
      )
        .subscribe((Apartment: any) => {
          this.Apartment_data = Apartment;
        })


      source.pipe(
        filter((a: any) => a.property_type == 'Office'),
        toArray()
      )
        .subscribe((Office: any) => {
          this.Office_data = Office;
        })


      source.pipe(
        filter((a: any) => a.property_type == 'Showroom'),
        toArray()
      )
        .subscribe((Showroom: any) => {
          this.Showroom_data = Showroom;
        })

    })


  }

  open_side_bar(){

    this.collapse_side_bar=true;

  }

  close_side_bar(){

    this.collapse_side_bar=false;

  }




  respectiveData(main_property_id: any) {

    // console.log(main_property_id);

    sessionStorage.setItem('sessionData_2', JSON.stringify(main_property_id));
    this.router.navigate(['/', 'sub-property-detail']);

    // this.userdata.get_main_property_detail(main_property_id).subscribe((result: any) => {
    //   this.main_property_detail = result;
    //   console.log(this.main_property_detail)
    //   sessionStorage.setItem('sessionData_4', JSON.stringify(this.main_property_detail));
    //   sessionStorage.setItem('sessionData_2', JSON.stringify(main_property_id));
    //   this.router.navigate(['/', 'sub-property-detail']);
    // })
  }

  Update_property_detail(main_property_id: any) {

    this.userdata.get_main_property_detail(main_property_id).subscribe((result: any) => {
      this.main_property_detail = result;
      console.log(this.main_property_detail)
      sessionStorage.setItem('sessionData_8', JSON.stringify(this.main_property_detail));
      this.router.navigate(['/', 're-update-property-detail']);

    })

  }

  delete_main_property(main_property_id: any) {

    const popup = this.dialog.open(PropertyDelPopupComponent, { width: '25%', height: '250px' })

    popup.afterClosed().subscribe((item: any) => {
      // console.log(item)
      if (item == "Delete Confirm") {
        console.log('delete this property')
        this.userdata.del_property(main_property_id).subscribe((result: any) => {
          this.del_result = result;
          this.ngOnInit();
        })

      } else (
        console.log("Cancel Delete")
      )
    })

  }

  Goto_Compound() {
    // console.log(this.compound_data);
    this.router.navigate(['compound-details'], { relativeTo: this.route });
    sessionStorage.setItem('Tab_Data', JSON.stringify(this.compound_data));



  }

  Goto_Villa() {
    // console.log(this.Villa_data);
    this.router.navigate(['villa-details'], { relativeTo: this.route });
    sessionStorage.setItem('Tab_Data', JSON.stringify(this.Villa_data));

  }

  Goto_Apartment() {
    // console.log(this.Apartment_data);
    this.router.navigate(['apartment-details'], { relativeTo: this.route });
    sessionStorage.setItem('Tab_Data', JSON.stringify(this.Apartment_data));


  }

  Goto_Office() {
    // console.log(this.Office_data);
    this.router.navigate(['office-details'], { relativeTo: this.route });
    sessionStorage.setItem('Tab_Data', JSON.stringify(this.Office_data));

  }

  Goto_Showroom() {

    // console.log(this.Showroom_data);
    this.router.navigate(['showroom-details'], { relativeTo: this.route });
    sessionStorage.setItem('Tab_Data', JSON.stringify(this.Showroom_data));

  }

  // testroute(){
  //   this.router.navigate(['/', 'test']);
  // }


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
