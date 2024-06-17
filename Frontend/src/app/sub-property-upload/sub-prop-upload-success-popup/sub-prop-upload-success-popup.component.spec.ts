import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPropUploadSuccessPopupComponent } from './sub-prop-upload-success-popup.component';

describe('SubPropUploadSuccessPopupComponent', () => {
  let component: SubPropUploadSuccessPopupComponent;
  let fixture: ComponentFixture<SubPropUploadSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubPropUploadSuccessPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubPropUploadSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
