import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';

import { TokenInterceptor } from '@src/app/infra/interceptors/token-interceptor/token.interceptor';
import { SESSION } from '@src/app/utils/consts';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        TokenInterceptor,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
      ]
    });

    interceptor = TestBed.inject(TokenInterceptor);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.setItem(SESSION.TOKEN, 'any_token');
  }));

  it('should create the interceptor', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add authorization header on get http requests', () => {
    http.get('any_url').subscribe();

    const testRequest = httpMock.expectOne('any_url');

    expect(testRequest.request.method).toEqual('GET');
    expect(testRequest.request.headers.has('Authorization')).toBe(true);
    expect(testRequest.request.headers.get('Authorization')).toEqual('Bearer any_token');
  });

  it('should add authorization header on post http requests', () => {
    http.post('any_url', {}).subscribe();

    const testRequest = httpMock.expectOne('any_url');

    expect(testRequest.request.method).toEqual('POST');
    expect(testRequest.request.headers.has('Authorization')).toBe(true);
    expect(testRequest.request.headers.get('Authorization')).toEqual('Bearer any_token');
  });

  it('should add authorization header on put http requests', () => {
    http.put('any_url', {}).subscribe();

    const testRequest = httpMock.expectOne('any_url');

    expect(testRequest.request.method).toEqual('PUT');
    expect(testRequest.request.headers.has('Authorization')).toBe(true);
    expect(testRequest.request.headers.get('Authorization')).toEqual('Bearer any_token');
  });

  it('should add authorization header on patch http requests', () => {
    http.patch('any_url', {}).subscribe();

    const testRequest = httpMock.expectOne('any_url');

    expect(testRequest.request.method).toEqual('PATCH');
    expect(testRequest.request.headers.has('Authorization')).toBe(true);
    expect(testRequest.request.headers.get('Authorization')).toEqual('Bearer any_token');
  });

  it('should add authorization header on delete http requests', () => {
    http.delete('any_url').subscribe();

    const testRequest = httpMock.expectOne('any_url');

    expect(testRequest.request.method).toEqual('DELETE');
    expect(testRequest.request.headers.has('Authorization')).toBe(true);
    expect(testRequest.request.headers.get('Authorization')).toEqual('Bearer any_token');
  });

  it('should not add authorization header if token is not defined on local storage', () => {
    localStorage.removeItem(SESSION.TOKEN);

    http.get('any_url').subscribe();

    const testRequest = httpMock.expectOne('any_url');

    expect(testRequest.request.headers.has('Authorization')).toBe(false);
  });
});
