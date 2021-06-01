import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Profile } from '@src/app/shared/models/profile.model';
import { UserService } from '@src/app/shared/services/user-service/user.service';
import { of } from 'rxjs';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        UserService
      ]
    });

    service = TestBed.inject(ProfileService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update user profile', (done) => {
    const getUserIdSpy = jest.spyOn(UserService.prototype, 'getUserId')
      .mockReturnValueOnce('any_user_id');
    const updateProfileSpy = jest.spyOn(UserService.prototype, 'updateProfile')
      .mockReturnValueOnce(of(null));

    service.updateUserProfile(fixtureProfile()).subscribe({
      next: () => {
        expect(getUserIdSpy).toHaveBeenCalledTimes(1);
        expect(updateProfileSpy).toHaveBeenCalledTimes(1);
        done();
      },
      error: () => done.fail()
    });

    mockHttp.expectOne('http://localhost:3000/v1/users/any_user_id/profile')
      .flush(null, { status: 200, statusText: 'ok' });
  });
});

function fixtureProfile(): Profile {
  return {
    name: 'any_name',
    surname: 'any_surname',
    phone: 'any_phone',
    thumbnail: 'any_thumbnail'
  };
}
