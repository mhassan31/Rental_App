import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContRenewelFormComponent } from './cont-renewel-form.component';

describe('ContRenewelFormComponent', () => {
  let component: ContRenewelFormComponent;
  let fixture: ComponentFixture<ContRenewelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContRenewelFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContRenewelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
