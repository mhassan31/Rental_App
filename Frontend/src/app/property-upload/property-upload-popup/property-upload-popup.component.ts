import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-property-upload-popup',
  templateUrl: './property-upload-popup.component.html',
  styleUrls: ['./property-upload-popup.component.css']
})
export class PropertyUploadPopupComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  closepopup(){
    this.dialog.closeAll();
  }

}
