import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Signup } from '@src/app/modules/join/models/signup.model';

import { api } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private readonly http: HttpClient
  ) { }

  // TODO: aplicar o login automaticamente ao concluir com sucesso o signup. (deve ser feito no backend e retornado o token)
  public signup(signup: Signup): Observable<void> {
    return this.http.post<void>(api.join.signup, signup);
  }
}
