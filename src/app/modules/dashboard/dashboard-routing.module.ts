import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@src/app/infra/guards/auth-guard/auth.guard';

import { HomeComponent } from '@src/app/modules/dashboard/components/home/home.component';
import { ExpensesListComponent } from '@src/app/modules/dashboard/components/expenses-list/expenses-list.component';
import { RevenuesListComponent } from '@src/app/modules/dashboard/components/revenues-list/revenues-list.component';
import { DashboardComponent } from '@src/app/modules/dashboard/components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: '',
        redirectTo: 'balance',
        pathMatch: 'full'
      },
      {
        path: 'balance',
        component: DashboardComponent,
      },
      {
        path: 'balance/revenues',
        component: RevenuesListComponent
      },
      {
        path: 'balance/expenses',
        component: ExpensesListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
