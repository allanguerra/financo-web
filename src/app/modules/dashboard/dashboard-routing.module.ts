import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@src/app/infra/guards/auth-guard/auth.guard';

import { HomeComponent } from '@src/app/modules/dashboard/components/home/home.component';
import { ExpensesListComponent } from '@src/app/modules/dashboard/components/expenses-list/expenses-list.component';
import { RevenuesListComponent } from '@src/app/modules/dashboard/components/revenues-list/revenues-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ AuthGuard ],
    children: [
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
