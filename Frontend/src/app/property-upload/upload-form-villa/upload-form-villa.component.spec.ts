import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFormVillaComponent } from './upload-form-villa.component';

describe('UploadFormVillaComponent', () => {
  let component: UploadFormVillaComponent;
  let fixture: ComponentFixture<UploadFormVillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFormVillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFormVillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
