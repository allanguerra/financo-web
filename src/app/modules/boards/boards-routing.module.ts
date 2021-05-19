import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardsRoutingModule { }
