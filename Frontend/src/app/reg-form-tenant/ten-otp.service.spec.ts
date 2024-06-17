import { TestBed } from '@angular/core/testing';

import { TenOtpService } from './ten-otp.service';

describe('TenOtpService', () => {
  let service: TenOtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenOtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
