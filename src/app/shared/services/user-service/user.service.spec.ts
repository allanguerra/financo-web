import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Profile } from '@src/app/shared/models/profile.model';

import { UserService } from '@src/app/shared/services/user-service/user.service';
import { SESSION } from '@src/app/utils/consts';

@Component({ template: '' })
class EmptyComponent {}

describe('UserService', () => {
  const tokenFixture = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbnlfaWQiLCJlbWFpbCI6ImFueV9lbWFpbEBlbWFpbC5jb20iLCJpYXQiOjE2MTY3NjAzMDAsImV4cCI6MTYxNjc3MDM4MH0';

  let service: UserService;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: 'join/login', component: EmptyComponent }])
      ],
      declarations: [ EmptyComponent ]
    });

    service = TestBed.inject(UserService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to login if does not exists token in local storage', (done) => {
    localStorage.removeItem(SESSION.TOKEN);
    const routeSpy = jest.spyOn(Router.prototype, 'navigate');

    service.getUserProfile().subscribe({
      next: () => done.fail(),
      error: () => done()
    });

    expect(routeSpy).toHaveBeenCalledTimes(1);
    expect(routeSpy).toHaveBeenCalledWith(['/join/login']);
  });

  it('should thow error if does not exists token in local storage', (done) => {
    localStorage.removeItem(SESSION.TOKEN);
    const routeSpy = jest.spyOn(Router.prototype, 'navigate');

    service.getUserProfile().subscribe({
      next: () => done.fail(),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toEqual('Sua sessão expirou, faça login novamente!');
        done();
      }
    });
  });

  it('should get user if exists a token in local storage', (done) => {
    localStorage.setItem(SESSION.TOKEN, tokenFixture);

    service.getUserProfile().subscribe({
      next: (profile: Profile) => {
        expect(profile).toBeTruthy();
        expect(profile.name).toEqual('any_name');
        expect(profile.surname).toEqual('any_surname');
        expect(profile.phone).toEqual('any_phone');
        expect(profile.thumbnail).toEqual('any_thumbnail');
        done();
      },
      error: () => done.fail()
    });

    mockHttp.expectOne('http://localhost:3000/v1/users/any_id')
      .flush({ profile: {
        name: 'any_name',
        surname: 'any_surname',
        phone: 'any_phone',
        thumbnail: 'any_thumbnail'
      } }, { status: 200, statusText: 'ok' });
  });
});
