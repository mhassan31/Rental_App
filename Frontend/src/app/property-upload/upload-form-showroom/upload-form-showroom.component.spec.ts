import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFormShowroomComponent } from './upload-form-showroom.component';

describe('UploadFormShowroomComponent', () => {
  let component: UploadFormShowroomComponent;
  let fixture: ComponentFixture<UploadFormShowroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFormShowroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFormShowroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
