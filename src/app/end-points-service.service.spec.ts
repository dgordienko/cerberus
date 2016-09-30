/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EndPointsServiceService } from './end-points-service.service';

describe('Service: EndPointsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EndPointsServiceService]
    });
  });

  it('should ...', inject([EndPointsServiceService], (service: EndPointsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
