import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { BoardsService } from '@src/app/modules/boards/services/boards-service/boards.service';
import { BaseModel } from '@src/app/shared/models/base.model';
import { Messages } from '@src/app/utils/messages';
import { Observable, throwError } from 'rxjs';

export abstract class BaseModelService<T extends BaseModel> {

  protected http: HttpClient;
  protected boardsService: BoardsService;

  constructor(
    protected readonly apiPath: string,
    protected readonly injector: Injector,
  ) {
    this.http = injector.get(HttpClient);
    this.boardsService = injector.get(BoardsService);
  }

  public getAll(): Observable<Array<T>> {
    const boardId = this.boardsService.getActiveBoard();
    if (!boardId) {
      return throwError(Messages.ACTIVE_BOARD_NOT_FOUND);
    }
    return this.http.get<Array<T>>(`${this.apiPath.replace(':boardId', boardId)}`);
  }
}
