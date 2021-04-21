import { BaseModel } from '@src/app/shared/models/base.model';
import { CategoryType } from '@src/app/shared/enums/category-type.enum';

export class Category extends BaseModel {
  name: string;
  description: string;
  color: string;
  type: CategoryType;
}
