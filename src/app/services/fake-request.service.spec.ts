import { TestBed } from '@angular/core/testing';

import { FakeRequestService } from './fake-request.service';

describe('FakeRequestService', () => {
  let service: FakeRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
