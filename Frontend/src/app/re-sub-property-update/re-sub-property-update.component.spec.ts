import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReSubPropertyUpdateComponent } from './re-sub-property-update.component';

describe('ReSubPropertyUpdateComponent', () => {
  let component: ReSubPropertyUpdateComponent;
  let fixture: ComponentFixture<ReSubPropertyUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReSubPropertyUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReSubPropertyUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
