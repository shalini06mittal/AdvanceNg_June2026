import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent {
    /**
     * FormControl
     * FormGroup
     * FormBuilder - service based API
     * FormArray - dynamic form elements
     */

    // Single Form Control
    // name = new FormControl('', 
    //   [Validators.required, Validators.minLength(5)]);

    // updateName(){
    //   this.name.setValue('Guest');
    // }
    // subscribe(){

    // }

    // Form Group

    profileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),   
      address : new FormGroup({
        city: new FormControl(),
        country: new FormControl(),
      })
    })

    get fname(){
      return this.profileForm.get('firstName');
    }

    submit(){
      console.log(this.profileForm.value);
      
    }

}
