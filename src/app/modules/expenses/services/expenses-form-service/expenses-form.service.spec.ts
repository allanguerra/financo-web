import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ExpensesFormService } from './expenses-form.service';

describe('ExpensesFormService', () => {
  let service: ExpensesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ExpensesFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
