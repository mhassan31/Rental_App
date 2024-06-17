import { ComponentFixture, TestBed } from '@angular/core/testing';

import { REUpdatePropertyDetailComponent } from './re-update-property-detail.component';

describe('REUpdatePropertyDetailComponent', () => {
  let component: REUpdatePropertyDetailComponent;
  let fixture: ComponentFixture<REUpdatePropertyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ REUpdatePropertyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(REUpdatePropertyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
