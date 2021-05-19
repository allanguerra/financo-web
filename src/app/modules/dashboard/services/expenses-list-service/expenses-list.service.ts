import { Injectable, Injector, OnInit } from '@angular/core';
import { api } from '@env/environment';
import { ExpenseMonthBalance } from '@src/app/modules/dashboard/models/expense-month-balance.model';
import { Expense } from '@src/app/modules/expenses/models/expense.model';
import { BaseListService } from '@src/app/shared/base-services/base-list-service/base-list.service';
import { Messages } from '@src/app/utils/messages';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpensesListService extends BaseListService<Expense> {

  constructor(readonly injector: Injector) {
    super(
      api.expenses.base,
      injector,
      Expense.fromData
    );
  }

  public getMonthBalance(params?: Record<any, any>): Observable<ExpenseMonthBalance> {
    const boardId = this.boardsService.getActiveBoard();
    if (!boardId) {
      return throwError(Messages.ACTIVE_BOARD_NOT_FOUND);
    }
    return this.http.get<ExpenseMonthBalance>(`${api.expenses.balance.replace(':boardId', boardId)}?${new URLSearchParams(params)}`)
      .pipe(
        map(ExpenseMonthBalance.fromData)
      );
  }
}
