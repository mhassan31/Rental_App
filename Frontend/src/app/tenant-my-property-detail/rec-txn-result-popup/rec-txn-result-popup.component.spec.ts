import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecTxnResultPopupComponent } from './rec-txn-result-popup.component';

describe('RecTxnResultPopupComponent', () => {
  let component: RecTxnResultPopupComponent;
  let fixture: ComponentFixture<RecTxnResultPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecTxnResultPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecTxnResultPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
