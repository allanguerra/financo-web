import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BoardsListService } from './boards-list.service';

describe('BoardsListService', () => {
  let service: BoardsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(BoardsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
