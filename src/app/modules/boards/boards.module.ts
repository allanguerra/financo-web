import { NgModule } from '@angular/core';
import { BoardsRoutingModule } from '@src/app/modules/boards/boards-routing.module';
import { SharedModule } from '@src/app/shared/shared.module';

import { BoardsListComponent } from '@src/app/modules/boards/components/boards-list/boards-list.component';

@NgModule({
  declarations: [BoardsListComponent],
  imports: [
    BoardsRoutingModule,
    SharedModule,
  ]
})
export class BoardsModule { }
