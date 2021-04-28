import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Category } from '@src/app/modules/categories/models/category.model';
import { CategoriesFormService } from '@src/app/modules/categories/services/categories-form-service/categories-form.service';
import { BaseFormComponent } from '@src/app/shared/base-components/base-form/base-form.component';
import { RadioOption } from '@src/app/shared/models/radio-option.model';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent extends BaseFormComponent<Category> {

  private options: Array<RadioOption> = [
    { label: 'RECEITA', value: 'revenue' },
    { label: 'AMBOS', value: 'both' },
    { label: 'DESPESA', value: 'expense' }
  ];

  constructor(
    protected readonly injector: Injector,
    protected readonly categoriesFormService: CategoriesFormService
  ) {
    super(
      injector,
      categoriesFormService,
      Category.fromData);
  }

  public setTypeValue(value: string): void  {
    this.modelForm.get('type').setValue(value);
  }

  public setColorValue(value: string): void  {
    this.modelForm.get('color').setValue(value);
  }

  // PROTECTED METHODS

  protected buildModelForm(): void {
    this.modelForm = this.fb.group({
      _id: [null],
      name: [null, [Validators.required]],
      description: [null],
      color: [null, [Validators.required]],
      type: [null, [Validators.required]]
    });
  }
}
