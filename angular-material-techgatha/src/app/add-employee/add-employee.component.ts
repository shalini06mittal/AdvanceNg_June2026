import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  form!:FormGroup;
  departments = ['Engineering', 'Design', 'HR', 'Finance', 'Marketing'];
  statuses    = ['active', 'on-leave', 'inactive'];
  isSubmitting = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName:  ['', [Validators.required, Validators.minLength(2)]],
      lastName:   ['', [Validators.required, Validators.minLength(2)]],
      email:      ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      role:       ['', Validators.required],
      salary:     [null, [Validators.required, Validators.min(30000)]],
      status:     ['active', Validators.required],
      joinDate:   [null, Validators.required],
    });
  }

  getError(field: string): string {
    const c = this.form.get(field);
    if (c?.hasError('required'))   return 'This field is required';
    if (c?.hasError('email'))      return 'Enter a valid email address';
    if (c?.hasError('minlength'))  return `Minimum ${c.errors?.['minlength'].requiredLength} characters`;
    if (c?.hasError('min'))        return 'Salary must be at least 30,000';
    return '';
  }

  onSubmit(): void {
    // if (this.form.valid) { console.log(this.form.value); }
    // else { this.form.markAllAsTouched(); }
    
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    // Simulate API call delay
    setTimeout(() => {
      console.log(this.form.value);
      
      this.isSubmitting = false;
      this.snackBar.open('Employee added successfully!', 'OK', {
        duration: 3000,
        panelClass: ['snack-success'],
      });
      this.router.navigate(['/employees']);
    }, 1000);
  }

  onReset(): void {
    this.form.reset({ status: 'active' });
  }


}
