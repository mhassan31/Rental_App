import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegFormTenantComponent } from './reg-form-tenant.component';

describe('RegFormTenantComponent', () => {
  let component: RegFormTenantComponent;
  let fixture: ComponentFixture<RegFormTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegFormTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegFormTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
