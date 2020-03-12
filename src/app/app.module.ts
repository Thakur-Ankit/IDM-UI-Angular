import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {MaterialModule} from './material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ReportsComponent} from './reports/reports.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptorService} from './token-interceptor.service';
import {AuthGuard} from './auth.guard';
import {HeaderComponent} from './header/header.component';
import {UsersComponent} from './users/users.component';
import {AgenciesComponent} from './agencies/agencies.component';
import {AdvertisersComponent} from './advertisers/advertisers.component';
import {CampaignsComponent} from './campaigns/campaigns.component';
import {MatTooltipModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReportsComponent,
    HeaderComponent,
    UsersComponent,
    AgenciesComponent,
    AdvertisersComponent,
    CampaignsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTooltipModule
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
