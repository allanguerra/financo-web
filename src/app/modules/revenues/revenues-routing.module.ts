import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RevenuesFormComponent } from '@src/app/modules/revenues/components/revenues-form/revenues-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full'
  },
  {
    path: 'new',
    component: RevenuesFormComponent
  },
  {
    path: 'edit/:id',
    component: RevenuesFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevenuesRoutingModule { }
