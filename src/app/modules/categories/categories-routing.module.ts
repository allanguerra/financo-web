import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesFormComponent } from '@src/app/modules/categories/components/categories-form/categories-form.component';
import { CategoriesListComponent } from '@src/app/modules/categories/components/categories-list/categories-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: CategoriesListComponent
  },
  {
    path: 'new',
    component: CategoriesFormComponent
  },
  {
    path: 'edit/:id',
    component: CategoriesFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
