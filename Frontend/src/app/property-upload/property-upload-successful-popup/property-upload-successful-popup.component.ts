import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-property-upload-successful-popup',
  templateUrl: './property-upload-successful-popup.component.html',
  styleUrls: ['./property-upload-successful-popup.component.css']
})
export class PropertyUploadSuccessfulPopupComponent implements OnInit {

  constructor(private dialog : MatDialog) { }

  ngOnInit(): void {
  }

  closepopup(){
    this.dialog.closeAll();
  }

}
