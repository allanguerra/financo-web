import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Forgot } from '@src/app/modules/join/models/forgot.model';
import { api } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  constructor(private readonly http: HttpClient) { }

  public registerForgot(forgot: Forgot): Observable<void> {
    return this.http.post<void>(api.join.forgot.register, forgot);
  }
}
