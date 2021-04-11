import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Forgot } from '@src/app/modules/join/models/forgot.model';
import { api } from '@env/environment';
import { ForgotStatus } from '@src/app/shared/enums/forgot-status.enum';
import { ChangePassword } from '@src/app/modules/join/models/change-password.model';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  constructor(private readonly http: HttpClient) { }

  public registerForgot(forgot: Forgot): Observable<void> {
    return this.http.post<void>(api.join.forgot.register, forgot);
  }

  public verifyForgotStatus(forgotId: string): Observable<string> {
    return this.http.get(`${api.join.forgot.register}/${forgotId}/status`, { responseType: 'text' });
  }

  public changeForgotPassword(forgotId: string, changePassword: ChangePassword): Observable<void> {
    return this.http.patch<void>(`${api.join.forgot.changePassword}/${forgotId}`, changePassword);
  }
}
