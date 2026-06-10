import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { TemplateFormComponent } from './template-form/template-form.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormArryComponent } from './form-arry/form-arry.component';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';
import { FormEventsComponent } from './form-events/form-events.component';
import { RegistrationComponent } from './registration/registration.component';
@NgModule({
  declarations: [
    AppComponent,
    TemplateFormComponent,
    FormGroupComponent,
    FormBuilderComponent,
    FormArryComponent,
    EmpProfileComponent,
    FormEventsComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
