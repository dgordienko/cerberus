/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CurrentUsersServiceService } from './current-users-service.service';

describe('Service: CurrentUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentUsersServiceService]
    });
  });

  it('should ...', inject([CurrentUsersServiceService], (service: CurrentUsersServiceService) => {
    expect(service).toBeTruthy();
  }));
});
