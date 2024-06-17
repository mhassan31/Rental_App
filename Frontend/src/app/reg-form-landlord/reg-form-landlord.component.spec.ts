import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegFormLandlordComponent } from './reg-form-landlord.component';

describe('RegFormLandlordComponent', () => {
  let component: RegFormLandlordComponent;
  let fixture: ComponentFixture<RegFormLandlordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegFormLandlordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegFormLandlordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
