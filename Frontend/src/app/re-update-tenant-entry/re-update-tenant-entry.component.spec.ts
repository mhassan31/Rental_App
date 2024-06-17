import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReUpdateTenantEntryComponent } from './re-update-tenant-entry.component';

describe('ReUpdateTenantEntryComponent', () => {
  let component: ReUpdateTenantEntryComponent;
  let fixture: ComponentFixture<ReUpdateTenantEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReUpdateTenantEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReUpdateTenantEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
