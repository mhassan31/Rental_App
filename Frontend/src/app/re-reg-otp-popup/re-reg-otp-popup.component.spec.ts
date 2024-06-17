import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReRegOtpPopupComponent } from './re-reg-otp-popup.component';

describe('ReRegOtpPopupComponent', () => {
  let component: ReRegOtpPopupComponent;
  let fixture: ComponentFixture<ReRegOtpPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReRegOtpPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReRegOtpPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
