import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RePaymentSettingsComponent } from './re-payment-settings.component';

describe('RePaymentSettingsComponent', () => {
  let component: RePaymentSettingsComponent;
  let fixture: ComponentFixture<RePaymentSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RePaymentSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RePaymentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
