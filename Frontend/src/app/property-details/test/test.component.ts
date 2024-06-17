import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { DataService } from 'src/app/data.service';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private dataService: DataService, private  userdata: ApiService, private _httpA : HttpClient, 
    private fb: FormBuilder, private router : Router, private dialog : MatDialog, private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.router.navigate(['/', 'property-details']);
  }

}
