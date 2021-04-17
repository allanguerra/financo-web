import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InputComponent } from '@src/app/shared/components/input/input.component';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { MainComponent } from '@src/app/shared/components/main/main.component';
import { NavComponent } from '@src/app/shared/components/nav/nav.component';
import { FabComponent } from '@src/app/shared/components/fab/fab.component';
import { SnackbarComponent } from '@src/app/shared/components/snackbar/snackbar.component';
import { ModalComponent } from '@src/app/shared/components/modal/modal.component';
import { FabModalComponent } from '@src/app/shared/components/fab-modal/fab-modal.component';
import { LoadderComponent } from '@src/app/shared/components/loadder/loadder.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    MainComponent,
    NavComponent,
    FabComponent,
    SnackbarComponent,
    ModalComponent,
    FabModalComponent,
    LoadderComponent
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
    NavComponent,
    SnackbarComponent,
    ModalComponent,
    FabModalComponent
  ]
})
export class SharedModule { }
