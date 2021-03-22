import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpEvent } from '@angular/common/http';

import { SignupService } from '@src/app/modules/join/services/signup-service/signup.service';
import { Signup } from '@src/app/modules/join/models/signup.model';


describe('SignupService', () => {
  let service: SignupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ SignupService ]
    });

    service = TestBed.inject(SignupService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should do a post request on signup api endpoint', (done) => {
    const signupUser = new Signup('any_email@email.com', 'Any_passw0rd');

    // tslint:disable-next-line: deprecation
    service.signup(signupUser).subscribe((response: any) => {
        expect(response).toBeFalsy();
        done();
      },
      () => {
        done.fail();
      });

    httpMock.expectOne('http://localhost:3000/v1/signup')
      .flush(null, { status: 200, statusText: 'ok' });
  });
});
