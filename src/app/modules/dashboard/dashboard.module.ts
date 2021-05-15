import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from '@src/app/modules/dashboard/dashboard-routing.module';
import { SharedModule } from '@src/app/shared/shared.module';

import { HomeComponent } from '@src/app/modules/dashboard/components/home/home.component';
import { RevenuesListComponent } from '@src/app/modules/dashboard/components/revenues-list/revenues-list.component';
import { ExpensesListComponent } from '@src/app/modules/dashboard/components/expenses-list/expenses-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    RevenuesListComponent,
    ExpensesListComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }