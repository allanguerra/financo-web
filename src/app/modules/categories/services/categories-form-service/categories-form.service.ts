import { Injectable, Injector } from '@angular/core';
import { Category } from '@src/app/modules/categories/models/category.model';
import { api } from '@env/environment';
import { BaseFormService } from '@src/app/shared/base-services/base-form-service/base-form.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesFormService extends BaseFormService<Category> {

  constructor(
    protected injector: Injector
  ) {
    super(
      api.categories.base,
      injector,
      Category.fromData);
  }
}
