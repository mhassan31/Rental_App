import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenProfileUpdateConfirmPopupComponent } from './ten-profile-update-confirm-popup.component';

describe('TenProfileUpdateConfirmPopupComponent', () => {
  let component: TenProfileUpdateConfirmPopupComponent;
  let fixture: ComponentFixture<TenProfileUpdateConfirmPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenProfileUpdateConfirmPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenProfileUpdateConfirmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
