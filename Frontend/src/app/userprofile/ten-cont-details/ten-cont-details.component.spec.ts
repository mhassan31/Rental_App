import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenContDetailsComponent } from './ten-cont-details.component';

describe('TenContDetailsComponent', () => {
  let component: TenContDetailsComponent;
  let fixture: ComponentFixture<TenContDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenContDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenContDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
