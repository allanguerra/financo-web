import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BoardsService } from '@src/app/modules/boards/services/boards-service/boards.service';
import { DashboardService } from '@src/app/modules/dashboard/services/dashboard-service/dashboard.service';
import { SESSION } from '@src/app/utils/consts';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoardsService]
    });
    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw error if active board is not defined when get dashboard', (done) => {
    sessionStorage.removeItem(SESSION.ACTIVE_BOARD);

    service.getDashboard().subscribe({
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

    service.getDashboard().subscribe({
      next: (_: Array<any>) => {
        expect(httpSpy).toHaveBeenCalledTimes(1);
        expect(httpSpy).toHaveBeenCalledWith('http://localhost:3000/v1/board/any_board_id/dashboard?');
        done();
      },
      error: () => done.fail()
    });

    httpMock.expectOne('http://localhost:3000/v1/board/any_board_id/dashboard?')
      .flush({}, { status: 200, statusText: 'ok' });
  });
});
