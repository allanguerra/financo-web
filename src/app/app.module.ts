import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { SharedModule } from '@src/app/shared/shared.module';

import { INTERCEPTORS_PROVIDER } from '@src/app/infra/interceptors';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [INTERCEPTORS_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
