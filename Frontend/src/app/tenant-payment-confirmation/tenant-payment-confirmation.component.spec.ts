import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantPaymentConfirmationComponent } from './tenant-payment-confirmation.component';

describe('TenantPaymentConfirmationComponent', () => {
  let component: TenantPaymentConfirmationComponent;
  let fixture: ComponentFixture<TenantPaymentConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantPaymentConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantPaymentConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
