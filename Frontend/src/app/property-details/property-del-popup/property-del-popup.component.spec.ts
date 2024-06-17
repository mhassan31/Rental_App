import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDelPopupComponent } from './property-del-popup.component';

describe('PropertyDelPopupComponent', () => {
  let component: PropertyDelPopupComponent;
  let fixture: ComponentFixture<PropertyDelPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyDelPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
