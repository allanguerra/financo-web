import { Injectable, Injector } from '@angular/core';

import { Category } from '@src/app/modules/categories/modals/category.model';
import { api } from '@env/environment';
import { BaseModelService } from '@src/app/shared/base-services/base-model-service/base-model.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseModelService<Category> {

  constructor(
    protected readonly injector: Injector
  ) {
    super(
      api.categories.base,
      injector,
      Category.fromData
    );
  }
}
