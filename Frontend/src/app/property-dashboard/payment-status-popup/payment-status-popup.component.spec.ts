import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusPopupComponent } from './payment-status-popup.component';

describe('PaymentStatusPopupComponent', () => {
  let component: PaymentStatusPopupComponent;
  let fixture: ComponentFixture<PaymentStatusPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentStatusPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStatusPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
