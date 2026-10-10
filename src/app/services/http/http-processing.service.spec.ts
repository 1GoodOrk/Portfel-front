import { TestBed } from '@angular/core/testing';

import { HttpProcessingService } from './http-processing.service';

describe('HttpProcessingService', () => {
  let service: HttpProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
