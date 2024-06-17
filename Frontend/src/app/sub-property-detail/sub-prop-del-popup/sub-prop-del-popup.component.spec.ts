import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPropDelPopupComponent } from './sub-prop-del-popup.component';

describe('SubPropDelPopupComponent', () => {
  let component: SubPropDelPopupComponent;
  let fixture: ComponentFixture<SubPropDelPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubPropDelPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubPropDelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
