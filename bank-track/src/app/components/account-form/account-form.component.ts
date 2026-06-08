import { Component, OnInit }  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html'
})
export class AccountFormComponent implements OnInit {
  form!:   FormGroup;
  editId:  number | null = null;
  title = 'New Account';

  constructor(
    private fb:      FormBuilder,
    private service: AccountService,
    private route:   ActivatedRoute,
    private router:  Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      accountNo:   ['', [Validators.required, Validators.minLength(5)]],
      holderName:  ['', Validators.required],
      balance:     [0, [Validators.required, Validators.min(0)]],
      accountType: ['savings', Validators.required],
      isActive:    [true],
      createdAt:   [new Date().toISOString().split('T')[0]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = Number(id);
      this.title = 'Edit Account';
      this.service.getAccountById(this.editId).subscribe(acc => {
        if (acc) this.form.patchValue(acc);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const data = this.form.value;
    if (this.editId) {
      this.service.updateAccount(this.editId, data)
        .subscribe(() => this.router.navigate(['/accounts']));
    } else {
      this.service.createAccount(data)
        .subscribe(() => this.router.navigate(['/accounts']));
    }
  }

  get f() { return this.form.controls; }
}
