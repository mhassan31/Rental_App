import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSavePermissionPopupComponent } from './card-save-permission-popup.component';

describe('CardSavePermissionPopupComponent', () => {
  let component: CardSavePermissionPopupComponent;
  let fixture: ComponentFixture<CardSavePermissionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSavePermissionPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSavePermissionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
