import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Board } from '@src/app/modules/boards/models/board.model';
import { api } from '@env/environment';
import { SESSION } from '@src/app/utils/consts';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  public activeBoardChanges: BehaviorSubject<string> = new BehaviorSubject(null);

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
    sessionStorage.setItem(SESSION.ACTIVE_BOARD, boardId);
    this.activeBoardChanges.next(boardId);
  }
}
