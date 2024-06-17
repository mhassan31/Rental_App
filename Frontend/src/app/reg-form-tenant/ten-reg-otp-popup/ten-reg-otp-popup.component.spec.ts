import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenRegOtpPopupComponent } from './ten-reg-otp-popup.component';

describe('TenRegOtpPopupComponent', () => {
  let component: TenRegOtpPopupComponent;
  let fixture: ComponentFixture<TenRegOtpPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenRegOtpPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenRegOtpPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
