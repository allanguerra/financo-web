import { Injectable, Injector } from '@angular/core';
import { api } from '@env/environment';
import { Category } from '@src/app/modules/categories/models/category.model';
import { Revenue } from '@src/app/modules/revenues/models/revenue.model';
import { BaseFormService } from '@src/app/shared/base-services/base-form-service/base-form.service';
import { Messages } from '@src/app/utils/messages';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RevenuesFormService extends BaseFormService<Revenue> {

  constructor(
    readonly injector: Injector
  ) {
    super(
      api.revenues.base,
      injector,
      Revenue.fromData
    );
  }

  public getCategories(): Observable<Array<Category>> {
    const boardId = this.boardsService.getActiveBoard();
    if (!boardId) {
      return throwError(Messages.ACTIVE_BOARD_NOT_FOUND);
    }
    return this.http.get<Array<Category>>(`${api.categories.getByRevenue.replace(':boardId', boardId)}`)
      .pipe(
        map(this.categoriesToModelArray)
      );
  }

  // PRIVATE METHODS

  private categoriesToModelArray(data: Array<any>): Array<Category> {
    const categoriesArray: Array<Category> = [];
    data.forEach((dataItem: any) => categoriesArray.push(Category.fromData(dataItem)));
    return categoriesArray;
  }
}
