import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
        {path:'', component:HomeComponent},
        // {path:'login', component:LoginComponent}
        {path:'login',
                loadComponent:() => import('./login/login.component')
                .then(c => c.LoginComponent)
        }
];
