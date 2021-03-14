import { NgModule } from '@angular/core';

import { SignupRoutingModule } from '@src/app/modules/signup/signup-routing.module';
import { SharedModule } from '@src/app/shared/shared.module';

import { SignupComponent } from '@src/app/modules/signup/components/signup/signup.component';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    SharedModule,
    SignupRoutingModule
  ]
})
export class SignupModule { }
