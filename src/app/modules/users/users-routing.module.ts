import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileFormComponent } from '@src/app/modules/users/components/profile-form/profile-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'edit',
    pathMatch: 'full'
  },
  {
    path: 'edit',
    component: ProfileFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
