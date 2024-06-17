import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-ten-profile-update-confirm-popup',
  templateUrl: './ten-profile-update-confirm-popup.component.html',
  styleUrls: ['./ten-profile-update-confirm-popup.component.css']
})
export class TenProfileUpdateConfirmPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TenProfileUpdateConfirmPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router : Router) {}

  ngOnInit(): void {
  }

  closepopup(){
    this.dialogRef.close();
  }

}
