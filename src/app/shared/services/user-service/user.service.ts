import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { api } from '@env/environment';
import { Profile } from '@src/app/shared/models/profile.model';
import { TokenPayload } from '@src/app/shared/models/token-payload.model';
import { User } from '@src/app/shared/models/user.model';
import { SESSION } from '@src/app/utils/consts';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private profile: Profile;
  private payload: TokenPayload;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }

  public getUserProfile(): Observable<Profile> {
    if (!this.getPayload()) {
      return throwError('Sua sessão expirou, faça login novamente!');
    }

    if (this.profile) {
      return of(this.profile);
    } else {
      return this.http.get<User>(`${api.user.get}/${this.payload.sub}`).pipe(
        map((user: User) => {
          this.profile = user.profile;
          return user.profile;
        })
      );
    }
  }

  public logout(): void {
    localStorage.removeItem(SESSION.TOKEN);
    this.router.navigate(['/join/login']);
  }

  // PRIVATE METHODS

  private getPayload(): boolean {
    const token = localStorage.getItem(SESSION.TOKEN);

    if (token) {
      this.payload = JSON.parse(atob(token.split('.')[1]));
      return true;
    } else {
      this.router.navigate(['/join/login']);
      return false;
    }
  }
}
