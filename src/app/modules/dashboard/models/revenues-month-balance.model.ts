import { Total } from '@src/app/modules/dashboard/models/total.model';
import { Revenue } from '@src/app/modules/revenues/models/revenue.model';
import { BaseModel } from '@src/app/shared/models/base.model';

export class RevenuesMonthBalance extends BaseModel {
  monthRevenues: Array<Revenue>;
  totalByCategory: Array<Total>;
  monthTotal: number;

  // STATIC METHODS

  static fromData(data: any): RevenuesMonthBalance {
    return Object.assign(new RevenuesMonthBalance(), data);
  }
}
