import { TestBed } from '@angular/core/testing';

import { FragebogenService } from './fragebogen.service';

describe('FragebogenService', () => {
  let service: FragebogenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FragebogenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
