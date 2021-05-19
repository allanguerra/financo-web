import { Total } from '@src/app/modules/dashboard/models/total.model';
import { Expense } from '@src/app/modules/expenses/models/expense.model';
import { BaseModel } from '@src/app/shared/models/base.model';

export class ExpenseMonthBalance extends BaseModel {
  monthExpenses: Array<Expense>;
  totalByCategory: Array<Total>;
  monthTotal: number;

  // STATIC METHODS

  static fromData(data: any): ExpenseMonthBalance {
    return Object.assign(new ExpenseMonthBalance(), data);
  }
}
