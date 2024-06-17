import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantRegInSubpropertyComponent } from './tenant-reg-in-subproperty.component';

describe('TenantRegInSubpropertyComponent', () => {
  let component: TenantRegInSubpropertyComponent;
  let fixture: ComponentFixture<TenantRegInSubpropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantRegInSubpropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantRegInSubpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
