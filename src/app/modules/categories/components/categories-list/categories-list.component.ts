import { Component, Injector, OnInit } from '@angular/core';
import { Category } from '@src/app/modules/categories/modals/category.model';
import { CategoriesService } from '@src/app/modules/categories/services/categories-service/categories.service';
import { BaseListComponent } from '@src/app/shared/base-components/base-list/base-list.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent extends BaseListComponent<Category> implements OnInit {

  constructor(
    protected readonly injector: Injector,
    readonly categoriesService: CategoriesService,
  ) {
    super(injector, categoriesService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
