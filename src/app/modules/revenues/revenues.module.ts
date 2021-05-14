import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevenuesRoutingModule } from './revenues-routing.module';
import { RevenuesFormComponent } from './components/revenues-form/revenues-form.component';


@NgModule({
  declarations: [RevenuesFormComponent],
  imports: [
    CommonModule,
    RevenuesRoutingModule
  ]
})
export class RevenuesModule { }
