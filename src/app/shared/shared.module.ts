import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InputComponent } from '@src/app/shared/components/input/input.component';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { MainComponent } from '@src/app/shared/components/main/main.component';
import { NavComponent } from '@src/app/shared/components/nav/nav.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    MainComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    // MODULES
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    // COMPONENTS
    InputComponent,
    ButtonComponent,
    NavComponent
  ]
})
export class SharedModule { }
