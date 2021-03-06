import { Component, Injector, OnInit } from '@angular/core';
import { BoardsService } from '@src/app/modules/boards/services/boards-service/boards.service';
import { RevenuesMonthBalance } from '@src/app/modules/dashboard/models/revenues-month-balance.model';
import { RevenuesListService } from '@src/app/modules/dashboard/services/revenues-list-service/revenues-list.service';
import { Revenue } from '@src/app/modules/revenues/models/revenue.model';
import { BaseListComponent } from '@src/app/shared/base-components/base-list/base-list.component';
import { ConfirmModalComponent } from '@src/app/shared/components/confirm-modal/confirm-modal.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-revenues-list',
  templateUrl: './revenues-list.component.html',
  styleUrls: ['./revenues-list.component.scss']
})
export class RevenuesListComponent extends BaseListComponent<Revenue> implements OnInit {

  public readonly currentDate: Date = new Date();

  public balance: RevenuesMonthBalance;
  public isLoading: boolean = false;

  public visibleClass: string = 'fa-eye';
  public isVisible: boolean = true;

  constructor(
    readonly injector: Injector,
    readonly revenuesListService: RevenuesListService,
    private readonly boardsService: BoardsService
  ) {
    super(injector, revenuesListService);
  }

  ngOnInit(): void {
    this.getRevenuesBalance();
    this.listenActiveBoardChanges();
  }

  public remove(resource: Revenue): void {
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
    this.getRevenuesBalance();
  }

  // PRIVATE METHODS

  private getRevenuesBalance(): void {
    this.isLoading = true;
    const params = { month: this.currentDate.getMonth() + 1, year: this.currentDate.getFullYear() };
    this.revenuesListService.getMonthBalance(params)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (monthBalance: RevenuesMonthBalance) => {
          this.balance = monthBalance;
          this.balance.monthRevenues
            .sort((a: Revenue, b: Revenue) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
        }
      });
  }

  private listenActiveBoardChanges(): void {
    this.boardsService.activeBoardChanges.subscribe({
      next: (_: string) => this.getRevenuesBalance()
    });
  }

}
