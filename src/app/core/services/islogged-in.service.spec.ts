import { TestBed } from '@angular/core/testing';

import { IsloggedInService } from './islogged-in.service';

describe('IsloggedInService', () => {
  let service: IsloggedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsloggedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
