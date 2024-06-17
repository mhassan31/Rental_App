import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReTenantDetailsComponent } from './re-tenant-details.component';

describe('ReTenantDetailsComponent', () => {
  let component: ReTenantDetailsComponent;
  let fixture: ComponentFixture<ReTenantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReTenantDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReTenantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
