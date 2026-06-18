import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // {path:'home', component:HomeComponent}
  {path:'login' , component:LoginComponent},
  {path:'home', 
    loadChildren: () => import('./home/home/home.module')
                        .then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
