import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from '@src/app/shared/components/input/input.component';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { MainComponent } from './components/main/main.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [InputComponent, ButtonComponent, MainComponent],
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
    ButtonComponent
  ]
})
export class SharedModule { }
