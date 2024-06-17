import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantPaymentStatusComponent } from './tenant-payment-status.component';

describe('TenantPaymentStatusComponent', () => {
  let component: TenantPaymentStatusComponent;
  let fixture: ComponentFixture<TenantPaymentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantPaymentStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantPaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
