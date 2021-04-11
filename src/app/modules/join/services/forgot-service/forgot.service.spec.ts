import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
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
});
