import { Component, OnInit } from '@angular/core';
import { Board } from '@src/app/modules/boards/models/board.model';
import { BoardsService } from '@src/app/modules/boards/services/boards-service/boards.service';
import { Profile } from '@src/app/shared/models/profile.model';
import { UserService } from '@src/app/shared/services/user-service/user.service';

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

  constructor(
    private readonly userService: UserService,
    private readonly boardsService: BoardsService
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getUserBoards();
  }

  public toggleOpen(): void {
    this.open = !this.open;
  }

  public changeBoard(boardId: string): void {
    this.boardsService.setActiveBoard(boardId);
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
