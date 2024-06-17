import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantDetailDashboardComponent } from './tenant-detail-dashboard.component';

describe('TenantDetailDashboardComponent', () => {
  let component: TenantDetailDashboardComponent;
  let fixture: ComponentFixture<TenantDetailDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantDetailDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantDetailDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
