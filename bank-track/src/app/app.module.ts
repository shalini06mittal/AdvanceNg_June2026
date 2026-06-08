import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StatusBadgeDirective } from './directives/status-badge.directive';
import { IfRoleDirective } from './directives/if-role.directive';
import { AccountMaskPipe } from './pipes/account-mask.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountListComponent,
    AccountDetailComponent,
    AccountFormComponent,
    DashboardComponent,
    StatusBadgeDirective,
    IfRoleDirective,
    AccountMaskPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
