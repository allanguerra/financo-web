import { Component, Injector, OnInit } from '@angular/core';
import { Category } from '@src/app/modules/categories/models/category.model';
import { CategoriesListService } from '@src/app/modules/categories/services/categories-list-service/categories-list.service';
import { BaseListComponent } from '@src/app/shared/base-components/base-list/base-list.component';
import { ConfirmModalComponent } from '@src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent extends BaseListComponent<Category> implements OnInit {

  constructor(
    protected readonly injector: Injector,
    readonly categoriesService: CategoriesListService,
  ) {
    super(injector, categoriesService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public remove(resource: Category): void {
    const confirmModal: ConfirmModalComponent = this.modalService.openModal(ConfirmModalComponent);
    confirmModal.confirmType = 'categoria';
    confirmModal.resourceTitle = resource.name;

    confirmModal.confirm.subscribe((confirm: boolean) => {
      if (confirm) {
        this.destroyResource(resource._id);
      }
    });
  }

}
