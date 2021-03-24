import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

import { SESSION } from '@src/app/utils/consts';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private readonly router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAuthentication();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication();
  }

  // PRIVATE METHODS

  private checkAuthentication(): boolean {
    const token = localStorage.getItem(SESSION.TOKEN);
    if (!token) {
      this.redirect();
    }
    // TODO: verificar validade do token e fazer refresh, incluir campo no login para 'manter-se conectado'

    return !!token;
  }

  private redirect(): void {
    // TODO: exibir mensagem de não logado
    this.router.navigate(['/join/login']);
  }
}
