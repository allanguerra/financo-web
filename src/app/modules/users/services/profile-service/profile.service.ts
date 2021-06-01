import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '@env/environment';
import { Profile } from '@src/app/shared/models/profile.model';
import { TokenPayload } from '@src/app/shared/models/token-payload.model';
import { UserService } from '@src/app/shared/services/user-service/user.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private payload: TokenPayload;

  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService
  ) { }

  public updateUserProfile(profile: Profile): Observable<void> {
    const userId = this.userService.getUserId();
    return this.http.patch<void>(api.user.profile.update.replace(':userId', userId), profile)
      .pipe(
        switchMap(() => this.userService.updateProfile())
      );
  }
}
