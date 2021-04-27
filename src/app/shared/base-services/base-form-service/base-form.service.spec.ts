import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BaseFormService } from '@src/app/shared/base-services/base-form-service/base-form.service';
import { SESSION } from '@src/app/utils/consts';

@Injectable()
class EmptyBaseService extends BaseFormService<any> {
  constructor(protected readonly injector: Injector) {
    super('http://localhost:3000/any_base_route/:boardId', injector, (data) => data);
  }
}

describe('BaseFormService', () => {
  let service: EmptyBaseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmptyBaseService]
    });
    service = TestBed.inject(EmptyBaseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw error if active board is not defined when get by id model', (done) => {
    sessionStorage.removeItem(SESSION.ACTIVE_BOARD);

    const id = 'any_id';

    service.getById(id).subscribe({
      next: () => done.fail(),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.title).toEqual('Nenhum board está ativo');
        expect(error.text).toEqual('Por favor verifique seus boards e selecione um.');
        expect(error.type).toEqual('warning');
        done();
      }
    });
  });

  it('should throw error if active board is not defined when store model', (done) => {
    sessionStorage.removeItem(SESSION.ACTIVE_BOARD);

    const model = {};

    service.store(model).subscribe({
      next: () => done.fail(),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.title).toEqual('Nenhum board está ativo');
        expect(error.text).toEqual('Por favor verifique seus boards e selecione um.');
        expect(error.type).toEqual('warning');
        done();
      }
    });
  });

  it('should throw error if active board is not defined when update model', (done) => {
    sessionStorage.removeItem(SESSION.ACTIVE_BOARD);

    const id = 'any_id';
    const model = {};

    service.update(id, model).subscribe({
      next: () => done.fail(),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.title).toEqual('Nenhum board está ativo');
        expect(error.text).toEqual('Por favor verifique seus boards e selecione um.');
        expect(error.type).toEqual('warning');
        done();
      }
    });
  });

  it('should do a get request to get by id model', (done) => {
    const httpSpy = jest.spyOn(HttpClient.prototype, 'get');
    sessionStorage.setItem(SESSION.ACTIVE_BOARD, 'any_board_id');

    const id = 'any_id';

    service.getById(id).subscribe({
      next: (_: any) => {
        expect(httpSpy).toHaveBeenCalledTimes(1);
        expect(httpSpy).toHaveBeenCalledWith('http://localhost:3000/any_base_route/any_board_id/any_id');
        done();
      },
      error: () => done.fail()
    });

    httpMock.expectOne('http://localhost:3000/any_base_route/any_board_id/any_id')
      .flush({}, { status: 200, statusText: 'ok' });
  });

  it('should do a post request to store model', (done) => {
    const httpSpy = jest.spyOn(HttpClient.prototype, 'post');
    sessionStorage.setItem(SESSION.ACTIVE_BOARD, 'any_board_id');

    const model = {};

    service.store(model).subscribe({
      next: () => {
        expect(httpSpy).toHaveBeenCalledTimes(1);
        expect(httpSpy).toHaveBeenCalledWith('http://localhost:3000/any_base_route/any_board_id', {});
        done();
      },
      error: () => done.fail()
    });

    httpMock.expectOne('http://localhost:3000/any_base_route/any_board_id')
      .flush(null, { status: 200, statusText: 'ok' });
  });

  it('should do a put request to update model', (done) => {
    const httpSpy = jest.spyOn(HttpClient.prototype, 'put');
    sessionStorage.setItem(SESSION.ACTIVE_BOARD, 'any_board_id');

    const id = 'any_id';
    const model = {};

    service.update(id, model).subscribe({
      next: () => {
        expect(httpSpy).toHaveBeenCalledTimes(1);
        expect(httpSpy).toHaveBeenCalledWith('http://localhost:3000/any_base_route/any_board_id/any_id', {});
        done();
      },
      error: () => done.fail()
    });

    httpMock.expectOne('http://localhost:3000/any_base_route/any_board_id/any_id')
      .flush(null, { status: 200, statusText: 'ok' });
  });
});
