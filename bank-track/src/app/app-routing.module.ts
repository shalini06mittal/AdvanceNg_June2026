import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { authGuard }           from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  { path: '',                 redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',        component: DashboardComponent },
  { path: 'login',             component: LoginComponent },
  { path: 'accounts',         component: AccountListComponent,   canActivate: [authGuard] },
  { path: 'accounts/new',     component: AccountFormComponent,   canActivate: [authGuard] },
  { path: 'accounts/edit/:id',component: AccountFormComponent,   canActivate: [authGuard] },
  { path: 'accounts/:id',     component: AccountDetailComponent, canActivate: [authGuard] },
  { path: '**',               redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
