import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from '@src/app/modules/boards/models/board.model';
import { BoardsService } from '@src/app/modules/boards/services/boards-service/boards.service';
import { Profile } from '@src/app/shared/models/profile.model';
import { UserService } from '@src/app/shared/services/user-service/user.service';
import { SESSION } from '@src/app/utils/consts';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public readonly userAvatar: string = '../../../../assets/img/user-solid.svg';

  public profile: Profile;
  public boards: Array<Board>;

  public open: boolean = false;

  public activeBoardId: string = '';

  constructor(
    private readonly userService: UserService,
    private readonly boardsService: BoardsService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.activeBoardId = this.boardsService.getActiveBoard();
    this.getUserProfile();
    this.getUserBoards();
  }

  public toggleOpen(): void {
    this.open = !this.open;
  }

  public changeBoard(boardId: string): void {
    this.boardsService.setActiveBoard(boardId);
    this.toggleOpen();
  }

  public shareBoard(): void {
    const activeBoard = sessionStorage.getItem(SESSION.ACTIVE_BOARD);
    this.router.navigate(['/home/boards/share', activeBoard]);
  }

  public logout(): void {
    this.userService.logout();
  }

  // PRIVATE METHODS

  private getUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (profile: Profile) => {
        this.profile = profile;
      }
    });
  }

  private getUserBoards(): void {
    this.boardsService.getUserBoards().subscribe({
      next: (boards: Array<Board>) => {
        this.boards = boards;
      }
    });
  }

}
