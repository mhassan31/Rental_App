import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantMyPropertyDetailComponent } from './tenant-my-property-detail.component';

describe('TenantMyPropertyDetailComponent', () => {
  let component: TenantMyPropertyDetailComponent;
  let fixture: ComponentFixture<TenantMyPropertyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantMyPropertyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantMyPropertyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
