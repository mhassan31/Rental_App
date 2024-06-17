import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFormVillaUnitComponent } from './upload-form-villa-unit.component';

describe('UploadFormVillaUnitComponent', () => {
  let component: UploadFormVillaUnitComponent;
  let fixture: ComponentFixture<UploadFormVillaUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFormVillaUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFormVillaUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
