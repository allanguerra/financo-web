import { Component, Injector, OnInit } from '@angular/core';
import { Board } from '@src/app/modules/boards/models/board.model';
import { BoardsListService } from '@src/app/modules/boards/services/boards-list-service/boards-list.service';
import { BoardsService } from '@src/app/modules/boards/services/boards-service/boards.service';
import { BaseListComponent } from '@src/app/shared/base-components/base-list/base-list.component';
import { ConfirmModalComponent } from '@src/app/shared/components/confirm-modal/confirm-modal.component';
import { Messages } from '@src/app/utils/messages';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html'
})
export class BoardsListComponent extends BaseListComponent<Board> implements OnInit {

  constructor(
    private readonly boardsService: BoardsService,
    readonly injector: Injector,
    readonly boardsListService: BoardsListService,
  ) {
    super(injector, boardsListService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public remove(resource: Board): void {
    const confirmModal: ConfirmModalComponent = this.modalService.openModal(ConfirmModalComponent);
    confirmModal.confirmType = 'board';
    confirmModal.resourceTitle = resource.title;

    confirmModal.confirm.subscribe((confirm: boolean) => {
      if (confirm) {
        this.destroyResource(resource._id);
      }
    });
  }

  public unshare(boardId: string, userId: string): void {
    if (!this.isSubmiting) {
      this.isSubmiting = true;
      this.boardsService.unshareBoard(boardId, userId)
        .pipe(
          finalize(() => this.isSubmiting = false)
        )
        .subscribe({
          next: () => {
            this.getModels();
            this.messagesService.notify(Messages.UNSHARED_BOARD);
          }
        });
    }
  }

}
