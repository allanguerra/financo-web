import { Injectable, Injector } from '@angular/core';
import { api } from '@env/environment';
import { Board } from '@src/app/modules/boards/models/board.model';
import { BaseListService } from '@src/app/shared/base-services/base-list-service/base-list.service';

@Injectable({
  providedIn: 'root'
})
export class BoardsListService extends BaseListService<Board> {

  constructor(
    protected readonly injector: Injector
  ) {
    super(
      api.boards.base,
      injector,
      Board.fromData
    );
  }
}
