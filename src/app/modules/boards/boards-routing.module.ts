import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardsFormComponent } from '@src/app/modules/boards/components/boards-form/boards-form.component';
import { BoardsListComponent } from '@src/app/modules/boards/components/boards-list/boards-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: BoardsListComponent
  },
  {
    path: 'new',
    component: BoardsFormComponent
  },
  {
    path: 'edit/:id',
    component: BoardsFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardsRoutingModule { }
