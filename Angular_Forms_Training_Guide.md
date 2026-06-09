# Angular Forms Training Guide

## Table of Contents

  - [Session Overview](#session-overview)
  - [3.1  What is FormBuilder?](#31-what-is-formbuilder)
    - [Why Use FormBuilder Instead of Manual Instantiation?](#why-use-formbuilder-instead-of-manual-instantiation)
    - [Injecting FormBuilder](#injecting-formbuilder)
  - [3.2  Building a Base Form Interface](#32-building-a-base-form-interface)
    - [Step 1 — Define the Interface](#step-1-define-the-interface)
    - [Step 2 — Build the FormGroup to Match the Interface](#step-2-build-the-formgroup-to-match-the-interface)
    - [Step 3 — HTML Template Binding](#step-3-html-template-binding)
  - [3.3  Nested FormGroups](#33-nested-formgroups)
    - [Scenario: Billing vs. Shipping Address](#scenario-billing-vs-shipping-address)
    - [Accessing Nested Controls Programmatically](#accessing-nested-controls-programmatically)
  - [3.4  FormArray — Dynamic Fields](#34-formarray-dynamic-fields)
    - [Creating and Accessing a FormArray](#creating-and-accessing-a-formarray)
    - [FormArray in the Template](#formarray-in-the-template)
  - [3.5  Nested FormGroups Inside a FormArray](#35-nested-formgroups-inside-a-formarray)
  - [3.6  Hands-On Lab — Session 3](#36-hands-on-lab-session-3)
  - [Session Overview](#session-overview)
  - [4.1  Reactive vs Template-Driven — Detailed Comparison](#41-reactive-vs-template-driven-detailed-comparison)
  - [4.2  FormControl Deep Dive](#42-formcontrol-deep-dive)
    - [Creating FormControl with Options](#creating-formcontrol-with-options)
    - [Checking State in the Template](#checking-state-in-the-template)
  - [4.3  valueChanges & statusChanges Observables](#43-valuechanges-statuschanges-observables)
    - [valueChanges — Live Character Counter Example](#valuechanges-live-character-counter-example)
    - [valueChanges — Dependent Dropdown (Country → State)](#valuechanges-dependent-dropdown-country-state)
    - [statusChanges — Disable Submit Button](#statuschanges-disable-submit-button)
  - [4.4  setValue, patchValue, and reset](#44-setvalue-patchvalue-and-reset)
    - [Code Examples](#code-examples)
  - [4.5  Enabling & Disabling Controls Reactively](#45-enabling-disabling-controls-reactively)
  - [4.6  Cross-Field Validation](#46-cross-field-validation)
  - [4.7  Hands-On Lab — Session 4](#47-hands-on-lab-session-4)
  - [Session Overview](#session-overview)
  - [5.1  Built-In Validators](#51-built-in-validators)
    - [Applying Multiple Validators](#applying-multiple-validators)
  - [5.2  Custom Validator Functions](#52-custom-validator-functions)
    - [Synchronous Custom Validator](#synchronous-custom-validator)
    - [Asynchronous Custom Validator (e.g. Username Availability Check)](#asynchronous-custom-validator-eg-username-availability-check)
  - [5.3  Displaying Validation Messages — Best Practices](#53-displaying-validation-messages-best-practices)
    - [Reusable Error Helper (TypeScript)](#reusable-error-helper-typescript)
    - [Template — Structured Error Display](#template-structured-error-display)
    - [Mandatory vs Optional Fields — Visual Convention](#mandatory-vs-optional-fields-visual-convention)
  - [5.4  Form Submission](#54-form-submission)
    - [Complete Submit Handler](#complete-submit-handler)
    - [Template — Submit Button States](#template-submit-button-states)
  - [5.5  Resetting the Form](#55-resetting-the-form)
    - [Reset After Successful API Call](#reset-after-successful-api-call)
    - [Resetting with Default Values](#resetting-with-default-values)
  - [5.6  Complete End-to-End Example](#56-complete-end-to-end-example)
    - [Component TypeScript](#component-typescript)
  - [5.7  Hands-On Lab — Session 5](#57-hands-on-lab-session-5)

Angular Forms
Training Guide

FormBuilder & Nested Forms  |  Reactive Approach  |  Reactive Submit & Validations

Total Duration: 210 minutes  (3.5 hours)


## Session Overview
This session introduces the Angular FormBuilder service, explains how to use it to construct reactive forms efficiently, and dives deep into building nested form groups and arrays — critical for real-world, complex UIs.


## 3.1  What is FormBuilder?
FormBuilder is an injectable helper service provided by Angular's @angular/forms module. It offers shorthand methods that reduce the verbosity of creating FormControl, FormGroup, and FormArray instances manually.

### Why Use FormBuilder Instead of Manual Instantiation?

### Injecting FormBuilder
```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]]
    });
  }
}
```
## 3.2  Building a Base Form Interface
A base form interface refers to the TypeScript interface (or type) that describes the shape of your form's data model. Defining this first keeps your form strongly typed and makes it easier to bind template controls.

### Step 1 — Define the Interface
```typescript
// models/user-profile.model.ts
export interface Address {
  street:  string;
  city:    string;
  state:   string;
  zipCode: string;
}
export interface UserProfile {
  firstName:   string;
  lastName:    string;
  email:       string;
  phoneNumber: string;
  address:     Address;
  skills:      string[];
}
```
### Step 2 — Build the FormGroup to Match the Interface
```typescript
this.profileForm = this.fb.group({
  firstName:   ['', Validators.required],
  lastName:    ['', Validators.required],
  email:       ['', [Validators.required, Validators.email]],
  phoneNumber: [''],
  address: this.fb.group({          // nested FormGroup
    street:  ['', Validators.required],
    city:    ['', Validators.required],
    state:   [''],
    zipCode: ['', Validators.pattern('^[0-9]{6}$')]
  }),
  skills: this.fb.array([])          // FormArray — filled dynamically
});
```
### Step 3 — HTML Template Binding
```typescript
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
  <input formControlName="firstName" placeholder="First Name" />
  <input formControlName="lastName"  placeholder="Last Name" />
  <input formControlName="email"     placeholder="Email" />
  <!-- Nested address group -->
  <div formGroupName="address">
    <input formControlName="street"  placeholder="Street" />
    <input formControlName="city"    placeholder="City" />
    <input formControlName="zipCode" placeholder="ZIP" />
  </div>
  <button type="submit">Submit</button>
</form>
```
## 3.3  Nested FormGroups
A nested FormGroup is a FormGroup inside another FormGroup. This mirrors hierarchical data structures (e.g. a user with a billing address and a shipping address) and allows independent validation and reset of sub-sections.

### Scenario: Billing vs. Shipping Address
```typescript
this.checkoutForm = this.fb.group({
  customer: this.fb.group({
    name:  ['', Validators.required],
    email: ['', Validators.email]
  }),
  billingAddress: this.fb.group({
    street: [''],
    city:   [''],
    pin:    ['']
  }),
  shippingAddress: this.fb.group({
    street: [''],
    city:   [''],
    pin:    ['']
  }),
  sameAsBilling: [false]
});
```
### Accessing Nested Controls Programmatically
```typescript
// Method 1 — get() with dot-path
const city = this.checkoutForm.get('billingAddress.city');
// Method 2 — chain get() calls
const city2 = this.checkoutForm
                   .get('billingAddress')
                   ?.get('city');
// Set value on a nested group
this.checkoutForm.get('shippingAddress')?.setValue({
  street: '221B Baker Street',
  city: 'London',
  pin: '110001'
});
```
## 3.4  FormArray — Dynamic Fields
A FormArray is an ordered collection of controls. It is perfect for dynamic lists: skills, phone numbers, line items, experience records, etc. Items can be added or removed at runtime.

### Creating and Accessing a FormArray
```typescript
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
```
### FormArray in the Template
```typescript
<div formArrayName="skills">
  <div *ngFor="let skill of skills.controls; let i = index">
    <input [formControlName]="i" placeholder="Skill {{ i + 1 }}" />
    <button type="button" (click)="removeSkill(i)">Remove</button>
  </div>
</div>
<button type="button" (click)="addSkill()">+ Add Skill</button>
```
## 3.5  Nested FormGroups Inside a FormArray
Real-world scenarios often require a list of complex objects — e.g., work experience records where each item has a company, role, and duration. This is achieved by pushing FormGroup instances (not flat FormControls) into the FormArray.

```typescript
// Each experience entry has three fields
createExperience(): FormGroup {
  return this.fb.group({
    company:  ['', Validators.required],
    role:     [''],
    years:    [null, [Validators.min(0), Validators.max(50)]]
  });
}
get experience(): FormArray {
  return this.profileForm.get('experience') as FormArray;
}
addExperience(): void {
  this.experience.push(this.createExperience());
}
<!-- Template for nested FormGroup inside FormArray -->
<div formArrayName="experience">
  <div *ngFor="let exp of experience.controls; let i = index"
       [formGroupName]="i">
    <input formControlName="company" placeholder="Company" />
    <input formControlName="role"    placeholder="Role" />
    <input formControlName="years"   placeholder="Years" type="number" />
    <button type="button" (click)="experience.removeAt(i)">Remove</button>
  </div>
</div>
```
## 3.6  Hands-On Lab — Session 3
Build a UserProfileForm with: personal info group, nested address FormGroup, and dynamic skills FormArray.
Add an 'Add Skill' button that appends a new required text field.
Add a 'Copy Billing to Shipping' button that copies one nested group's value to another.
```typescript
Display the form's live JSON value using {{ profileForm.value | json }}.
```
## Session Overview
This session provides a comprehensive exploration of Angular Reactive Forms: the underlying architecture, the FormControl lifecycle, observables (valueChanges & statusChanges), patchValue vs setValue, and advanced patterns including conditional fields and cross-field validation.


## 4.1  Reactive vs Template-Driven — Detailed Comparison


## 4.2  FormControl Deep Dive
FormControl is the atomic building block. Each FormControl tracks:
value — the current value
status — 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED'
dirty — true once user has changed the value
touched — true once the control has been blurred
pristine — true if value has never changed
errors — null or object describing validation failures

### Creating FormControl with Options
```typescript
import { FormControl, Validators } from '@angular/forms';
// Shorthand via FormBuilder
// ['initialValue', syncValidators, asyncValidators]
const ctrl = this.fb.control(
  { value: 'prefilled', disabled: false },
  { validators: [Validators.required, Validators.minLength(3)],
    updateOn: 'blur' }  // validate only on blur, not on every keystroke
);
```
### Checking State in the Template
```typescript
<!-- Show error only after user touches the field -->
<div *ngIf="form.get('email')?.invalid && form.get('email')?.touched">
  <span *ngIf="form.get('email')?.errors?.['required']">
    Email is required.
  </span>
  <span *ngIf="form.get('email')?.errors?.['email']">
    Enter a valid email address.
  </span>
</div>
```
## 4.3  valueChanges & statusChanges Observables
Every FormControl, FormGroup, and FormArray exposes two RxJS Observables. These are the cornerstone of a reactive, data-driven architecture.


### valueChanges — Live Character Counter Example
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
export class BioComponent implements OnInit, OnDestroy {
  bioLength = 0;
  private sub!: Subscription;
  ngOnInit(): void {
    this.sub = this.form.get('bio')!
      .valueChanges
      .pipe(
        debounceTime(300),          // wait 300ms after last keystroke
        distinctUntilChanged()       // ignore duplicate consecutive values
      )
      .subscribe((val: string) => {
        this.bioLength = val?.length ?? 0;
      });
  }
  ngOnDestroy(): void { this.sub.unsubscribe(); }
}
```
### valueChanges — Dependent Dropdown (Country → State)
```typescript
ngOnInit(): void {
  this.form.get('country')!.valueChanges.subscribe(country => {
    this.states = this.locationService.getStates(country);
    // Reset state selection when country changes
    this.form.get('state')!.reset('');
  });
}
```
### statusChanges — Disable Submit Button
```typescript
ngOnInit(): void {
  this.form.statusChanges.subscribe(status => {
    // status === 'VALID' | 'INVALID' | 'PENDING'
    this.isFormReady = (status === 'VALID');
  });
}
<!-- Template usage -->
<button type="submit" [disabled]="!isFormReady">Submit</button>
```
## 4.4  setValue, patchValue, and reset
These three methods allow programmatic updates to form values. Understanding the difference is essential to avoid runtime errors.


### Code Examples
```typescript
// setValue — complete profile from API
this.profileForm.setValue({
  firstName: 'Priya',
  lastName:  'Sharma',
  email:     'priya@example.com',
  phoneNumber: '9876543210',
  address: { street: '12 MG Road', city: 'Bengaluru', state: 'KA', zipCode: '560001' },
  skills: []
});
// patchValue — partial update
this.profileForm.patchValue({ email: 'new@example.com' });
// reset — clear all, mark as pristine & untouched
this.profileForm.reset();
// reset with specific values
this.profileForm.reset({ firstName: '', lastName: '' });
```
## 4.5  Enabling & Disabling Controls Reactively
```typescript
// Disable a control (value excluded from form.value)
this.form.get('promoCode')!.disable();
// Enable it again
this.form.get('promoCode')!.enable();
// Conditional: enable shipping address only if 'differentShipping' is checked
this.form.get('differentShipping')!.valueChanges.subscribe(isDiff => {
  const shippingGroup = this.form.get('shippingAddress') as FormGroup;
  if (isDiff) {
    shippingGroup.enable();
  } else {
    shippingGroup.disable();
    shippingGroup.reset();
  }
});
```
## 4.6  Cross-Field Validation
Sometimes validation depends on the relationship between two fields — e.g. a password and confirm-password pair. This is achieved using a validator on the FormGroup rather than on individual controls.

```typescript
// validators/password-match.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export function passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password        = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  };
}
// Apply to FormGroup
this.passwordForm = this.fb.group(
  {
    password:        ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  },
  { validators: passwordMatchValidator() }  // group-level validator
);
<!-- Display group-level error in template -->
<div *ngIf="passwordForm.errors?.['passwordMismatch'] && passwordForm.touched">
  Passwords do not match.
</div>
```
## 4.7  Hands-On Lab — Session 4
Create a ProductSearchForm with a search input. Subscribe to valueChanges with debounceTime(400) and call a mock search service.
Create a PasswordResetForm with password + confirmPassword and apply the cross-field passwordMatchValidator.
Add a 'Have a promo code?' checkbox that enables/disables a promoCode FormControl using statusChanges.
Pre-fill the form using patchValue from a mock API call, then implement a 'Clear Form' button using reset().



## Session Overview
This session covers the complete form submission lifecycle in Angular Reactive Forms: built-in and custom validators, displaying validation messages, handling form submit events, and resetting the form after a successful operation.


## 5.1  Built-In Validators

### Applying Multiple Validators
```typescript
this.form = this.fb.group({
  username: ['', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
    Validators.pattern('^[a-zA-Z0-9_]+$')  // alphanumeric + underscore only
  ]],
  age: [null, [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ]],
  terms: [false, Validators.requiredTrue]
});
```
## 5.2  Custom Validator Functions
When built-in validators are insufficient, you can write synchronous or asynchronous custom validators.

### Synchronous Custom Validator
```typescript
// validators/no-spaces.validator.ts
import { AbstractControl, ValidationErrors } from '@angular/forms';
export function noSpacesValidator(
  control: AbstractControl
): ValidationErrors | null {
  const hasSpaces = (control.value as string)?.includes(' ');
  return hasSpaces ? { noSpaces: true } : null;
}
// Usage in FormBuilder
username: ['', [Validators.required, noSpacesValidator]]
```
### Asynchronous Custom Validator (e.g. Username Availability Check)
```typescript
// validators/username-taken.validator.ts
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
export function usernameTakenValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(500).pipe(       // debounce 500ms
      switchMap(() => userService.checkUsername(control.value)),
      map(isTaken => isTaken ? { usernameTaken: true } : null),
      catchError(() => of(null)) // on network error, pass validation
    );
  };
}
// Usage — async validators are the 3rd argument
username: ['', [Validators.required], [usernameTakenValidator(this.userService)]]
```
## 5.3  Displaying Validation Messages — Best Practices
Never show error messages before the user has interacted with the field. The standard pattern is to show errors only when the control is both invalid AND touched (or dirty).

### Reusable Error Helper (TypeScript)
```typescript
// In your component
hasError(controlName: string, errorCode: string): boolean {
  const ctrl = this.form.get(controlName);
  return !!(ctrl?.invalid && ctrl?.touched && ctrl?.hasError(errorCode));
}
```
### Template — Structured Error Display
```typescript
<div class="form-field">
  <label for="email">Email *</label>
  <input id="email" formControlName="email"
         [class.is-invalid]="hasError('email', 'required') ||
                             hasError('email', 'email')" />
  <div class="error-messages">
    <small *ngIf="hasError('email', 'required')">
      Email address is required.
    </small>
    <small *ngIf="hasError('email', 'email')">
      Please enter a valid email address.
    </small>
  </div>
</div>
```
### Mandatory vs Optional Fields — Visual Convention

```typescript
// Optional field with conditional format validation
website: ['', [
  // Only validate format if user entered something
  (ctrl) => {
    if (!ctrl.value) return null;   // empty = valid (it's optional)
    return Validators.pattern(
      'https?://.+'
    )(ctrl);
  }
]]
```
## 5.4  Form Submission
Form submission in Angular Reactive Forms is handled via the (ngSubmit) event on the <form> element. The submit handler should: validate all fields, guard against double-submit, call an API, and handle success/error states.

### Complete Submit Handler
```typescript
export class RegistrationComponent {
  form!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError   = '';
  onSubmit(): void {
    // 1. Mark all fields as touched to trigger error display
    this.form.markAllAsTouched();
    // 2. Guard: do nothing if form is invalid
    if (this.form.invalid) return;
    // 3. Guard: prevent double-submit
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.submitError  = '';
    // 4. Call service
    this.userService.register(this.form.getRawValue()).subscribe({
      next: () => {
        this.submitSuccess = true;
        this.resetForm();
      },
      error: (err) => {
        this.submitError = err.message || 'Registration failed. Try again.';
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
```
### Template — Submit Button States
```typescript
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <!-- ... form fields ... -->
  <div *ngIf="submitError" class="alert alert-danger">
    {{ submitError }}
  </div>
  <div *ngIf="submitSuccess" class="alert alert-success">
    Registration successful!
  </div>
  <button type="submit" [disabled]="isSubmitting">
    <span *ngIf="!isSubmitting">Register</span>
    <span *ngIf="isSubmitting">Submitting...</span>
  </button>
</form>
```
## 5.5  Resetting the Form
Resetting a form after submission clears values and resets all control states (touched, dirty, pristine) back to their initial conditions.


### Reset After Successful API Call
```typescript
resetForm(): void {
  // Full reset — all null, all pristine/untouched
  this.form.reset();
  // Reset FormArray back to zero items
  (this.form.get('skills') as FormArray).clear();
  // Re-add one blank skill field as default
  this.addSkill();
  // Reset component-level state flags
  this.isSubmitting = false;
  this.submitError  = '';
  // Note: keep submitSuccess = true so confirmation message stays visible
}
```
### Resetting with Default Values
```typescript
// Reset to specific defaults (e.g. for a 'New Entry' workflow)
this.form.reset({
  firstName:   '',
  lastName:    '',
  email:       '',
  phoneNumber: '',
  address: {
    street: '',
    city:   'Mumbai',   // pre-fill city as default
    state:  'MH',
    zipCode: ''
  }
});
```
## 5.6  Complete End-to-End Example
The following is a full working example tying together all concepts from Session 5: form building, mandatory and optional fields, validations, submit handling, and reset.

### Component TypeScript
```typescript
@Component({ selector: 'app-contact', templateUrl: './contact.component.html' })
export class ContactComponent implements OnInit {
  form!: FormGroup;
  isSubmitting = false;
  constructor(private fb: FormBuilder, private contactSvc: ContactService) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      // Mandatory fields
      name:    ['', [Validators.required, Validators.minLength(2)]],
      email:   ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(20)]],
      // Optional fields (validated only if filled)
      phone:   ['', Validators.pattern('^[0-9]{10}$')],
      company: [''],
      agree:   [false, Validators.requiredTrue]
    });
  }
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.isSubmitting) return;
    this.isSubmitting = true;
    this.contactSvc.send(this.form.value).subscribe({
      next: ()    => { this.form.reset(); this.isSubmitting = false; },
      error: (e)  => { console.error(e);  this.isSubmitting = false; }
    });
  }
  hasError(ctrl: string, err: string): boolean {
    const c = this.form.get(ctrl);
    return !!(c?.invalid && c?.touched && c?.hasError(err));
  }
}
```
## 5.7  Hands-On Lab — Session 5
Build the ContactForm above from scratch using FormBuilder.
Add required field indicators (*) in the template.
Display specific error messages per validator (required, minLength, pattern, email, requiredTrue).
Implement the onSubmit() method with markAllAsTouched() guard and a simulated API call (setTimeout 1.5 s).
After submit, reset the form completely and show a success banner for 3 seconds using setTimeout.


Quick Reference Summary


End of Angular Forms Training Guide