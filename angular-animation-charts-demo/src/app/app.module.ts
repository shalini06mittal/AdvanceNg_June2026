import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OpenCloseComponent } from './open-close/open-close.component';
import { CardComponent } from './card/card.component';
import { HeroListComponent } from './hero-list/hero-list.component'
import {NgChartsModule} from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    OpenCloseComponent,
    CardComponent,
    HeroListComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    AppRoutingModule, NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
