import { NgModule } from '@angular/core';
import { SharedModule } from '@src/app/shared/shared.module';
import { JoinRoutingModule } from '@src/app/modules/join/join-routing.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    JoinRoutingModule
  ]
})
export class JoinModule { }
