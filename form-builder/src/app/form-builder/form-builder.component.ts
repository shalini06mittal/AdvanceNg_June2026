import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit{

  //profileForm!: FormGroup

  // constructor(private fb : FormBuilder){}
  
   ngOnInit(): void {
  //   this.profileForm = this.fb.group({
  //       firstName: ['', [Validators.required]],
  //       lastName: ['', [Validators.required]],   
  //       address : this.fb.group({
  //         city: ['', [Validators.required]],
  //         country: ['', [Validators.required]],
  //       })
  //   })
   }

      fb = inject(FormBuilder);
      profileForm = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: [''],   
        address : this.fb.group({
          city: ['', [Validators.required]],
          country: ['', [Validators.required]],
        })
      });
      get fname(){
        return this.profileForm.get('firstName');
      }
  
      submit(){
        console.log(this.profileForm.value);
        
      }
      updateProfile(){
        // this.profileForm.setValue({
        //   firstName:'Rocky',
        //   lastName : 'Singh',
        //   address:{
        //     city: 'Chicago',
        //     country: 'USA'
        //   }
        // })
        this.profileForm.patchValue({
          firstName:'Rocky',
          address:{  
            country: 'USA'
          }
        })
      }
}
