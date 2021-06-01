import { NgModule } from '@angular/core';

import { UsersRoutingModule } from '@src/app/modules/users/users-routing.module';
import { SharedModule } from '@src/app/shared/shared.module';

import { ProfileFormComponent } from '@src/app/modules/users/components/profile-form/profile-form.component';

@NgModule({
  declarations: [ProfileFormComponent],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
