import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BoardCardComponent } from '@src/app/modules/boards/components/board-card/board-card.component';
import { Board } from '@src/app/modules/boards/models/board.model';
import { BoardsListService } from '@src/app/modules/boards/services/boards-list-service/boards-list.service';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { LoadderComponent } from '@src/app/shared/components/loadder/loadder.component';
import { of } from 'rxjs';

import { BoardsListComponent } from './boards-list.component';

describe('BoardsListComponent', () => {
  let component: BoardsListComponent;
  let fixture: ComponentFixture<BoardsListComponent>;

  let serviceMock: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        BoardsListComponent,
        BoardCardComponent,
        LoadderComponent,
        ButtonComponent
      ],
      providers: [
        BoardsListService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { parent: { url: [{ path: 'boards' }] } } }
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    serviceMock = jest.spyOn(BoardsListService.prototype, 'getAll')
      .mockReturnValueOnce( of(fixtureBoards()) );

    fixture = TestBed.createComponent(BoardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct page title', () => {
    fixture.detectChanges();

    const pageTitle = fixture.debugElement.nativeElement.querySelector('.list_header-title h2');

    expect(pageTitle.textContent).toEqual('Seus Boards');
  });

  it('should get categories list', () => {
    fixture.detectChanges();

    const boards = fixture.debugElement.nativeElement.querySelectorAll('.card');

    expect(serviceMock).toHaveBeenCalledTimes(1);
    expect(boards.length).toBe(1);
  });
});

function fixtureBoards(): Array<Board> {
  return [
    {
      _id: 'any_id',
      title: 'any_title',
      description: 'any_description',
      expirationDay: 28,
      sharedUsers: []
    }
  ];
}
