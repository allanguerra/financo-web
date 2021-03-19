import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from '@src/app/shared/components/input/input.component';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';

@NgModule({
  declarations: [InputComponent, ButtonComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    // MODULES
    CommonModule,
    ReactiveFormsModule,
    // COMPONENTS
    InputComponent,
    ButtonComponent
  ]
})
export class SharedModule { }
