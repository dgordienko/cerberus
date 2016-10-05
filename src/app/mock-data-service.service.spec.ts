/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockDataServiceService } from './mock-data-service.service';

describe('Service: MockDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockDataServiceService]
    });
  });

  it('should ...', inject([MockDataServiceService], (service: MockDataServiceService) => {
    expect(service).toBeTruthy();
  }));
});
