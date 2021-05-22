import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from '@src/app/modules/dashboard/dashboard-routing.module';
import { SharedModule } from '@src/app/shared/shared.module';

import { HomeComponent } from '@src/app/modules/dashboard/components/home/home.component';
import { RevenuesListComponent } from '@src/app/modules/dashboard/components/revenues-list/revenues-list.component';
import { ExpensesListComponent } from '@src/app/modules/dashboard/components/expenses-list/expenses-list.component';
import { DashboardComponent } from '@src/app/modules/dashboard/components/dashboard/dashboard.component';
import { EntryCardComponent } from '@src/app/modules/dashboard/components/entry-card/entry-card.component';
import { ResumeCardComponent } from '@src/app/modules/dashboard/components/resume-card/resume-card.component';


@NgModule({
  declarations: [
    HomeComponent,
    RevenuesListComponent,
    ExpensesListComponent,
    DashboardComponent,
    EntryCardComponent,
    ResumeCardComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
