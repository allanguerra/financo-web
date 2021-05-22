import { MonthResume } from '@src/app/modules/dashboard/models/month-resume.model';
import { Total } from '@src/app/modules/dashboard/models/total.model';

export class Dashboard {
  constructor(
    expensesByCategory?: Array<Total>,
    revenuesByCategory?: Array<Total>,
    monthResume?: MonthResume
  ) {}

  // STATIC METHODS

  static fromData(data: any): Dashboard {
    return Object.assign(new Dashboard(), data);
  }
}
