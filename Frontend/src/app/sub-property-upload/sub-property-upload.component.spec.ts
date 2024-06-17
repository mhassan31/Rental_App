import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPropertyUploadComponent } from './sub-property-upload.component';

describe('SubPropertyUploadComponent', () => {
  let component: SubPropertyUploadComponent;
  let fixture: ComponentFixture<SubPropertyUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubPropertyUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubPropertyUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
