import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantPropertyRegFormComponent } from './tenant-property-reg-form.component';

describe('TenantPropertyRegFormComponent', () => {
  let component: TenantPropertyRegFormComponent;
  let fixture: ComponentFixture<TenantPropertyRegFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantPropertyRegFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantPropertyRegFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
