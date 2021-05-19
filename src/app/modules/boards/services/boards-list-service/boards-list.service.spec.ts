import { TestBed } from '@angular/core/testing';

import { BoardsListService } from './boards-list.service';

describe('BoardsListService', () => {
  let service: BoardsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
