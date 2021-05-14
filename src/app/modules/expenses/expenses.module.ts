import { NgModule } from '@angular/core';

import { ExpensesRoutingModule } from '@src/app/modules/expenses/expenses-routing.module';
import { SharedModule } from '@src/app/shared/shared.module';

import { ExpensesFormComponent } from '@src/app/modules/expenses/component/expenses-form/expenses-form.component';

@NgModule({
  declarations: [ExpensesFormComponent],
  imports: [
    SharedModule,
    ExpensesRoutingModule
  ]
})
export class ExpensesModule { }
