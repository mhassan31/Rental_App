import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSuccessPopupComponent } from './update-success-popup.component';

describe('UpdateSuccessPopupComponent', () => {
  let component: UpdateSuccessPopupComponent;
  let fixture: ComponentFixture<UpdateSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSuccessPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
