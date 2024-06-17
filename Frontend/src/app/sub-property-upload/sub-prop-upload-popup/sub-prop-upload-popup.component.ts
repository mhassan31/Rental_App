import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sub-prop-upload-popup',
  templateUrl: './sub-prop-upload-popup.component.html',
  styleUrls: ['./sub-prop-upload-popup.component.css']
})
export class SubPropUploadPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SubPropUploadPopupComponent>,
    ) {}

  ngOnInit(): void {
  }

  closepopup(){
    this.dialogRef.close('close');
  }

}
