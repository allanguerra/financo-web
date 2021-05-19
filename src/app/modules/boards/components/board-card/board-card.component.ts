import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Board } from '@src/app/modules/boards/models/board.model';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html'
})
export class BoardCardComponent {

  @Input('board')
  public board: Board;

  @Output()
  public remove: EventEmitter<Board> = new EventEmitter<Board>();

  public showMenu: boolean = false;

  constructor() { }

  public toggleShowMenu(): void {
    this.showMenu = !this.showMenu;
  }

  public removeBoard(): void {
    this.remove.emit(this.board);
  }

  public unshare(sharedUser: string): void {
    return;
  }

}
