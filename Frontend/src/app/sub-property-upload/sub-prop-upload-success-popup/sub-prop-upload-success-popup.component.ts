import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sub-prop-upload-success-popup',
  templateUrl: './sub-prop-upload-success-popup.component.html',
  styleUrls: ['./sub-prop-upload-success-popup.component.css']
})
export class SubPropUploadSuccessPopupComponent implements OnInit {

  constructor(private dialog : MatDialog) { }

  ngOnInit(): void {
  }

  Closepopup(){
    this.dialog.closeAll();
  }

}
