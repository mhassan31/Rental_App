import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, } from '@angular/material/dialog';

@Component({
  selector: 'app-property-entry-success-popup',
  templateUrl: './property-entry-success-popup.component.html',
  styleUrls: ['./property-entry-success-popup.component.css']
})
export class PropertyEntrySuccessPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PropertyEntrySuccessPopupComponent>,
    ) {}

  ngOnInit(): void {
  }


  closepopup(){
    this.dialogRef.close('close');

  }

}
