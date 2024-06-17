import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-property-occupied-popup',
  templateUrl: './property-occupied-popup.component.html',
  styleUrls: ['./property-occupied-popup.component.css']
})
export class PropertyOccupiedPopupComponent implements OnInit {

  constructor(private dialog : MatDialog) { }

  ngOnInit(): void {
  }

  closepopup(){
    this.dialog.closeAll();
  }

}
