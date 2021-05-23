import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Board } from '@src/app/modules/boards/models/board.model';
import { api } from '@env/environment';
import { SESSION } from '@src/app/utils/consts';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  public activeBoardChanges: EventEmitter<string> = new EventEmitter();

  constructor(
    private readonly http: HttpClient
  ) { }

  public getUserBoards(): Observable<Array<Board>> {
    return this.http.get<Array<Board>>(api.boards.getAll).pipe(
      map((boards: Array<Board>) => {
        if (!this.getActiveBoard()) {
          this.setActiveBoard(boards[0]._id);
        }
        return boards;
      })
    );
  }

  public getActiveBoard(): string {
    return sessionStorage.getItem(SESSION.ACTIVE_BOARD);
  }

  public setActiveBoard(boardId: string): void {
    const activeBoard = this.getActiveBoard();

    sessionStorage.setItem(SESSION.ACTIVE_BOARD, boardId);

    if (activeBoard && activeBoard !== boardId) {
      this.activeBoardChanges.emit(boardId);
    }
  }
}
