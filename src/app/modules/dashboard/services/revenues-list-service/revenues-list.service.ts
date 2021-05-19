import { Injectable, Injector } from '@angular/core';
import { api } from '@env/environment';
import { RevenuesMonthBalance } from '@src/app/modules/dashboard/models/revenues-month-balance.model';
import { Revenue } from '@src/app/modules/revenues/models/revenue.model';
import { BaseListService } from '@src/app/shared/base-services/base-list-service/base-list.service';
import { Messages } from '@src/app/utils/messages';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RevenuesListService extends BaseListService<Revenue> {

  constructor(readonly injector: Injector) {
    super(
      api.revenues.base,
      injector,
      Revenue.fromData
    );
  }

  public getMonthBalance(params?: Record<any, any>): Observable<RevenuesMonthBalance> {
    const boardId = this.boardsService.getActiveBoard();
    if (!boardId) {
      return throwError(Messages.ACTIVE_BOARD_NOT_FOUND);
    }
    return this.http.get<RevenuesMonthBalance>(`${api.revenues.balance.replace(':boardId', boardId)}?${new URLSearchParams(params)}`)
      .pipe(
        map(RevenuesMonthBalance.fromData)
      );
  }
}
