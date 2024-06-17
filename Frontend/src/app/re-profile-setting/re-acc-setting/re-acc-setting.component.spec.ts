import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReAccSettingComponent } from './re-acc-setting.component';

describe('ReAccSettingComponent', () => {
  let component: ReAccSettingComponent;
  let fixture: ComponentFixture<ReAccSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReAccSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReAccSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
