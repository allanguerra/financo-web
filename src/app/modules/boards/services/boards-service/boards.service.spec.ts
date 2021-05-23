import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Board } from '@src/app/modules/boards/models/board.model';

import { BoardsService } from './boards.service';

describe('BoardsService', () => {
  let service: BoardsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    service = TestBed.inject(BoardsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return active board id', (done) => {
    service.getUserBoards().subscribe({
      next: () => {
        const activeBoardId = service.getActiveBoard();

        expect(activeBoardId).toBeTruthy();
        expect(activeBoardId).toEqual('any_id');
        done();
      },
      error: () => done.fail()
    });

    httpMock.expectOne('http://localhost:3000/v1/boards')
      .flush([{
        _id: 'any_id',
        title: 'any_title',
        description: 'any_description',
        owner: 'any_owner',
        shredUser: []
      }], { status: 200, statusText: 'ok' });
  });

  it('should return user s boards', (done) => {
    service.getUserBoards().subscribe({
      next: (boards: Array<Board>) => {
        expect(boards).toBeTruthy();
        expect(boards.length).toBe(1);
        expect(boards[0]._id).toEqual('any_id');
        expect(boards[0].title).toEqual('any_title');
        expect(boards[0].description).toEqual('any_description');
        expect(boards[0].owner).toEqual('any_owner');
        done();
      },
      error: () => done.fail()
    });

    httpMock.expectOne('http://localhost:3000/v1/boards')
      .flush([{
        _id: 'any_id',
        title: 'any_title',
        description: 'any_description',
        owner: 'any_owner',
        sharedUsers: []
      }], { status: 200, statusText: 'ok' });
  });

  it('should notify observers when change the active board', (done) => {
    const activeBoard = 'new_active_board_id';

    service.activeBoardChanges.subscribe({
      next: (boardId: string) => {
        expect(boardId).toBeTruthy();
        expect(boardId).toEqual('new_active_board_id');
        done();
      },
      error: () => done.fail()
    });

    service.setActiveBoard(activeBoard);
  });
});
