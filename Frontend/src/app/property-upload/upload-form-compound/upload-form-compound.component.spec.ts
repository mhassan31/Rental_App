import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFormCompoundComponent } from './upload-form-compound.component';

describe('UploadFormCompoundComponent', () => {
  let component: UploadFormCompoundComponent;
  let fixture: ComponentFixture<UploadFormCompoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFormCompoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFormCompoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
