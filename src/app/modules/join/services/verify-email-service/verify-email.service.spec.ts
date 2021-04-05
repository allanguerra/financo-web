import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { VerifyEmailService } from './verify-email.service';

describe('VerifyEmailService', () => {
  let service: VerifyEmailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ VerifyEmailService ]
    });

    service = TestBed.inject(VerifyEmailService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should do a patch request on verify user email endpoint', (done) => {
    const userId = 'any_user_id';

    service.verifyEmail(userId).subscribe({
      next: (response: any) => {
        expect(response).toBeFalsy();
        done();
      },
      error: () => {
        done.fail();
      }
    });

    httpMock.expectOne('http://localhost:3000/v1/users/verify/any_user_id')
      .flush({ accessToken: 'any_user_token' }, { status: 200, statusText: 'ok' });
  });
});
