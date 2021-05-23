import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Board } from '@src/app/modules/boards/models/board.model';

import { BoardsService } from '@src/app/modules/boards/services/boards-service/boards.service';
import { InputComponent } from '@src/app/shared/components/input/input.component';

import { NavComponent } from '@src/app/shared/components/nav/nav.component';
import { Profile } from '@src/app/shared/models/profile.model';
import { UserService } from '@src/app/shared/services/user-service/user.service';
import { Observable, of } from 'rxjs';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ NavComponent, InputComponent ],
      providers: [
        { provide: UserService, useClass: UserServiceMock },
        { provide: BoardsService, useClass: BoardsServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle open when click on header', () => {
    const toggleButton = fixture.debugElement.nativeElement.querySelector('.header');
    toggleButton.click();
    fixture.detectChanges();

    const nav = fixture.debugElement.nativeElement.querySelector('.aside');

    expect(nav.classList).toContain('open');
  });

  it('should toggle open when click on open icon', () => {
    const toggleButton = fixture.debugElement.nativeElement.querySelector('.aside_open-icon');
    toggleButton.click();
    fixture.detectChanges();

    const nav = fixture.debugElement.nativeElement.querySelector('.aside');

    expect(nav.classList).toContain('open');
  });

  it('should get user profile on init', () => {
    const profileSpy = jest.spyOn(UserServiceMock.prototype, 'getUserProfile');

    component.ngOnInit();
    fixture.detectChanges();

    expect(profileSpy).toHaveBeenCalledTimes(1);
    expect(component.profile).toBeTruthy();
  });

  it('should get user s boards on init', () => {
    const boardsSpy = jest.spyOn(BoardsServiceMock.prototype, 'getUserBoards');

    component.ngOnInit();
    fixture.detectChanges();

    expect(boardsSpy).toHaveBeenCalledTimes(1);
    expect(component.boards).toBeTruthy();
  });

  it('should logout when click on logout action button', () => {
    const navigationSpy = jest.spyOn(UserServiceMock.prototype, 'logout').mockReturnValueOnce(null);

    const logoutButton = fixture.debugElement.nativeElement.querySelector('#action-logout');
    logoutButton.click();
    fixture.detectChanges();

    expect(navigationSpy).toHaveBeenCalledTimes(1);
  });
});

class UserServiceMock {
  public getUserProfile(): Observable<Profile> {
    return of({ name: 'any_name', surname: 'any_surname', phone: 'any_phone', thumbanail: 'any_thumbnail' });
  }
  public logout(): void {}
}

class BoardsServiceMock {
  public setActiveBoard = jest.fn();

  public getUserBoards(): Observable<Array<Board>> {
    return of([{
      _id: 'any_id',
      title: 'any_title',
      description: 'any_description',
      expirationDay: 28, owner: 'any_owner',
      sharedUsers: []
    }]);
  }

  public getActiveBoard(): string {
    return 'any_board_id';
  }
}
