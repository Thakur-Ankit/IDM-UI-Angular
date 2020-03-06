import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ReportsComponent} from './reports/reports.component';
import {AuthGuard} from './auth.guard';
import {UsersComponent} from './users/users.component';
import {AgenciesComponent} from './agencies/agencies.component';
import {AdvertisersComponent} from './advertisers/advertisers.component';
import {CampaignsComponent} from './campaigns/campaigns.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'agencies',
    component: AgenciesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'advertisers',
    component: AdvertisersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'campaigns',
    component: CampaignsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
