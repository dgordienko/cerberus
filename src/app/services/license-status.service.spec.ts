/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LicenseStatusService } from './license-status.service';

describe('Service: LicenseStatus', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LicenseStatusService]
    });
  });

  it('should ...', inject([LicenseStatusService], (service: LicenseStatusService) => {
    expect(service).toBeTruthy();
  }));
});
