import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BoardsFormService } from './boards-form.service';

describe('BoardsFormService', () => {
  let service: BoardsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(BoardsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
