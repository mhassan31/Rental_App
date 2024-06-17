import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyUploadPopupComponent } from './property-upload-popup.component';

describe('PropertyUploadPopupComponent', () => {
  let component: PropertyUploadPopupComponent;
  let fixture: ComponentFixture<PropertyUploadPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyUploadPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyUploadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
