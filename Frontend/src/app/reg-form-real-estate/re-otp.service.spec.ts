import { TestBed } from '@angular/core/testing';

import { ReOtpService } from './re-otp.service';

describe('ReOtpService', () => {
  let service: ReOtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReOtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
