import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BoardsRoutingModule } from '@src/app/modules/boards/boards-routing.module';

import { BoardsListComponent } from './components/boards-list/boards-list.component';

@NgModule({
  declarations: [BoardsListComponent],
  imports: [
    BoardsRoutingModule,
    SharedModule,
  ]
})
export class BoardsModule { }
