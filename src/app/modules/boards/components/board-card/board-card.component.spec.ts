import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BoardCardComponent } from '@src/app/modules/boards/components/board-card/board-card.component';

describe('BoardCardComponent', () => {
  let component: BoardCardComponent;
  let fixture: ComponentFixture<BoardCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ BoardCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCardComponent);
    component = fixture.componentInstance;

    component.board = {
      _id: 'any_id',
      title: 'any_title',
      description: 'any_description',
      expirationDay: 28,
      sharedUsers: [],
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu when click on menu icon', () => {
    const menuButton = fixture.debugElement.nativeElement.querySelector('.fas.fa-ellipsis-v');
    menuButton.click();
    fixture.detectChanges();

    expect(component.showMenu).toBe(true);
  });
});
