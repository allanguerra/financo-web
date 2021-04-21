import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BaseModelService } from '@src/app/shared/base-services/base-model-service/base-model.service';
import { SESSION } from '@src/app/utils/consts';

@Injectable()
class EmptyBaseService extends BaseModelService<any> {
  constructor(protected readonly injector: Injector) {
    super('http://localhost:3000/any_base_route/:boardId', injector);
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

  it('should throw error if active board is not defined', (done) => {
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
});
