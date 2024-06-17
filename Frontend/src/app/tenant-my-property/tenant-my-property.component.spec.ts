import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantMyPropertyComponent } from './tenant-my-property.component';

describe('TenantMyPropertyComponent', () => {
  let component: TenantMyPropertyComponent;
  let fixture: ComponentFixture<TenantMyPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantMyPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantMyPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
