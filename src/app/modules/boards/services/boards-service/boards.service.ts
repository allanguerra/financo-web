import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Board } from '@src/app/modules/boards/models/board.model';
import { api } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  private activeBoard: string;

  public activeBoardChanges: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(
    private readonly http: HttpClient
  ) { }

  public getUserBoards(): Observable<Array<Board>> {
    return this.http.get<Array<Board>>(api.boards.getAll).pipe(
      map((boards: Array<Board>) => {
        if (!this.activeBoard) {
          this.activeBoard = boards[0]._id;
        }
        return boards;
      })
    );
  }

  public getActiveBoard(): string {
    return this.activeBoard;
  }

  public setActiveBoard(boardId: string): void {
    this.activeBoard = boardId;
    this.activeBoardChanges.next(this.activeBoard);
  }
}
