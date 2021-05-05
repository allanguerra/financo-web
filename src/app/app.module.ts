import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { SharedModule } from '@src/app/shared/shared.module';

import { INTERCEPTORS_PROVIDER } from '@src/app/infra/interceptors';
import { ApplicationErrorHandler } from '@src/app/infra/error/error.handler';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    INTERCEPTORS_PROVIDER,
    {
      provide: ErrorHandler,
      useClass: ApplicationErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
