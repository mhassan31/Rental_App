import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFormOfficeComponent } from './upload-form-office.component';

describe('UploadFormOfficeComponent', () => {
  let component: UploadFormOfficeComponent;
  let fixture: ComponentFixture<UploadFormOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFormOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFormOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
