import { Component, Injector, OnInit } from '@angular/core';
import { Board } from '@src/app/modules/boards/models/board.model';
import { BoardsListService } from '@src/app/modules/boards/services/boards-list-service/boards-list.service';
import { BaseListComponent } from '@src/app/shared/base-components/base-list/base-list.component';
import { ConfirmModalComponent } from '@src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html'
})
export class BoardsListComponent extends BaseListComponent<Board> implements OnInit {

  constructor(
    protected readonly injector: Injector,
    readonly boardsService: BoardsListService,
  ) {
    super(injector, boardsService);
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

}
