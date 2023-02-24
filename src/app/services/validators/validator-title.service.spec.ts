import { TestBed } from '@angular/core/testing';

import { ValidatorTitleService } from './validator-title.service';

describe('ValidatorTitleService', () => {
  let service: ValidatorTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
