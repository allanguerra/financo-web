import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Expense } from '@src/app/modules/expenses/models/expense.model';
import { Revenue } from '@src/app/modules/revenues/models/revenue.model';

@Component({
  selector: 'app-entry-card',
  templateUrl: './entry-card.component.html'
})
export class EntryCardComponent {

  @Input('entry')
  public entry: Expense | Revenue;

  @Input('base-route')
  public baseRoute: string;

  @Input('isVisible')
  public isVisible: boolean = true;

  @Output()
  public remove: EventEmitter<Expense | Revenue> = new EventEmitter<Expense | Revenue>();

  public showMenu: boolean = false;

  constructor() { }

  public toggleShowMenu(): void {
    this.showMenu = !this.showMenu;
  }

  public removeExpense(): void {
    this.remove.emit(this.entry);
  }

}
