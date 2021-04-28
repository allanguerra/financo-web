import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BoardsService } from '@src/app/modules/boards/services/boards-service/boards.service';

import { CategoriesFormService } from './categories-form.service';

describe('CategoriesFormService', () => {
  let service: CategoriesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoardsService]
    });
    service = TestBed.inject(CategoriesFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
