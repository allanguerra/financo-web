import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CategoriesListService } from '@src/app/modules/categories/services/categories-list-service/categories-list.service';

describe('CategoriesListService', () => {
  let service: CategoriesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CategoriesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
