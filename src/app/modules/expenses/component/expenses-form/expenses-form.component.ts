import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Category } from '@src/app/modules/categories/models/category.model';
import { Expense } from '@src/app/modules/expenses/models/expense.model';
import { ExpensesFormService } from '@src/app/modules/expenses/services/expenses-form-service/expenses-form.service';
import { BaseFormComponent } from '@src/app/shared/base-components/base-form/base-form.component';
import { RadioOption } from '@src/app/shared/models/radio-option.model';
import { MASK } from '@src/app/utils/consts';

@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html'
})
export class ExpensesFormComponent extends BaseFormComponent<Expense> implements OnInit {

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
    protected readonly expensesFormService: ExpensesFormService
  ) {
    super(
      injector,
      expensesFormService,
      Expense.fromData
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

    this.expensesFormService.getCategories().subscribe({
      next: (categories: Array<Category>) => {
        this.categories = categories;
        this.isLoading = false;
      }
    });
  }
}
