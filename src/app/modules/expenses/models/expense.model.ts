import { Category } from '@src/app/modules/categories/models/category.model';
import { BaseModel } from '@src/app/shared/models/base.model';

export class Expense extends BaseModel {
  constructor(
    public title?: string,
    public description?: string,
    public value?: number,
    public recurrent?: boolean,
    public recurrentTimes?: number,
    public category?: Category,
    public createdAt?: Date
  ) {
    super();
  }

  // STATIC METHODS

  static fromData(data: any): Expense {
    return Object.assign(new Expense(), data);
  }
}
