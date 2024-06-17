import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-success-popup',
  templateUrl: './update-success-popup.component.html',
  styleUrls: ['./update-success-popup.component.css']
})
export class UpdateSuccessPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateSuccessPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

  closepopup(){
    this.dialogRef.close();
  }

}
