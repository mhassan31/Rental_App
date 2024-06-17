import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyUploadSuccessfulPopupComponent } from './property-upload-successful-popup.component';

describe('PropertyUploadSuccessfulPopupComponent', () => {
  let component: PropertyUploadSuccessfulPopupComponent;
  let fixture: ComponentFixture<PropertyUploadSuccessfulPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyUploadSuccessfulPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyUploadSuccessfulPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
