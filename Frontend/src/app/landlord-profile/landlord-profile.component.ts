import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-landlord-profile',
  templateUrl: './landlord-profile.component.html',
  styleUrls: ['./landlord-profile.component.css']
})
export class LandlordProfileComponent implements OnInit {
  tenantresponse1: any;
  response1: any;

  constructor(private dataService: DataService, private userdata : ApiService) { }

  ngOnInit(): void {
    this.dataService.data.subscribe((response:any) => {
      this.response1 = response
      console.log(this.response1);  // you will receive the data from sender component here.
      // console.log(this.tenantresponse1)
    
    });
  }

}
