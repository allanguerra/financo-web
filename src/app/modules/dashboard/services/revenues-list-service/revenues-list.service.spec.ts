import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RevenuesListService } from './revenues-list.service';

describe('RevenuesListService', () => {
  let service: RevenuesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(RevenuesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
