import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Board } from '@src/app/modules/boards/models/board.model';
import { BoardsFormService } from '@src/app/modules/boards/services/boards-form-service/boards-form.service';
import { BaseFormComponent } from '@src/app/shared/base-components/base-form/base-form.component';
import { MASK } from '@src/app/utils/consts';

@Component({
  selector: 'app-boards-form',
  templateUrl: './boards-form.component.html'
})
export class BoardsFormComponent extends BaseFormComponent<Board> {

  public readonly expirationDayMask = MASK.EXPIRATION_DAY;

  constructor(
    readonly injector: Injector,
    readonly boardsFormService: BoardsFormService
  ) {
    super(
      injector,
      boardsFormService,
      Board.fromData
    );
  }

  // PROTECTED METHODS

  protected buildModelForm(): void {
    this.modelForm = this.fb.group({
      _id: [null],
      title: [null, [Validators.required]],
      description: [null],
      expirationDay: [null, [Validators.required, Validators.min(1), Validators.max(28)]],
      sharedUsers: [[]],
      owner: [null]
    });
  }

}
