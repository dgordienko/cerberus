/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CurrentLicenseServiceService } from './current-license-service.service';

describe('Service: CurrentLicenseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentLicenseServiceService]
    });
  });

  it('should ...', inject([CurrentLicenseServiceService], (service: CurrentLicenseServiceService) => {
    expect(service).toBeTruthy();
  }));
});
