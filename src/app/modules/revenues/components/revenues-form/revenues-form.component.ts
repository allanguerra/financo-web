import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Category } from '@src/app/modules/categories/models/category.model';
import { Expense } from '@src/app/modules/expenses/models/expense.model';
import { ExpensesFormService } from '@src/app/modules/expenses/services/expenses-form-service/expenses-form.service';
import { Revenue } from '@src/app/modules/revenues/models/revenue.model';
import { RevenuesFormService } from '@src/app/modules/revenues/services/revenues-form-service/revenues-form.service';
import { BaseFormComponent } from '@src/app/shared/base-components/base-form/base-form.component';
import { RadioOption } from '@src/app/shared/models/radio-option.model';
import { MASK } from '@src/app/utils/consts';

@Component({
  selector: 'app-revenues-form',
  templateUrl: './revenues-form.component.html'
})
export class RevenuesFormComponent extends BaseFormComponent<Revenue> implements OnInit {

  public readonly currency = MASK.CURRENCY;
  public readonly integer = MASK.INTEGER;

  public readonly statusOptions: Array<RadioOption> = [
    { label: 'PAGO', value: 'paid' },
    { label: 'PENDENTE', value: 'pending' },
    { label: 'VENCIDO', value: 'expired' }
  ];
  public readonly recurentOptions: Array<RadioOption> = [
    { label: 'Tempo indefinido', value: false },
    { label: 'Por', value: true }
  ];

  public categories: Array<Category> = [];
  public recurrentRadio: FormControl = new FormControl(false);

  constructor(
    readonly injector: Injector,
    protected readonly revenuesFormService: RevenuesFormService
  ) {
    super(
      injector,
      revenuesFormService,
      Revenue.fromData
    );
  }

  ngOnInit(): void {
    this.getCategories();
  }

  public setRecurrentRadio(value: string): void {
    this.recurrentRadio.setValue(value);
  }

  // PROTECTED METHODS

  protected buildModelForm(): void {
    this.modelForm = this.fb.group({
      _id: [null],
      title: [null, [Validators.required]],
      description: [null],
      category: [null, [Validators.required]],
      value: [null, [Validators.required]],
      recurrent: [false, [Validators.required]],
      recurrentTimes: [null]
    });
  }

  // PRIVATE METHODS

  private getCategories(): void {
    this.isLoading = true;

    this.revenuesFormService.getCategories().subscribe({
      next: (categories: Array<Category>) => {
        this.categories = categories;
        this.isLoading = false;
      }
    });
  }
}
