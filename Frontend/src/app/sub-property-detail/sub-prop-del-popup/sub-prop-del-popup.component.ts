import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sub-prop-del-popup',
  templateUrl: './sub-prop-del-popup.component.html',
  styleUrls: ['./sub-prop-del-popup.component.css']
})
export class SubPropDelPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SubPropDelPopupComponent>,
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
