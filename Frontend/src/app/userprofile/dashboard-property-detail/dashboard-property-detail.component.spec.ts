import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPropertyDetailComponent } from './dashboard-property-detail.component';

describe('DashboardPropertyDetailComponent', () => {
  let component: DashboardPropertyDetailComponent;
  let fixture: ComponentFixture<DashboardPropertyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPropertyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPropertyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
