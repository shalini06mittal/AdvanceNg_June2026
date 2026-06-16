import { TestBed } from '@angular/core/testing';

import { COunterService } from './counter.service';

describe('COunterService', () => {
  let service: COunterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(COunterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
