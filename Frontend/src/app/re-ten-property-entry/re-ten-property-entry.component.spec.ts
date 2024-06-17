import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReTenPropertyEntryComponent } from './re-ten-property-entry.component';

describe('ReTenPropertyEntryComponent', () => {
  let component: ReTenPropertyEntryComponent;
  let fixture: ComponentFixture<ReTenPropertyEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReTenPropertyEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReTenPropertyEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
