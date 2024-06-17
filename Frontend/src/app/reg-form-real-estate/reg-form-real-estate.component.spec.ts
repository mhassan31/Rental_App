import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegFormRealEstateComponent } from './reg-form-real-estate.component';

describe('RegFormRealEstateComponent', () => {
  let component: RegFormRealEstateComponent;
  let fixture: ComponentFixture<RegFormRealEstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegFormRealEstateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegFormRealEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
