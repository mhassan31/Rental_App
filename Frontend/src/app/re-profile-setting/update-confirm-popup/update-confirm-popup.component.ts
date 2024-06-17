import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-update-confirm-popup',
  templateUrl: './update-confirm-popup.component.html',
  styleUrls: ['./update-confirm-popup.component.css']
})
export class UpdateConfirmPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateConfirmPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router : Router) {}

  ngOnInit(): void {
  }

  closepopup(){
    this.dialogRef.close();

    

  }

}
