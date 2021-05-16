import { HttpClient, HttpParams } from '@angular/common/http';
import { Injector } from '@angular/core';
import { BoardsService } from '@src/app/modules/boards/services/boards-service/boards.service';
import { BaseModel } from '@src/app/shared/models/base.model';
import { Messages } from '@src/app/utils/messages';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class BaseListService<T extends BaseModel> {

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

  public getAll(urlParams?: Record<string, string>): Observable<Array<T>> {
    const boardId = this.boardsService.getActiveBoard();
    if (!boardId) {
      return throwError(Messages.ACTIVE_BOARD_NOT_FOUND);
    }

    const params = new HttpParams(urlParams);

    return this.http.get<Array<T>>(`${this.apiPath.replace(':boardId', boardId)}`, { params })
      .pipe(
        map(this.dataToModelArray.bind(this))
      );
  }

  public destroy(id: string): Observable<void> {
    const boardId = this.boardsService.getActiveBoard();
    if (!boardId) {
      return throwError(Messages.ACTIVE_BOARD_NOT_FOUND);
    }
    return this.http.delete<void>(`${this.apiPath.replace(':boardId', boardId)}/${id}`);
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
