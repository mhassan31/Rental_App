import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantProfileUpdateComponent } from './tenant-profile-update.component';

describe('TenantProfileUpdateComponent', () => {
  let component: TenantProfileUpdateComponent;
  let fixture: ComponentFixture<TenantProfileUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantProfileUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
