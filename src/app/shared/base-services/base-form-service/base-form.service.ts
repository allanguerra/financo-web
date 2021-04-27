import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { BoardsService } from '@src/app/modules/boards/services/boards-service/boards.service';
import { BaseModel } from '@src/app/shared/models/base.model';
import { Messages } from '@src/app/utils/messages';
import { map } from 'rxjs/operators';

export abstract class BaseFormService<T extends BaseModel> {

  protected http: HttpClient;
  protected boardsService: BoardsService;

  constructor(
    protected readonly apiPath: string,
    protected readonly injector: Injector,
    protected readonly dataToModelFn: (data: any) => T
  ) {
    this.http = injector.get(HttpClient);
    this.boardsService = injector.get(BoardsService);
  }

  public getById(id: string): Observable<T> {
    const boardId = this.boardsService.getActiveBoard();
    if (!boardId) {
      return throwError(Messages.ACTIVE_BOARD_NOT_FOUND);
    }
    return this.http.get<T>(`${this.apiPath.replace(':boardId', boardId)}/${id}`)
      .pipe(
        map(this.dataToModel.bind(this))
      );
  }

  public store(resource: T): Observable<void> {
    const boardId = this.boardsService.getActiveBoard();
    if (!boardId) {
      return throwError(Messages.ACTIVE_BOARD_NOT_FOUND);
    }
    return this.http.post<void>(`${this.apiPath.replace(':boardId', boardId)}`, resource);
  }

  public update(id: string, resource: T): Observable<void> {
    const boardId = this.boardsService.getActiveBoard();
    if (!boardId) {
      return throwError(Messages.ACTIVE_BOARD_NOT_FOUND);
    }
    return this.http.put<void>(`${this.apiPath.replace(':boardId', boardId)}/${id}`, resource);
  }

  // PROTECTED METHODS

  protected dataToModel(data: any): T {
    return this.dataToModelFn(data);
  }

  protected dataToModelArray(data: Array<any>): Array<T> {
    const modelArray: Array<T> = [];
    data.forEach((dataItem: any) => modelArray.push(this.dataToModel(dataItem)));

    return modelArray;
  }
}
