import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-property-del-popup',
  templateUrl: './property-del-popup.component.html',
  styleUrls: ['./property-del-popup.component.css']
})
export class PropertyDelPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PropertyDelPopupComponent>,
    ) {}

  ngOnInit(): void {
  }

  closepopup(){
    this.dialogRef.close();
  }

  confirm_del(){
    this.dialogRef.close('Delete Confirm');
  }

}
