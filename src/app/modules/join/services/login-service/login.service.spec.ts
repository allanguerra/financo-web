import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LoginService } from '@src/app/modules/join/services/login-service/login.service';
import { Credentials } from '@src/app/modules/join/models/credentials.model';
import { Token } from '@src/app/modules/join/models/token.model';


describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ LoginService ]
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should do a post request on login api endpoint', (done) => {
    const userCredentials = new Credentials('any_email@email.com', 'Any_passw0rd');

    service.login(userCredentials).subscribe((response: any) => {
        expect(response).toBeFalsy();
        done();
      },
      () => {
        done.fail();
      });

    httpMock.expectOne('http://localhost:3000/v1/auth/login')
      .flush(new Token('any_token'), { status: 200, statusText: 'ok' });
  });

  it('should define a local storage item with user access token', (done) => {
    const userCredentials = new Credentials('any_email@email.com', 'Any_passw0rd');

    service.login(userCredentials).subscribe((response: any) => {
        const accessToken = localStorage.getItem('financo-token');

        expect(response).toBeFalsy();
        expect(accessToken).toBeTruthy();
        expect(accessToken).toEqual('any_token');
        done();
      },
      () => {
        done.fail();
      });

    httpMock.expectOne('http://localhost:3000/v1/auth/login')
      .flush(new Token('any_token'), { status: 200, statusText: 'ok' });
  });
});
