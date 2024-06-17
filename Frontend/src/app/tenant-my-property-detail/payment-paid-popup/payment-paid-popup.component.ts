import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-paid-popup',
  templateUrl: './payment-paid-popup.component.html',
  styleUrls: ['./payment-paid-popup.component.css']
})
export class PaymentPaidPopupComponent implements OnInit {

  constructor(private dialog : MatDialog) { }

  ngOnInit(): void {
  }

  closepopup(){
    this.dialog.closeAll();
  }

}
