import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BaseListService } from '@src/app/shared/base-services/base-list-service/base-list.service';
import { SESSION } from '@src/app/utils/consts';

@Injectable()
class EmptyBaseService extends BaseListService<any> {
  constructor(protected readonly injector: Injector) {
    super('http://localhost:3000/any_base_route/:boardId', injector, (data) => data);
  }
}

describe('BaseModelService', () => {
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

  it('should throw error if active board is not defined when get all models', (done) => {
    sessionStorage.removeItem(SESSION.ACTIVE_BOARD);

    service.getAll().subscribe({
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

  it('should do a get request to get all models', (done) => {
    const httpSpy = jest.spyOn(HttpClient.prototype, 'get');
    sessionStorage.setItem(SESSION.ACTIVE_BOARD, 'any_board_id');

    service.getAll().subscribe({
      next: (_: Array<any>) => {
        expect(httpSpy).toHaveBeenCalledTimes(1);
        expect(httpSpy).toHaveBeenCalledWith('http://localhost:3000/any_base_route/any_board_id');
        done();
      },
      error: () => done.fail()
    });

    httpMock.expectOne('http://localhost:3000/any_base_route/any_board_id')
      .flush([], { status: 200, statusText: 'ok' });
  });

  it('should throw error if active board is not defined when destroy a model', (done) => {
    sessionStorage.removeItem(SESSION.ACTIVE_BOARD);

    const id = 'any_model_id';

    service.destroy(id).subscribe({
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

  it('should do a delete request to delete one model', (done) => {
    const httpSpy = jest.spyOn(HttpClient.prototype, 'delete');
    sessionStorage.setItem(SESSION.ACTIVE_BOARD, 'any_board_id');

    const id = 'any_model_id';

    service.destroy(id).subscribe({
      next: () => {
        expect(httpSpy).toHaveBeenCalledTimes(1);
        expect(httpSpy).toHaveBeenCalledWith('http://localhost:3000/any_base_route/any_board_id/any_model_id');
        done();
      },
      error: () => done.fail()
    });

    httpMock.expectOne('http://localhost:3000/any_base_route/any_board_id/any_model_id')
      .flush([], { status: 200, statusText: 'ok' });
  });
});
