import { BaseModel } from '@src/app/shared/models/base.model';
import { CategoryType } from '@src/app/shared/enums/category-type.enum';

export class Category extends BaseModel {
  constructor(
    public name?: string,
    public description?: string,
    public color?: string,
    public type?: CategoryType,
  ) {
    super();
  }

  // STATIC METHODS

  static fromData(data: any): Category {
    return Object.assign(new Category(), data);
  }

  // PUBLIC METHODS

  public getType(): string {
    switch (this.type) {
      case CategoryType.BOTH:
        return 'AMBOS';
      case CategoryType.EXPENSE:
        return 'DESPESAS';
      case CategoryType.REVENUE:
        return 'RECEITAS';
    }
  }
}
