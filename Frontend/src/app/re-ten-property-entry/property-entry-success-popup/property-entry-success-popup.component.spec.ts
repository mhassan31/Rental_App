import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyEntrySuccessPopupComponent } from './property-entry-success-popup.component';

describe('PropertyEntrySuccessPopupComponent', () => {
  let component: PropertyEntrySuccessPopupComponent;
  let fixture: ComponentFixture<PropertyEntrySuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyEntrySuccessPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyEntrySuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
