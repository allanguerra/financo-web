import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ChangePassword } from '@src/app/modules/join/models/change-password.model';
import { Forgot } from '@src/app/modules/join/models/forgot.model';

import { ForgotService } from './forgot.service';

describe('ForgotService', () => {
  let service: ForgotService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ForgotService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should do a post request to register forgot password endpoint', (done) => {
    const forgot: Forgot = { email: 'any_email@email.com' };

    service.registerForgot(forgot).subscribe({
      next: (response) => {
        expect(response).toBeFalsy();
        done();
      },
      error: () => done.fail()
    });

    httpMock.expectOne('http://localhost:3000/v1/users/forgot')
      .flush(null, { status: 201, statusText: 'created' });
  });

  it('should do a get request to verify forgot password status endpoint', (done) => {
    const forgotId = 'any_forgot_id';

    service.verifyForgotStatus(forgotId).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        expect(response).toEqual('active');
        done();
      },
      error: () => done.fail()
    });

    httpMock.expectOne('http://localhost:3000/v1/users/forgot/any_forgot_id/status')
      .flush('active', { status: 200, statusText: 'ok' });
  });

  it('should do a patch request to change forgot password endpoint', (done) => {
    const forgotId = 'any_forgot_id';
    const changePassword: ChangePassword = { newPassword: 'any_password', repeatPassword: 'any_password' };

    service.changeForgotPassword(forgotId, changePassword).subscribe({
      next: (response) => {
        expect(response).toBeFalsy();
        done();
      },
      error: () => done.fail()
    });

    httpMock.expectOne('http://localhost:3000/v1/users/change-password/forgot/any_forgot_id')
      .flush(null, { status: 201, statusText: 'created' });
  });
});
