import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyOccupiedPopupComponent } from './property-occupied-popup.component';

describe('PropertyOccupiedPopupComponent', () => {
  let component: PropertyOccupiedPopupComponent;
  let fixture: ComponentFixture<PropertyOccupiedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyOccupiedPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyOccupiedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
