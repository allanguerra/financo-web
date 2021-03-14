import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from '@src/app/modules/signup/signup-routing.module';
import { SharedModule } from '@src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    SignupRoutingModule
  ]
})
export class SignupModule { }
