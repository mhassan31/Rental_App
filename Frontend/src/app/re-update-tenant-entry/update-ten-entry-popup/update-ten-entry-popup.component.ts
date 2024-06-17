import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-ten-entry-popup',
  templateUrl: './update-ten-entry-popup.component.html',
  styleUrls: ['./update-ten-entry-popup.component.css']
})
export class UpdateTenEntryPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateTenEntryPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

  closepopup(){

    this.dialogRef.close();

  }

}
