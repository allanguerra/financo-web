import { NgModule } from '@angular/core';
import { SharedModule } from '@src/app/shared/shared.module';
import { JoinRoutingModule } from '@src/app/modules/join/join-routing.module';

import { SignupComponent } from '@src/app/modules/join/components/signup/signup.component';


@NgModule({
  declarations: [SignupComponent],
  imports: [
    SharedModule,
    JoinRoutingModule
  ]
})
export class JoinModule { }
