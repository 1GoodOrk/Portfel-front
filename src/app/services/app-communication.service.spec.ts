import { TestBed } from '@angular/core/testing';

import { AppCommunicationService } from './app-communication.service';

describe('AppCommunicationService', () => {
  let service: AppCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
