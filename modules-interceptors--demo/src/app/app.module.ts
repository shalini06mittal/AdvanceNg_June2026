import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeModule } from './home/home/home.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';
import { timeout } from 'rxjs';
import { LogInterceptor } from './interceptors/log.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AuthInterceptor } from './interceptors/aut.interceptor';
//https://blog.angular-university.io/angular2-ngmodule/

export const APP_CONFIG = 'APP_CONFIG';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, //HomeModule
  ],
  providers: [
    {
      provide: EmailService,
      useClass: SmsService
    },
    {
      provide: APP_CONFIG,
      useValue:{
        apiUrl: 'http://www.dummy.com',
        timeout: 5000
      }
    },
      {
      provide: 'COLORS',
      useValue: 'Red'
    },
      {
      provide: 'COLORS',
      useValue: 'Blue'
    },
    {
      provide: 'FONT_COLORS',
      useValue: 'Red',
      multi: true
    },
    {
      provide: 'FONT_COLORS',
      useValue: 'Blue',
      multi: true
    },
    {
      provide: 'FONT_COLORS',
      useValue: 'Green',
      multi: true
    },
    {provide:HTTP_INTERCEPTORS, useClass:LogInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
