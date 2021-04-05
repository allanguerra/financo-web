import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Token } from '@src/app/modules/join/models/token.model';

import { SESSION } from '@src/app/utils/consts';
import { api } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyEmailService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public verifyEmail(userId: string): Observable<void> {
    return this.http.patch<Token>(`${api.join.verify}/${userId}`, {}).pipe(
      map((token: Token) => {
        localStorage.removeItem(SESSION.TOKEN);
        localStorage.setItem(SESSION.TOKEN, token.accessToken);
        return;
      })
    );
  }
}
