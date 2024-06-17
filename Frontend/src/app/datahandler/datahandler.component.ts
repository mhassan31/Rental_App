import { Component, OnInit } from '@angular/core';

import {ApiService} from '../api.service';
import {User} from '../user';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-datahandler',
  templateUrl: './datahandler.component.html',
  styleUrls: ['./datahandler.component.css']
})
export class DatahandlerComponent implements OnInit {

  constructor(private userdata : ApiService) { }


  getuserdata(){
    this.userdata.getData().subscribe(data=>{
      console.warn(data)
    })
  
  }



  ngOnInit(): void {
    
  }


}
