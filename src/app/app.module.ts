import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {MaterialModule} from './material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ReportsComponent } from './reports/reports.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
