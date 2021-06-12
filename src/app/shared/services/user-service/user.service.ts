import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
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

  public profileUpdated: EventEmitter<Profile> = new EventEmitter<Profile>();

  private profile: Profile;
  private payload: TokenPayload;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }

  public getUserProfile(): Observable<Profile> {
    if (!this.hasUserPayload()) {
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

  public getUserId(): string {
    if (this.hasUserPayload()) {
      return this.payload.sub;
    }
  }

  public updateProfile(): Observable<void> {
    if (!this.hasUserPayload()) {
      return throwError('Sua sessão expirou, faça login novamente!');
    }
    return this.http.get<User>(`${api.user.get}/${this.payload.sub}`).pipe(
      map((user: User) => {
        this.profile = user.profile;
        this.notifyProfileUpdate();
        return;
      })
    );

  }

  public notifyProfileUpdate(): void {
    setTimeout(() => {
      this.profileUpdated.emit(this.profile);
    }, 500);
  }

  public logout(): void {
    localStorage.removeItem(SESSION.TOKEN);
    sessionStorage.removeItem(SESSION.ACTIVE_BOARD);
    this.profile = null;
    this.router.navigate(['/join/login']);
  }

  // PRIVATE METHODS

  private hasUserPayload(): boolean {
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
