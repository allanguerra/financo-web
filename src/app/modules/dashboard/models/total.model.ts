import { Category } from '@src/app/modules/categories/models/category.model';
import { BaseModel } from '@src/app/shared/models/base.model';

export class Total extends BaseModel {
  category: Category;
  total: number;
}
