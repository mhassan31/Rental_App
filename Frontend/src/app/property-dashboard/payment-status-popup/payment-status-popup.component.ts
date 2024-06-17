import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-status-popup',
  templateUrl: './payment-status-popup.component.html',
  styleUrls: ['./payment-status-popup.component.css']
})
export class PaymentStatusPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PaymentStatusPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

  closepopup(){
    this.dialogRef.close();
  }

}
