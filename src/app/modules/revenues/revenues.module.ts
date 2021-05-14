import { NgModule } from '@angular/core';

import { SharedModule } from '@src/app/shared/shared.module';
import { RevenuesRoutingModule } from './revenues-routing.module';
import { RevenuesFormComponent } from './components/revenues-form/revenues-form.component';


@NgModule({
  declarations: [RevenuesFormComponent],
  imports: [
    SharedModule,
    RevenuesRoutingModule
  ]
})
export class RevenuesModule { }
