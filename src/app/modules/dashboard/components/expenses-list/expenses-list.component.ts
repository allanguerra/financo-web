import { Component, Injector, OnInit } from '@angular/core';
import { BoardsService } from '@src/app/modules/boards/services/boards-service/boards.service';
import { ExpenseMonthBalance } from '@src/app/modules/dashboard/models/expense-month-balance.model';
import { ExpensesListService } from '@src/app/modules/dashboard/services/expenses-list-service/expenses-list.service';
import { Expense } from '@src/app/modules/expenses/models/expense.model';
import { BaseListComponent } from '@src/app/shared/base-components/base-list/base-list.component';
import { ConfirmModalComponent } from '@src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent extends BaseListComponent<Expense> implements OnInit {

  public readonly currentDate: Date = new Date();

  public balance: ExpenseMonthBalance;
  public isLoading: boolean = false;

  public visibleClass: string = 'fa-eye';
  public isVisible: boolean = true;

  constructor(
    readonly injector: Injector,
    readonly expensesListService: ExpensesListService,
    private readonly boardsService: BoardsService
  ) {
    super(injector, expensesListService);
  }

  ngOnInit(): void {
    this.getExpensesBalance();
    this.listenActiveBoardChanges();
  }

  public remove(resource: Expense): void {
    const confirmModal: ConfirmModalComponent = this.modalService.openModal(ConfirmModalComponent);
    confirmModal.confirmType = 'despesa';
    confirmModal.resourceTitle = resource.title;

    confirmModal.confirm.subscribe((confirm: boolean) => {
      if (confirm) {
        this.destroyResource(resource._id);
      }
    });
  }

  public toggleVisible(): void {
    this.isVisible = !this.isVisible;
    this.visibleClass = this.isVisible ? 'fa-eye' : 'fa-eye-slash';
  }

  // PROTECTED METHODS - OVERRIDE

  protected getModels(): void {
    this.getExpensesBalance();
  }

  // PRIVATE METHODS

  private getExpensesBalance(): void {
    this.isLoading = true;
    const params = { month: this.currentDate.getMonth() + 1, year: this.currentDate.getFullYear() };
    this.expensesListService.getMonthBalance(params).subscribe({
      next: (monthBalance: ExpenseMonthBalance) => {
        this.balance = monthBalance;
        this.balance.monthExpenses
          .sort((a: Expense, b: Expense) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
        this.isLoading = false;
      }
    });
  }

  private listenActiveBoardChanges(): void {
    this.boardsService.activeBoardChanges.subscribe({
      next: (_: string) => this.getExpensesBalance()
    });
  }
}
