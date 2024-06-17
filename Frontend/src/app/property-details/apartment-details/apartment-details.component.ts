import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { DataService } from 'src/app/data.service';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PropertyDelPopupComponent } from '../property-del-popup/property-del-popup.component';
import { Environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.css']
})
export class ApartmentDetailsComponent implements OnInit {
  del_result: any;
  main_property_detail: any;
  p1:any;
  document_path = Environment.baseUrl;

  constructor(private dataService: DataService, private  userdata: ApiService, private _httpA : HttpClient, 
    private fb: FormBuilder, private router : Router, private dialog : MatDialog, private route : ActivatedRoute) { }

    tab_data: any;
    new_tab_data: any;

  ngOnInit(): void {

    this.tab_data = sessionStorage.getItem('Tab_Data');
    this.new_tab_data = JSON.parse(this.tab_data);

    console.log(this.new_tab_data)
  }

  searchText:string='';

  respectiveData(main_property_id: any) {

    // console.log(main_property_id);

    this.userdata.get_main_property_detail(main_property_id).subscribe((result: any) => {
      this.main_property_detail = result;
      // console.log(this.main_property_detail)
      sessionStorage.setItem('sessionData_4', JSON.stringify(this.main_property_detail));
      sessionStorage.setItem('sessionData_2', JSON.stringify(main_property_id));
      this.router.navigate(['/', 'sub-property-detail']);
    })
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
          this.router.navigate(['/', 'test']);
        })
        
        

      } else (
        console.log("Cancel Delete")
      )
    })

  }

}
