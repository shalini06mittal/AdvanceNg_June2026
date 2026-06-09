# Angular Reactive Forms — Comprehensive Lab Exercise Book

> **FormBuilder | Nested Forms | Validators | Submit | Reset | PatchValue | Multi-Step**

---

## Topics Covered

- Lab 1: Complex Form with FormBuilder and Nested Forms
- Lab 2: Custom Validators
- Lab 3: Handling Form Submit
- Lab 4: Form Reset
- Lab 5: Partial Updates with patchValue
- Lab 6: Multi-Step Form

---

## Table of Contents

- [Lab 1: Complex Form with FormBuilder and Nested Forms](#lab-1-complex-form-with-formbuilder-and-nested-forms)
  - [1.1 Objectives](#11-objectives)
  - [1.2 Prerequisites](#12-prerequisites)
  - [1.3 Form Structure](#13-form-structure)
  - [1.4 Tasks](#14-tasks)
  - [1.5 Expected Valid Form Value](#15-expected-valid-form-value)
- [Lab 2: Custom Validators](#lab-2-custom-validators)
  - [2.1 Objectives](#21-objectives)
  - [2.2 Tasks](#22-tasks)
  - [2.3 Key Concept](#23-key-concept)
- [Lab 3: Handling Form Submit](#lab-3-handling-form-submit)
  - [3.1 Objectives](#31-objectives)
  - [3.2 Tasks](#32-tasks)
  - [3.3 Key APIs](#33-key-apis)
- [Lab 4: Form Reset](#lab-4-form-reset)
  - [4.1 Objectives](#41-objectives)
  - [4.2 Tasks](#42-tasks)
  - [4.3 Key APIs](#43-key-apis)
- [Lab 5: Partial Updates with patchValue](#lab-5-partial-updates-with-patchvalue)
  - [5.1 Objectives](#51-objectives)
  - [5.2 Tasks](#52-tasks)
  - [5.3 Key APIs](#53-key-apis)
- [Lab 6: Multi-Step Form](#lab-6-multi-step-form)
  - [6.1 Objectives](#61-objectives)
  - [6.2 Steps Definition](#62-steps-definition)
  - [6.3 Tasks](#63-tasks)
- [Solutions](#solutions)
  - [Solution — Lab 1](#solution--lab-1-formbuilder--nested-forms)
  - [Solution — Lab 2](#solution--lab-2-custom-validators)
  - [Solution — Lab 3](#solution--lab-3-handling-form-submit)
  - [Solution — Lab 4](#solution--lab-4-form-reset)
  - [Solution — Lab 5](#solution--lab-5-partial-updates-with-patchvalue)
  - [Solution — Lab 6](#solution--lab-6-multi-step-form)
- [Quick Reference Card](#quick-reference-card)

---

## Lab 1: Complex Form with FormBuilder and Nested Forms

In this lab you will build a multi-section Employee Onboarding form using Angular's FormBuilder. The form contains a nested FormGroup for address details and a FormArray for managing multiple emergency contacts.

### 1.1 Objectives

- Use FormBuilder to construct a reactive form without manual instantiation.
- Nest a FormGroup inside another FormGroup.
- Use a FormArray to manage a dynamic list of sub-forms.
- Apply Angular's built-in validators (no custom validators in this lab).
- Display per-field validation error messages in the template.

### 1.2 Prerequisites

- Angular CLI installed and a working Angular project created with `ng new angular-forms-lab`.
- `ReactiveFormsModule` imported in `AppModule`.
- Basic understanding of Angular components and data binding.

### 1.3 Form Structure

The form is divided into three logical sections:

#### Section 1 — Personal Information

| Field | Control Name | Validators |
|---|---|---|
| First Name | `firstName` | `required`, `minLength(2)` |
| Last Name | `lastName` | `required`, `minLength(2)` |
| Email | `email` | `required`, `email` |
| Phone | `phone` | `required`, `pattern(10 digits)` |
| Date of Birth | `dateOfBirth` | `required` |

#### Section 2 — Address (nested FormGroup: `address`)

| Field | Control Name | Validators |
|---|---|---|
| Street | `street` | `required` |
| City | `city` | `required` |
| State | `state` | `required` |
| Zip Code | `zipCode` | `required`, `pattern(6 digits)` |

#### Section 3 — Emergency Contacts (FormArray: `emergencyContacts`)

Each entry in the FormArray is itself a FormGroup with the following fields:

- `name` — required
- `relationship` — required
- `phone` — required, pattern 10 digits

The array must start with one pre-filled contact. The user can add up to 3 contacts and remove any contact (minimum 1 must remain).

### 1.4 Tasks

| # | Task | Description |
|---|---|---|
| **Task 1** | **Build the Form** | In the component class, inject FormBuilder and use `fb.group()` to build the entire form. Use `fb.array()` for `emergencyContacts`. Create a helper method `createContact()` that returns a new contact FormGroup. |
| **Task 2** | **Bind the Template** | In the template, bind all controls using `formControlName`, `formGroupName` (for address), and `formArrayName` + `[formGroupName]="i"` (for emergencyContacts). |
| **Task 3** | **Validation Error Messages** | Display inline error messages for each field. Show messages only when the control is invalid AND (dirty OR touched). Use these messages: `required` → `'This field is required.'`, `minlength` → `'Too short.'`, `email` → `'Enter a valid email address.'`, `pattern` → `'Invalid format.'` |
| **Task 4** | **Add Contact Button** | Add a button that appends a new empty contact FormGroup to the array. Disable it when the array already has 3 contacts. |
| **Task 5** | **Remove Contact Button** | Add a Remove button next to each contact. Disable it when only 1 contact remains. |
| **Task 6** | **Form Submission** | On submit: if invalid, call `markAllAsTouched()` to reveal all errors. If valid, log the value to the console and show a success alert. |

### 1.5 Expected Valid Form Value

```json
{
  "firstName": "Riya",
  "lastName": "Sharma",
  "email": "riya@example.com",
  "phone": "9876543210",
  "dateOfBirth": "1995-06-15",
  "address": {
    "street": "12 MG Road",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001"
  },
  "emergencyContacts": [
    { "name": "Arun Sharma", "relationship": "Father", "phone": "9123456780" }
  ]
}
```

---

## Lab 2: Custom Validators

Extend the Employee Onboarding form from Lab 1 by replacing or supplementing some of the built-in validators with your own custom validator functions.

### 2.1 Objectives

- Write a synchronous custom validator function.
- Write a cross-field (group-level) custom validator.
- Apply custom validators alongside built-in validators.
- Surface custom error keys in the template.

### 2.2 Tasks

| # | Task | Description |
|---|---|---|
| **Task 1** | **No Numeric Characters in Name** | Write a custom validator called `noNumbers`. It should return `{ noNumbers: true }` if the value contains any digit (0–9), otherwise `null`. Apply it to `firstName` and `lastName`. |
| **Task 2** | **Phone Format Validator** | Write a custom validator called `indianPhone`. It should return `{ indianPhone: true }` if the value is not exactly 10 digits OR does not start with 6, 7, 8, or 9. Apply it to all phone fields. |
| **Task 3** | **Zip Code City Mismatch** | Write a cross-field validator at the `address` FormGroup level called `zipCityMatch`. Simulate this rule: if city is `'Mumbai'` the `zipCode` must start with `'4'`. Return `{ zipCityMismatch: true }` if violated. |
| **Task 4** | **Template Error Messages** | For each custom validator, add the appropriate error message in the template using the custom error key (e.g., `errors?.['noNumbers']`). |
| **Task 5** | **Validator Unit Test (bonus)** | Write a simple unit test using Jasmine/Jest to verify that `noNumbers` returns `null` for `'Riya'` and returns `{ noNumbers: true }` for `'R1ya'`. |

### 2.3 Key Concept

A custom validator is a plain function with this signature:

```typescript
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function myValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  // return null  = valid
  // return { errorKey: true }  = invalid
}
```

For a cross-field validator, pass it as the second argument to `fb.group()`:

```typescript
this.fb.group({ ... }, { validators: myGroupValidator })
```

---

## Lab 3: Handling Form Submit

In this lab you will implement a complete and robust form submission flow for the Employee Onboarding form, including loading states, server error simulation, and user feedback.

### 3.1 Objectives

- Prevent submission when the form is invalid.
- Disable the submit button during an async operation.
- Simulate an HTTP POST call using RxJS.
- Handle success and error responses with user-facing messages.
- Re-enable the form after a failed submission.

### 3.2 Tasks

| # | Task | Description |
|---|---|---|
| **Task 1** | **Guard Invalid Submit** | In `onSubmit()`, if the form is invalid call `markAllAsTouched()` and return early. Only continue if the form is valid. |
| **Task 2** | **Loading State** | Add a boolean property `isSubmitting = false`. Set it to `true` before the fake HTTP call and back to `false` in both success and error callbacks. Bind `[disabled]="isSubmitting"` to the submit button and change the label to `'Submitting...'` while loading. |
| **Task 3** | **Simulate HTTP POST** | Use `of(formValue).pipe(delay(1500))` to simulate a 1.5-second server call. On success, display a green banner: `'Employee registered successfully!'`. On error, display a red banner: `'Submission failed. Please try again.'` |
| **Task 4** | **Disable Form During Submit** | Call `employeeForm.disable()` before the fake call and `employeeForm.enable()` after it completes (in `finalize` or both callbacks) so the user cannot edit fields while submitting. |
| **Task 5** | **Submission Summary** | After a successful submit, render a read-only summary beneath the form showing the submitted `firstName`, `lastName`, `email`, and `phone` values. |

### 3.3 Key APIs

- `form.markAllAsTouched()` — triggers all error messages
- `form.disable()` / `form.enable()` — locks or unlocks all controls
- `form.valid` / `form.invalid` — boolean status flags
- `of(value).pipe(delay(ms))` — simulate async operation with RxJS

---

## Lab 4: Form Reset

Learn the difference between resetting a form to empty values versus resetting it to specific default values, and how to selectively reset parts of the form.

### 4.1 Objectives

- Use `form.reset()` to clear all values and pristine/touched states.
- Use `form.reset(value)` to restore specific default values.
- Reset only a nested FormGroup or a single FormControl.
- Reset a FormArray back to a single entry.

### 4.2 Tasks

| # | Task | Description |
|---|---|---|
| **Task 1** | **Full Reset Button** | Add a `'Clear Form'` button. On click, call `employeeForm.reset()`. Verify that all fields are cleared, all error states disappear, and the form returns to pristine/untouched. |
| **Task 2** | **Reset to Defaults** | Add a `'Reset to Defaults'` button. On click, call `employeeForm.reset()` with a partial object that pre-fills `firstName: ''`, `lastName: ''`, and `address.city: 'Mumbai'`. Confirm only those fields are pre-filled. |
| **Task 3** | **Reset Address Section Only** | Add a `'Clear Address'` button that calls `employeeForm.get('address')?.reset()`. Verify that only the address section clears while personal info and emergency contacts remain untouched. |
| **Task 4** | **Reset FormArray** | Add a `'Reset Contacts'` button. On click, clear the `emergencyContacts` array completely and push one fresh empty contact back in, restoring it to its initial state. |
| **Task 5** | **Dirty State Indicator** | Add a label near the submit button that reads `'You have unsaved changes'` when the form is dirty and hides when pristine. Verify it disappears after any reset. |

### 4.3 Key APIs

- `form.reset()` — clears values and marks pristine/untouched
- `form.reset(partialValue)` — restores specific field values
- `formArray.clear()` — removes all FormArray entries
- `form.pristine` / `form.dirty` — state flags

---

## Lab 5: Partial Updates with patchValue

Use `patchValue` to update only specific parts of the form without affecting other controls. This is common when pre-filling a form with data from an API.

### 5.1 Objectives

- Understand the difference between `setValue` (all fields required) and `patchValue` (partial update).
- Use `patchValue` to populate the form from a mock API response.
- Patch only a nested FormGroup.
- Patch a single FormControl programmatically.

### 5.2 Tasks

| # | Task | Description |
|---|---|---|
| **Task 1** | **Pre-fill from Mock API** | Create a method `loadEmployee()`. Define a mock employee object with `firstName`, `lastName`, `email`, and `address` (but not `phone` or `emergencyContacts`). Call `employeeForm.patchValue(mockEmployee)` and verify only provided fields are filled. |
| **Task 2** | **Load Button** | Add a `'Load Sample Data'` button that calls `loadEmployee()`. Add a second button `'Load Address Only'` that calls `employeeForm.get('address')?.patchValue({ city: 'Pune', state: 'Maharashtra' })`. |
| **Task 3** | **Patch a FormArray Entry** | Add a `'Prefill First Contact'` button. On click, patch only the first emergency contact using `(this.contacts.at(0) as FormGroup).patchValue({ name: 'Priya Sharma', relationship: 'Spouse' })`. |
| **Task 4** | **setValue vs patchValue** | In a comment block in your component, write a brief explanation of why `employeeForm.setValue(incompleteObject)` would throw an error while `employeeForm.patchValue(incompleteObject)` would not. |
| **Task 5** | **Dirty Check After Patch** | After calling `patchValue`, check whether the form is dirty. Log the result. Then call `form.markAsPristine()` and verify the dirty state clears. Add a comment explaining when you'd do this in a real app. |

### 5.3 Key APIs

- `form.patchValue(obj)` — updates only the keys present in `obj`
- `form.setValue(obj)` — requires every control to be present; throws on missing keys
- `control.markAsPristine()` — resets the dirty flag
- `control.markAsDirty()` — marks a control as modified

---

## Lab 6: Multi-Step Form

Refactor the Employee Onboarding form into a 3-step wizard. Each step shows one section of the form. The user can only advance to the next step when the current step's section is valid.

### 6.1 Objectives

- Split the single form into multiple steps without splitting the FormGroup.
- Validate only the controls relevant to the current step before allowing navigation.
- Show a progress indicator (Step 1 of 3, Step 2 of 3, etc.).
- Display a summary on the final step before submission.

### 6.2 Steps Definition

| Step | Section | Controls |
|---|---|---|
| **Step 1** | Personal Information | `firstName`, `lastName`, `email`, `phone`, `dateOfBirth` |
| **Step 2** | Address | entire `address` nested FormGroup |
| **Step 3** | Emergency Contacts + Review | `emergencyContacts` FormArray + read-only summary of Steps 1 & 2 |

### 6.3 Tasks

| # | Task | Description |
|---|---|---|
| **Task 1** | **Step State** | Add `currentStep = 1` to the component. Show or hide each section using `*ngIf="currentStep === N"`. Add `'Next'` and `'Back'` buttons for navigation. |
| **Task 2** | **Per-Step Validation** | Before advancing from Step 1, mark the Step 1 controls as touched and check each one is valid. Do the same for the `address` FormGroup before advancing from Step 2. Do not allow moving forward if the current step has invalid controls. |
| **Task 3** | **Progress Bar** | At the top of the form, show `'Step {{ currentStep }} of 3'` and a visual progress bar using a `div` with `[style.width]="(currentStep / 3 * 100) + '%'"`. |
| **Task 4** | **Review Summary** | On Step 3, before the emergency contacts section, display a read-only summary table showing all values entered in Steps 1 and 2. |
| **Task 5** | **Final Submit** | Show the Submit button only on Step 3. Reuse the same submission logic from Lab 3, including loading state and success/error banners. |

---

## Solutions

> Attempt each lab independently before consulting the solution below.

---

### Solution — Lab 1: FormBuilder + Nested Forms

#### `employee-form.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName:   ['', [Validators.required, Validators.minLength(2)]],
      lastName:    ['', [Validators.required, Validators.minLength(2)]],
      email:       ['', [Validators.required, Validators.email]],
      phone:       ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dateOfBirth: ['', Validators.required],

      address: this.fb.group({
        street:  ['', Validators.required],
        city:    ['', Validators.required],
        state:   ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
      }),

      emergencyContacts: this.fb.array([this.createContact()])
    });
  }

  createContact(): FormGroup {
    return this.fb.group({
      name:         ['', Validators.required],
      relationship: ['', Validators.required],
      phone:        ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  get contacts(): FormArray {
    return this.employeeForm.get('emergencyContacts') as FormArray;
  }

  addContact(): void {
    if (this.contacts.length < 3) this.contacts.push(this.createContact());
  }

  removeContact(i: number): void {
    if (this.contacts.length > 1) this.contacts.removeAt(i);
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }
    console.log(this.employeeForm.value);
    alert('Form submitted successfully!');
  }
}
```

#### `employee-form.component.html` (key excerpt)

```html
<form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">

  <!-- Personal Information -->
  <div>
    <label>First Name</label>
    <input formControlName="firstName" />
    <span *ngIf="employeeForm.get('firstName')?.invalid
               && employeeForm.get('firstName')?.touched">
      <span *ngIf="employeeForm.get('firstName')?.errors?.['required']">
        This field is required.
      </span>
      <span *ngIf="employeeForm.get('firstName')?.errors?.['minlength']">
        Too short.
      </span>
    </span>
  </div>

  <!-- Address (nested FormGroup) -->
  <div formGroupName="address">
    <input formControlName="street" />
    <input formControlName="city" />
    <input formControlName="state" />
    <input formControlName="zipCode" />
  </div>

  <!-- Emergency Contacts (FormArray) -->
  <div formArrayName="emergencyContacts">
    <div *ngFor="let c of contacts.controls; let i = index"
         [formGroupName]="i">
      <input formControlName="name" />
      <input formControlName="relationship" />
      <input formControlName="phone" />
      <button type="button" (click)="removeContact(i)"
              [disabled]="contacts.length === 1">Remove</button>
    </div>
  </div>

  <button type="button" (click)="addContact()"
          [disabled]="contacts.length === 3">Add Contact</button>

  <button type="submit">Submit</button>

</form>
```

---

### Solution — Lab 2: Custom Validators

#### `validators/custom.validators.ts`

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Task 1: No numeric characters in name
export function noNumbers(control: AbstractControl): ValidationErrors | null {
  return /\d/.test(control.value ?? '') ? { noNumbers: true } : null;
}

// Task 2: Indian mobile number (10 digits, starts with 6–9)
export function indianPhone(control: AbstractControl): ValidationErrors | null {
  const val = control.value ?? '';
  return /^[6-9]\d{9}$/.test(val) ? null : { indianPhone: true };
}

// Task 3: Cross-field — zip must start with '4' when city is Mumbai
export function zipCityMatch(group: AbstractControl): ValidationErrors | null {
  const city = group.get('city')?.value ?? '';
  const zip  = group.get('zipCode')?.value ?? '';
  if (city.toLowerCase() === 'mumbai' && !zip.startsWith('4')) {
    return { zipCityMismatch: true };
  }
  return null;
}
```

#### Applying validators in `ngOnInit`

```typescript
import { noNumbers, indianPhone, zipCityMatch } from './validators/custom.validators';

this.employeeForm = this.fb.group({
  firstName: ['', [Validators.required, Validators.minLength(2), noNumbers]],
  lastName:  ['', [Validators.required, Validators.minLength(2), noNumbers]],
  phone:     ['', [Validators.required, indianPhone]],
  // ...
  address: this.fb.group({
    street:  ['', Validators.required],
    city:    ['', Validators.required],
    state:   ['', Validators.required],
    zipCode: ['', Validators.required],
  }, { validators: zipCityMatch }),  // <-- group-level validator
  // ...
});
```

#### Template error messages for custom validators

```html
<span *ngIf="employeeForm.get('firstName')?.errors?.['noNumbers']">
  Name must not contain numbers.
</span>

<span *ngIf="employeeForm.get('phone')?.errors?.['indianPhone']">
  Enter a valid 10-digit Indian mobile number.
</span>

<span *ngIf="employeeForm.get('address')?.errors?.['zipCityMismatch']">
  Zip code does not match the selected city.
</span>
```

---

### Solution — Lab 3: Handling Form Submit

#### Component additions

```typescript
import { of } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

isSubmitting  = false;
submitSuccess = false;
submitError   = false;
submittedData: any = null;

onSubmit(): void {
  if (this.employeeForm.invalid) {
    this.employeeForm.markAllAsTouched();
    return;
  }

  this.isSubmitting  = true;
  this.submitSuccess = false;
  this.submitError   = false;
  this.employeeForm.disable();

  of(this.employeeForm.value)
    .pipe(
      delay(1500),
      finalize(() => {
        this.isSubmitting = false;
        this.employeeForm.enable();
      })
    )
    .subscribe({
      next: (data) => {
        this.submitSuccess = true;
        this.submittedData = data;
      },
      error: () => {
        this.submitError = true;
      }
    });
}
```

#### Template additions

```html
<!-- Success banner -->
<div *ngIf="submitSuccess" style="color: green;">
  Employee registered successfully!
</div>

<!-- Error banner -->
<div *ngIf="submitError" style="color: red;">
  Submission failed. Please try again.
</div>

<!-- Submit button with loading state -->
<button type="submit" [disabled]="isSubmitting">
  {{ isSubmitting ? 'Submitting...' : 'Submit' }}
</button>

<!-- Submission summary -->
<div *ngIf="submittedData">
  <h3>Submitted Details</h3>
  <p>Name: {{ submittedData.firstName }} {{ submittedData.lastName }}</p>
  <p>Email: {{ submittedData.email }}</p>
  <p>Phone: {{ submittedData.phone }}</p>
</div>
```

---

### Solution — Lab 4: Form Reset

#### Component methods

```typescript
// Task 1: Full reset
clearForm(): void {
  this.employeeForm.reset();
}

// Task 2: Reset with defaults
resetToDefaults(): void {
  this.employeeForm.reset({
    firstName: '',
    lastName:  '',
    address: { city: 'Mumbai' }
  });
}

// Task 3: Reset address section only
clearAddress(): void {
  this.employeeForm.get('address')?.reset();
}

// Task 4: Reset FormArray to one blank contact
resetContacts(): void {
  this.contacts.clear();
  this.contacts.push(this.createContact());
}
```

#### Template additions

```html
<button type="button" (click)="clearForm()">Clear Form</button>
<button type="button" (click)="resetToDefaults()">Reset to Defaults</button>
<button type="button" (click)="clearAddress()">Clear Address</button>
<button type="button" (click)="resetContacts()">Reset Contacts</button>

<!-- Dirty state indicator -->
<span *ngIf="employeeForm.dirty" style="color: orange;">
  You have unsaved changes
</span>
```

---

### Solution — Lab 5: Partial Updates with patchValue

#### Component methods

```typescript
// Task 1: Pre-fill from mock API
loadEmployee(): void {
  const mockEmployee = {
    firstName: 'Riya',
    lastName:  'Sharma',
    email:     'riya@example.com',
    address: {
      street: '12 MG Road',
      city:   'Mumbai',
      state:  'Maharashtra'
      // zipCode intentionally omitted — patchValue is fine with this
    }
  };
  this.employeeForm.patchValue(mockEmployee);
}

// Task 2: Patch address only
loadAddressOnly(): void {
  this.employeeForm.get('address')?.patchValue({
    city:  'Pune',
    state: 'Maharashtra'
  });
}

// Task 3: Patch first emergency contact
prefillFirstContact(): void {
  (this.contacts.at(0) as FormGroup).patchValue({
    name:         'Priya Sharma',
    relationship: 'Spouse'
  });
}

// Task 5: Dirty check after patch
loadAndCheckDirty(): void {
  this.loadEmployee();
  console.log('Dirty after patch:', this.employeeForm.dirty);  // true
  this.employeeForm.markAsPristine();
  console.log('Dirty after markAsPristine:', this.employeeForm.dirty);  // false
  // Use case: mark pristine after loading server data so the 'unsaved changes'
  // warning only shows if the user edits from that point forward.
}
```

#### Task 4 — setValue vs patchValue (comment block)

```typescript
/*
  setValue() requires EVERY control in the form to be present in
  the object you pass. If any key is missing, Angular throws:
    'Must supply a value for form control with name: phone'

  patchValue() is lenient — it only updates the keys you provide
  and silently ignores any controls not present in the object.

  Rule of thumb:
    Use setValue when you have the full model (e.g., an edit screen).
    Use patchValue when you only have partial data (e.g., pre-fill).
*/
```

---

### Solution — Lab 6: Multi-Step Form

#### Component additions

```typescript
currentStep = 1;
totalSteps  = 3;

// Task 2: Validate step before advancing
nextStep(): void {
  if (this.currentStep === 1) {
    const step1Controls = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth'];
    step1Controls.forEach(name => {
      this.employeeForm.get(name)?.markAsTouched();
    });
    const step1Invalid = step1Controls.some(
      name => this.employeeForm.get(name)?.invalid
    );
    if (step1Invalid) return;
  }

  if (this.currentStep === 2) {
    const addressGroup = this.employeeForm.get('address') as FormGroup;
    Object.values(addressGroup.controls).forEach(c => c.markAsTouched());
    if (addressGroup.invalid) return;
  }

  this.currentStep++;
}

prevStep(): void {
  if (this.currentStep > 1) this.currentStep--;
}
```

#### Template — progress bar and step rendering

```html
<!-- Progress indicator -->
<div>
  <span>Step {{ currentStep }} of {{ totalSteps }}</span>
  <div style="background:#eee; height:8px; border-radius:4px;">
    <div [style.width]="(currentStep / totalSteps * 100) + '%'"
         style="background:#2E75B6; height:8px; border-radius:4px;">
    </div>
  </div>
</div>

<!-- Step 1: Personal Information -->
<div *ngIf="currentStep === 1">
  <!-- firstName, lastName, email, phone, dateOfBirth inputs here -->
</div>

<!-- Step 2: Address -->
<div *ngIf="currentStep === 2" formGroupName="address">
  <!-- street, city, state, zipCode inputs here -->
</div>

<!-- Step 3: Review + Contacts -->
<div *ngIf="currentStep === 3">
  <!-- Review summary table -->
  <table>
    <tr>
      <td>Name</td>
      <td>{{ employeeForm.get('firstName')?.value }}
          {{ employeeForm.get('lastName')?.value }}</td>
    </tr>
    <tr>
      <td>Email</td>
      <td>{{ employeeForm.get('email')?.value }}</td>
    </tr>
    <tr>
      <td>City</td>
      <td>{{ employeeForm.get('address.city')?.value }}</td>
    </tr>
  </table>

  <!-- Emergency contacts FormArray here -->

  <!-- Submit button -->
  <button type="submit" [disabled]="isSubmitting">
    {{ isSubmitting ? 'Submitting...' : 'Submit' }}
  </button>
</div>

<!-- Navigation buttons -->
<button type="button" (click)="prevStep()"
        *ngIf="currentStep > 1">Back</button>

<button type="button" (click)="nextStep()"
        *ngIf="currentStep < totalSteps">Next</button>
```

---

## Quick Reference Card

| API / Method | Description |
|---|---|
| `fb.group({})` | Create a FormGroup using FormBuilder |
| `fb.array([])` | Create a FormArray using FormBuilder |
| `fb.control('')` | Create a FormControl using FormBuilder |
| `Validators.required` | Built-in: field must not be empty |
| `Validators.minLength(n)` | Built-in: minimum character count |
| `Validators.email` | Built-in: must match email format |
| `Validators.pattern(rx)` | Built-in: value must match regex |
| `form.valid` / `form.invalid` | Boolean status of the entire form |
| `form.markAllAsTouched()` | Mark all controls as touched (show errors) |
| `form.disable()` / `form.enable()` | Lock or unlock all controls |
| `form.reset()` | Clear values and mark pristine/untouched |
| `form.reset(obj)` | Reset to specific partial default values |
| `form.patchValue(obj)` | Update only the keys provided (partial) |
| `form.setValue(obj)` | Update all keys (throws if any missing) |
| `array.push(group)` | Add a new entry to a FormArray |
| `array.removeAt(i)` | Remove entry at index `i` from FormArray |
| `array.clear()` | Remove all entries from FormArray |
| `array.at(i)` | Get entry at index `i` from FormArray |
| `form.get('a.b')` | Access nested control by dot-path |
| `control.markAsPristine()` | Reset the dirty flag |
| `control.markAsDirty()` | Mark control as modified |
| `control.dirty` / `control.pristine` | Modified state flags |
| `control.touched` / `control.untouched` | User-interaction state flags |
