import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userNameValidator } from '../validators/user-name-validator';
import { passwordValidator } from '../validators/password-validator';
import { usernameExistsValidator } from '../validators/userNameExistsValidator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
     // create a FormBuilder instance
    this.registrationForm = this.fb.group(
      {
        userName: ['Shalini', 
            [Validators.required],//, Validators.minLength(3), userNameValidator],
            [usernameExistsValidator()]],
        email: [''],
        subscribe: [false],
        password: [''],
        confirmPassword: [''],
        address: this.fb.group({
          city: ['Mumbai'],
          state: ['Maharashtra'],
          postalcode: [400001]
        })
      },
      {
        validator: passwordValidator
      }
    )
   }
  ngOnInit(): void {
    this.registrationForm?.get('subscribe')?.valueChanges
    .subscribe( checkSubscribeValue =>{

        const email = this.registrationForm.get('email');
        // set or unser email validators
        if(checkSubscribeValue){
          email?.setValidators(Validators.required)
        }
        else 
          email?.clearValidators();

        email?.updateValueAndValidity()

    })
  }

   // getter for email control/field to keep code short in html file
  get emailControl() {
    return this.registrationForm.get('email');
  }
}
