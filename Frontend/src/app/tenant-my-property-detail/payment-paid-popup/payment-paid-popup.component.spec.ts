import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPaidPopupComponent } from './payment-paid-popup.component';

describe('PaymentPaidPopupComponent', () => {
  let component: PaymentPaidPopupComponent;
  let fixture: ComponentFixture<PaymentPaidPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPaidPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPaidPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
