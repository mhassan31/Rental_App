import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReProfilePswrdResetComponent } from './re-profile-pswrd-reset.component';

describe('ReProfilePswrdResetComponent', () => {
  let component: ReProfilePswrdResetComponent;
  let fixture: ComponentFixture<ReProfilePswrdResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReProfilePswrdResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReProfilePswrdResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
