import { Component, OnInit, Inject, } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rec-txn-result-popup',
  templateUrl: './rec-txn-result-popup.component.html',
  styleUrls: ['./rec-txn-result-popup.component.css']
})
export class RecTxnResultPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RecTxnResultPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

  closepopup(){
    this.dialogRef.close();
  }

}
