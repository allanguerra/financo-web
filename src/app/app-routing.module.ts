import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@src/app/infra/guards/auth-guard/auth.guard';
import { MainComponent } from '@src/app/shared/components/main/main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'join',
    pathMatch: 'full'
  },
  {
    path: 'join',
    loadChildren: () => import('./modules/join/join.module').then(module => module.JoinModule)
  },
  {
    path: 'home',
    component: MainComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(module => module.DashboardModule),
        canLoad: [ AuthGuard ],
        canActivate: [ AuthGuard ]
      },
      {
        path: 'categories',
        loadChildren: () => import('./modules/categories/categories.module').then(module => module.CategoriesModule),
        canLoad: [ AuthGuard ],
        canActivate: [ AuthGuard ]
      },
      {
        path: 'expenses',
        loadChildren: () => import('./modules/expenses/expenses.module').then(module => module.ExpensesModule),
        canLoad: [ AuthGuard ],
        canActivate: [ AuthGuard ]
      },
      {
        path: 'revenues',
        loadChildren: () => import('./modules/revenues/revenues.module').then(module => module.RevenuesModule),
        canLoad: [ AuthGuard ],
        canActivate: [ AuthGuard ]
      },
      {
        path: 'boards',
        loadChildren: () => import('./modules/boards/boards.module').then(module => module.BoardsModule),
        canLoad: [ AuthGuard ],
        canActivate: [ AuthGuard ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
