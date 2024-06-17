import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCredSetPopupComponent } from './pay-cred-set-popup.component';

describe('PayCredSetPopupComponent', () => {
  let component: PayCredSetPopupComponent;
  let fixture: ComponentFixture<PayCredSetPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayCredSetPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayCredSetPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
