import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ShareBoardComponent } from '@src/app/modules/boards/components/share-board/share-board.component';
import { Board } from '@src/app/modules/boards/models/board.model';
import { BoardsService } from '@src/app/modules/boards/services/boards-service/boards.service';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { InputComponent } from '@src/app/shared/components/input/input.component';
import { LoadderComponent } from '@src/app/shared/components/loadder/loadder.component';
import { MessagesService } from '@src/app/shared/services/messages-service/messages.service';
import { of } from 'rxjs';


describe('ShareBoardComponent', () => {
  let component: ShareBoardComponent;
  let fixture: ComponentFixture<ShareBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        BoardsService,
        MessagesService,
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ boardId: 'any_board_id' })) }
        }
      ],
      declarations: [
        ShareBoardComponent,
        LoadderComponent,
        ButtonComponent,
        InputComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    jest.spyOn(Router.prototype, 'navigate').mockReturnValueOnce(null);

    fixture = TestBed.createComponent(ShareBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get selected board', () => {
    const servicerSpy = jest.spyOn(BoardsService.prototype, 'getBoard').mockReturnValueOnce(null);

    component.ngOnInit();
    fixture.detectChanges();

    expect(servicerSpy).toHaveBeenCalledTimes(1);
    expect(servicerSpy).toHaveBeenCalledWith('any_board_id');
  });
});
