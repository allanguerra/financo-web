import { NgModule } from '@angular/core';

import { ExpensesRoutingModule } from '@src/app/modules/expenses/expenses-routing.module';
import { SharedModule } from '@src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    ExpensesRoutingModule
  ]
})
export class ExpensesModule { }
