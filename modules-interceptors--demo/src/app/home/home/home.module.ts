import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ContactComponent } from './contact.component';
import { LessonsService } from 'src/app/services/lessons.service';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [{
        path: '', component:HomeComponent
    }];

@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports:[
   // HomeComponent
  ],
  providers:[
  //  LessonsService
  ]
})
export class HomeModule { }
