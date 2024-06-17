import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarPopupComponent } from './progress-bar-popup.component';

describe('ProgressBarPopupComponent', () => {
  let component: ProgressBarPopupComponent;
  let fixture: ComponentFixture<ProgressBarPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressBarPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
