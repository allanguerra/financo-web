import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from '@src/app/infra/guards/auth-guard/auth.guard';
import { SESSION } from '@src/app/utils/consts';

@Component({ template: '' })
class EmptyComponent {}

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([{ path: 'join/login', component: EmptyComponent }]) ],
      declarations: [ EmptyComponent ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should can not load if there is not a token in local session', () => {
    localStorage.removeItem(SESSION.TOKEN);

    const canLoad = guard.canLoad(null, null);

    expect(canLoad).toBe(false);
  });

  it('should can load if there is a token in local session', () => {
    localStorage.setItem(SESSION.TOKEN, 'any_token');

    const canLoad = guard.canLoad(null, null);

    expect(canLoad).toBe(true);
  });

  it('should can not activate if there is not a token in local session', () => {
    localStorage.removeItem(SESSION.TOKEN);

    const canActivate = guard.canActivate(null, null);

    expect(canActivate).toBe(false);
  });

  it('should can activate if there is a token in local session', () => {
    localStorage.setItem(SESSION.TOKEN, 'any_token');

    const canActivate = guard.canActivate(null, null);

    expect(canActivate).toBe(true);
  });
});
