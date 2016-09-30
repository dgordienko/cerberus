/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsersHistoryServiceService } from './users-history-service.service';

describe('Service: UsersHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersHistoryServiceService]
    });
  });

  it('should ...', inject([UsersHistoryServiceService], (service: UsersHistoryServiceService) => {
    expect(service).toBeTruthy();
  }));
});
