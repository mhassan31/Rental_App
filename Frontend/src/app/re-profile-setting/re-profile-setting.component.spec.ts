import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReProfileSettingComponent } from './re-profile-setting.component';

describe('ReProfileSettingComponent', () => {
  let component: ReProfileSettingComponent;
  let fixture: ComponentFixture<ReProfileSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReProfileSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReProfileSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
