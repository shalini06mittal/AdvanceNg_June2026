import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-arry',
  templateUrl: './form-arry.component.html',
  styleUrls: ['./form-arry.component.scss']
})
export class FormArryComponent {
      private fb = inject(FormBuilder);
      profileForm = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: [''],   
        address : this.fb.group({
          city: ['', [Validators.required]],
          country: ['', [Validators.required]],
        }),
        skills : this.fb.array([this.fb.control('')])
      });
      get fname(){
        return this.profileForm.get('firstName');
      }
  
      get skills(){
        return this.profileForm.controls['skills'] as FormArray;
      }
      submit(){
        console.log(this.profileForm.value);
        
      }
      addSkill(){
          this.skills.push(this.fb.control(''))
      }
}
