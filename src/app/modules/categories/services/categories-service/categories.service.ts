import { Injectable, Injector } from '@angular/core';

import { Category } from '@src/app/modules/categories/modals/category.model';
import { api } from '@env/environment';
import { BaseListService } from '@src/app/shared/base-services/base-list-service/base-list.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseListService<Category> {

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
