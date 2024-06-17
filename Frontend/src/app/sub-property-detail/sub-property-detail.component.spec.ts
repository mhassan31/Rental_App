import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPropertyDetailComponent } from './sub-property-detail.component';

describe('SubPropertyDetailComponent', () => {
  let component: SubPropertyDetailComponent;
  let fixture: ComponentFixture<SubPropertyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubPropertyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubPropertyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
