import { Injectable, Injector } from '@angular/core';
import { api } from '@env/environment';
import { Board } from '@src/app/modules/boards/models/board.model';
import { BaseFormService } from '@src/app/shared/base-services/base-form-service/base-form.service';

@Injectable({
  providedIn: 'root'
})
export class BoardsFormService extends BaseFormService<Board> {

  constructor(readonly injector: Injector) {
    super(
      api.boards.base,
      injector,
      Board.fromData
    );
  }
}
