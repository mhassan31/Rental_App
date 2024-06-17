import { TestBed } from '@angular/core/testing';

import { DefaultProfileDisplayService } from './default-profile-display.service';

describe('DefaultProfileDisplayService', () => {
  let service: DefaultProfileDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultProfileDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
