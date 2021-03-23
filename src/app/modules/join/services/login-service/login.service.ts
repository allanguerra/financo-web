import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Credentials } from '@src/app/modules/join/models/credentials.model';
import { Token } from '@src/app/modules/join/models/token.model';

import { api } from '@env/environment';
import { SESSION } from '@src/app/utils/consts';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public login(credentials: Credentials): Observable<void> {
    return this.http.post<Token>(api.join.login, credentials).pipe(
      map((token: Token) => {
        localStorage.removeItem(SESSION.TOKEN);
        localStorage.setItem(SESSION.TOKEN, token.accessToken);
        return;
      })
    );
  }
}
