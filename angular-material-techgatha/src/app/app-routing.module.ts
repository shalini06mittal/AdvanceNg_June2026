import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'employees', component: EmployeeListComponent
  },
  { path: 'employees/add', component: AddEmployeeComponent },
  { path: 'employees/:id', component: EmployeeDetailComponent },

  {
    path: 'settings', component: SettingsComponent
    // loadChildren: () =>
    //   import('./features/settings/settings.module').then(m => m.SettingsModule),
  },
  { path: '**', redirectTo: 'dashboard' },
  // {path:'employee', component:EmployeeComponent},
  // {path:'', component:HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
