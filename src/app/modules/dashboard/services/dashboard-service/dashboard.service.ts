import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '@env/environment';
import { BoardsService } from '@src/app/modules/boards/services/boards-service/boards.service';
import { Dashboard } from '@src/app/modules/dashboard/models/dashboard-model';
import { Messages } from '@src/app/utils/messages';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private readonly http: HttpClient,
    private readonly boardsService: BoardsService
  ) { }

  public getDashboard(): Observable<Dashboard> {
    const boardId = this.boardsService.getActiveBoard();
    if (!boardId) {
      return throwError(Messages.ACTIVE_BOARD_NOT_FOUND);
    }
    return this.http.get<Dashboard>(api.dashboard.base.replace(':boardId', boardId));
  }
}
