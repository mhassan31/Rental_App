import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSubPropertiesComponent } from './dashboard-sub-properties.component';

describe('DashboardSubPropertiesComponent', () => {
  let component: DashboardSubPropertiesComponent;
  let fixture: ComponentFixture<DashboardSubPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSubPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSubPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
