import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTenEntryPopupComponent } from './update-ten-entry-popup.component';

describe('UpdateTenEntryPopupComponent', () => {
  let component: UpdateTenEntryPopupComponent;
  let fixture: ComponentFixture<UpdateTenEntryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTenEntryPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTenEntryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
