import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantRegInPropertyComponent } from './tenant-reg-in-property.component';

describe('TenantRegInPropertyComponent', () => {
  let component: TenantRegInPropertyComponent;
  let fixture: ComponentFixture<TenantRegInPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantRegInPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantRegInPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
