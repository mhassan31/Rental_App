import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPropUploadPopupComponent } from './sub-prop-upload-popup.component';

describe('SubPropUploadPopupComponent', () => {
  let component: SubPropUploadPopupComponent;
  let fixture: ComponentFixture<SubPropUploadPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubPropUploadPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubPropUploadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
