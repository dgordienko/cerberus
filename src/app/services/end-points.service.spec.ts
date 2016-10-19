/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EndPointsService } from './end-points.service';

describe('Service: EndPoints', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EndPointsService]
    });
  });

  it('should ...', inject([EndPointsService], (service: EndPointsService) => {
    expect(service).toBeTruthy();
  }));
});
