import { NgModule } from '@angular/core';
import { BoardsRoutingModule } from '@src/app/modules/boards/boards-routing.module';
import { SharedModule } from '@src/app/shared/shared.module';

import { BoardsListComponent } from '@src/app/modules/boards/components/boards-list/boards-list.component';
import { BoardCardComponent } from '@src/app/modules/boards/components/board-card/board-card.component';

@NgModule({
  declarations: [BoardsListComponent, BoardCardComponent],
  imports: [
    BoardsRoutingModule,
    SharedModule,
  ]
})
export class BoardsModule { }
