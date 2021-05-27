import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Board } from '@src/app/modules/boards/models/board.model';
import { BoardsService } from '@src/app/modules/boards/services/boards-service/boards.service';
import { MessagesService } from '@src/app/shared/services/messages-service/messages.service';
import { Messages } from '@src/app/utils/messages';
import { throwError } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-share-board',
  templateUrl: './share-board.component.html'
})
export class ShareBoardComponent implements OnInit {

  public isLoading: boolean = false;
  public isSubmiting: boolean = false;
  public title: string = 'Board';

  public modelForm: FormGroup;

  public board: Board;

  constructor(
    private readonly boardsService: BoardsService,
    private readonly messagesService: MessagesService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getBoard();
  }

  public submit(): void {
    this.isSubmiting = true;
    this.boardsService.shareBoard(this.board._id, this.modelForm.get('email').value)
      .pipe(
        finalize(() => this.isSubmiting = false)
      )
      .subscribe({
        next: () => {
          this.getBoard();
          this.messagesService.notify(Messages.SHARED_BOARD);
        }
    });
  }

  public remove(userId: string): void {
    return;
  }

  // PRIVATE METHODS

  private getBoard(): void {
    this.isLoading = true;
    this.route.paramMap.pipe(
      switchMap(params => this.boardsService.getBoard(params.get('boardId')))
    ).subscribe({
      next: (board: Board) => {
        this.board = board;
        this.isLoading = false;
      }
    });
  }

  private buildForm(): void {
    this.modelForm = this.fb.group({
      email: [null, [Validators.required]]
    });
  }

}
