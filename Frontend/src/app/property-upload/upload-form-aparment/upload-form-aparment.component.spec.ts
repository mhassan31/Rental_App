import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFormAparmentComponent } from './upload-form-aparment.component';

describe('UploadFormAparmentComponent', () => {
  let component: UploadFormAparmentComponent;
  let fixture: ComponentFixture<UploadFormAparmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFormAparmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFormAparmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
