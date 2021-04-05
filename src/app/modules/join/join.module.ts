import { NgModule } from '@angular/core';
import { SharedModule } from '@src/app/shared/shared.module';
import { JoinRoutingModule } from '@src/app/modules/join/join-routing.module';

import { SignupComponent } from '@src/app/modules/join/components/signup/signup.component';
import { LoginComponent } from '@src/app/modules/join/components/login/login.component';
import { ForgotComponent } from '@src/app/modules/join/components/forgot/forgot.component';
import { VerifyComponent } from '@src/app/modules/join/components/verify/verify.component';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ForgotComponent,
    VerifyComponent
  ],
  imports: [
    SharedModule,
    JoinRoutingModule
  ]
})
export class JoinModule { }
