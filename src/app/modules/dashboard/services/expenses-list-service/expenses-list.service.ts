import { Injectable, Injector, OnInit } from '@angular/core';
import { api } from '@env/environment';
import { Expense } from '@src/app/modules/expenses/models/expense.model';
import { BaseListService } from '@src/app/shared/base-services/base-list-service/base-list.service';

@Injectable({
  providedIn: 'root'
})
export class ExpensesListService extends BaseListService<Expense> {

  constructor(readonly injector: Injector) {
    super(
      api.expenses.balance,
      injector,
      Expense.fromData
    );
  }
}
