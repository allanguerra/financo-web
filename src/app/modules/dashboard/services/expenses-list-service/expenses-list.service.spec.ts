import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ExpensesListService } from './expenses-list.service';

describe('ExpensesListService', () => {
  let service: ExpensesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ExpensesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
