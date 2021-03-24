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
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
