import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.scss']
})
export class EmpProfileComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  bioLength = 0;
  private sub!: Subscription;
  isFormReady:boolean = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      userName: [
        {
          value: 'prefilled',
          disabled: true
        },
        {
          validators: [Validators.required],
          updateOn: 'blur'
        }
      ],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      address: this.fb.group({          // nested FormGroup
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: [''],
        zipCode: ['', Validators.pattern('^[0-9]{6}$')]
      }),
      skills: this.fb.array([]),          // FormArray — filled dynamically,
      experience: this.fb.array([
      ]),
      bio: ['']
    });
  }

  ngOnInit(): void {
    this.sub = this.profileForm.get('bio')!
      .valueChanges
      .pipe(
        debounceTime(300),          // wait 300ms after last keystroke
        distinctUntilChanged()       // ignore duplicate consecutive values
      )
      .subscribe((val: string) => {
        this.bioLength = val?.length ?? 0;
      });

      this.profileForm.statusChanges.subscribe(status => {
          // status === 'VALID' | 'INVALID' | 'PENDING'
          console.log('form status change ', status);
          
          this.isFormReady = (status === 'VALID');
  });
  }
  ngOnDestroy(): void { this.sub.unsubscribe(); }

  // Getter for type safety
  get skills(): FormArray {
    return this.profileForm.get('skills') as FormArray;
  }
  // Add a new skill field
  addSkill(): void {
    this.skills.push(this.fb.control('', Validators.required));
  }
  // Remove a skill field
  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  // Each experience entry has three fields
  createExperience(): FormGroup {
    return this.fb.group({
      company: ['', Validators.required],
      role: [''],
      years: [null, [Validators.min(0), Validators.max(50)]]
    });
  }
  get experience(): FormArray {
    return this.profileForm.get('experience') as FormArray;
  }
  addExperience(): void {
    this.experience.push(this.createExperience());
  }

  onSubmit() {
    console.log(this.profileForm.value);

  }

}
