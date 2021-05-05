import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

import { SESSION } from '@src/app/utils/consts';
import { MessagesService } from '@src/app/shared/services/messages-service/messages.service';
import { Messages } from '@src/app/utils/messages';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private readonly messageService: MessagesService,
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) {}

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
    this.ngZone.run(() => {
      this.messageService.notify(Messages.SESSION_EXPIRED);
      this.router.navigate(['/join/login']);
    });
  }
}
