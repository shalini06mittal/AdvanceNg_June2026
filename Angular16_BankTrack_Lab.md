# Angular 16 - BankTrack: A Mini Banking CRUD Application

**Hands-On Lab for Lateral / Experienced Engineers**

| Duration | Framework | Language |
|----------|-----------|----------|
| 2 Hours | Angular 16 | TypeScript |

---

## Table of Contents

1. [Introduction](#introduction)
2. [Concepts Covered](#concepts-covered)
3. [Prerequisites](#prerequisites)
4. [Lab Structure](#lab-structure)
5. [Step 1: Project Setup](#step-1-project-setup)
6. [Step 2: Services & Dependency Injection](#step-2-services--dependency-injection)
7. [Step 3: Components & Component Lifecycle](#step-3-components--component-lifecycle)
8. [Step 4: Directives](#step-4-directives)
9. [Step 5: Pipes](#step-5-pipes)
10. [Step 6: Routing & Navigation](#step-6-routing--navigation)
11. [Step 7: Route Guards](#step-7-route-guards)
12. [Step 8: Login Component (✨ New)](#step-8-login-component--new)
13. [Step 9: Dashboard UI Improvements (✨ New)](#step-9-dashboard-ui-improvements--new)
14. [Step 10: Mini Project Integration](#step-10-mini-project-integration)
15. [Final Project File Structure](#final-project-file-structure)
16. [Concept Quick-Reference Summary](#concept-quick-reference-summary)
17. [Extension Challenges](#extension-challenges)
18. [Common Errors & FAQ](#common-errors--faq)

---

## Introduction

This lab is designed for developers experienced in other frameworks or earlier versions of Angular who want a focused, practical refresher on Angular 16 core concepts. By the end of the two-hour session you will have built **BankTrack** — a simple banking portal that performs Create, Read, Update, and Delete (CRUD) operations on bank accounts.

---

## Concepts Covered

- Components & Templates
- Component Lifecycle Hooks
- Directives (Structural and Attribute)
- Pipes (built-in and custom)
- Services & Dependency Injection
- Routing & Navigation
- Route Guards
- Login Page & Authentication Component  ✨ New
- Dashboard UI with Modern Design  ✨ New

---

## Prerequisites

- Node.js 16+ and npm 8+ installed
- Angular CLI 16 (`npm install -g @angular/cli@16`)
- Basic TypeScript knowledge
- Familiarity with HTML/CSS/SCSS

---

## Lab Structure

| Step | Topic | Time |
|------|-------|------|
| 1 | Project Setup | 10 min |
| 2 | Services | 20 min |
| 3 | Components & Lifecycle | 20 min |
| 4 | Directives | 15 min |
| 5 | Pipes | 10 min |
| 6 | Routing | 15 min |
| 7 | Guards | 10 min |
| 8 | Login Component  ✨ New | 15 min |
| 9 | Dashboard UI Improvements  ✨ New | 15 min |
| 10 | Mini Project Integration | 20 min |

---

## Step 1: Project Setup

Open a terminal and run the following commands to scaffold a new Angular 16 workspace.

### 1.1 Create the Workspace

```bash
npx @angular/cli@16 new bank-track --routing=true --style=scss --standalone=false
cd bank-track
```

💡 **Tip:** Select SCSS when prompted. This lab uses SCSS for all styling.

### 1.2 Serve the App

```bash
ng serve --open
```

Angular CLI compiles the project and opens `http://localhost:4200` in your browser.

### 1.3 Explore the Generated Structure

| File / Folder | Purpose |
|---------------|---------|
| src/app/app.module.ts | Root NgModule — declares and imports everything |
| src/app/app-routing.module.ts | Defines top-level routes |
| src/app/app.component.ts | Root component |
| angular.json | Workspace configuration |

### 1.4 Add HttpClientModule

Open `src/app/app.module.ts` and add the import:

```typescript
import { HttpClientModule } from '@angular/common/http';

// Then add to the imports array:
imports: [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule
]
```

### 1.5 Define the Account Model

Create the folder `src/app/models/` and inside it create `account.model.ts`:

```typescript
export interface Account {
  id:          number;
  accountNo:   string;
  holderName:  string;
  balance:     number;
  accountType: 'savings' | 'current' | 'fixed';
  isActive:    boolean;
  createdAt:   string;
}
```

---

## Step 2: Services & Dependency Injection

### Concept Review: Services and DI

A Service is a TypeScript class decorated with `@Injectable`. Services encapsulate business logic, HTTP calls, or shared state. Angular's Dependency Injection (DI) system creates and delivers service instances automatically.

#### Providing Strategies

- `providedIn: "root"` — singleton across the entire app (most common)
- Provided in a specific module — scoped to that module
- Provided in a component — new instance per component

### 2.1 Generate Services

```bash
ng generate service services/account
ng generate service services/auth
```

### 2.2 AccountService – In-Memory CRUD

Open `src/app/services/account.service.ts` and replace its content:

```typescript
import { Injectable }               from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Account }                  from '../models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private accounts: Account[] = [
    { id: 1, accountNo: 'SB001234', holderName: 'Priya Sharma',
      balance: 125000, accountType: 'savings', isActive: true,
      createdAt: '2023-01-15' },
    { id: 2, accountNo: 'CU002345', holderName: 'Raj Patel',
      balance: 450000, accountType: 'current', isActive: true,
      createdAt: '2023-03-20' },
    { id: 3, accountNo: 'FD003456', holderName: 'Anita Singh',
      balance: 200000, accountType: 'fixed', isActive: false,
      createdAt: '2022-11-05' },
  ];

  private nextId = 4;

  getAccounts(): Observable<Account[]> {
    return of([...this.accounts]);
  }

  getAccountById(id: number): Observable<Account | undefined> {
    return of(this.accounts.find(a => a.id === id));
  }

  createAccount(account: Omit<Account, 'id'>): Observable<Account> {
    const newAcc = { ...account, id: this.nextId++ };
    this.accounts.push(newAcc);
    return of(newAcc);
  }

  updateAccount(id: number, updates: Partial<Account>): Observable<Account> {
    const idx = this.accounts.findIndex(a => a.id === id);
    if (idx === -1) return throwError(() => new Error('Not found'));
    this.accounts[idx] = { ...this.accounts[idx], ...updates };
    return of(this.accounts[idx]);
  }

  deleteAccount(id: number): Observable<void> {
    this.accounts = this.accounts.filter(a => a.id !== id);
    return of(undefined);
  }
}
```

### 2.3 AuthService – Role Management

Open `src/app/services/auth.service.ts`:

```typescript
import { Injectable } from '@angular/core';

export type Role = 'admin' | 'viewer';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = false;  // Changed to false — login page controls this
  private role: Role = 'viewer';

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUserRole(): string {
    return this.role;
  }

  setRole(r: Role): void {
    this.role = r;
  }

  login(username: string, password: string): boolean {
    // Simulate credential check (replace with real API call)
    if (username === 'admin' && password === 'bank123') {
      this.loggedIn = true;
      this.role = 'admin';
      return true;
    }
    if (username === 'viewer' && password === 'view123') {
      this.loggedIn = true;
      this.role = 'viewer';
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
  }
}
```

🔑 **Key Point:** Services with `providedIn: "root"` are tree-shakable — Angular removes them from the bundle if unused.

---

## Step 3: Components & Component Lifecycle

### Concept Review: What is a Component?

A Component is the fundamental building block of an Angular application. It controls a patch of the screen (a view) via its associated template.

### Component Lifecycle Hooks

| Hook | When it runs |
|------|--------------|
| ngOnChanges() | Before ngOnInit and whenever @Input properties change |
| ngOnInit() | Once, after first ngOnChanges — ideal for data fetching |
| ngDoCheck() | Every change-detection cycle — use with care |
| ngAfterViewInit() | After the component view and child views are initialised |
| ngOnDestroy() | Just before Angular destroys the component — unsubscribe here |

### 3.1 Generate Components

```bash
ng generate component components/login
ng generate component components/account-list
ng generate component components/account-detail
ng generate component components/account-form
ng generate component components/dashboard
```

### 3.2 Build the AccountList Component

Open `src/app/components/account-list/account-list.component.ts`:

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Account }                      from '../../models/account.model';
import { AccountService }               from '../../services/account.service';
import { Subscription }                 from 'rxjs';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit, OnDestroy {
  accounts: Account[] = [];
  private sub!: Subscription;

  constructor(private service: AccountService) {}

  ngOnInit(): void {
    this.sub = this.service.getAccounts().subscribe(data => this.accounts = data);
  }

  delete(id: number): void {
    if (!confirm('Delete this account?')) return;
    this.service.deleteAccount(id).subscribe(() =>
      this.accounts = this.accounts.filter(a => a.id !== id));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
```

Open `src/app/components/account-list/account-list.component.html`:

```html
<div class="account-list-container">
  <div class="list-header">
    <h2>Bank Accounts</h2>
    <a routerLink="/accounts/new" class="btn-primary">+ New Account</a>
  </div>

  <table class="accounts-table">
    <thead>
      <tr>
        <th>Account No</th>
        <th>Holder</th>
        <th>Balance</th>
        <th>Type</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let acc of accounts">
        <td>{{ acc.accountNo | accountMask }}</td>
        <td>{{ acc.holderName | titlecase }}</td>
        <td>{{ acc.balance | currency:"INR":"symbol":"1.0-0" }}</td>
        <td>{{ acc.accountType | titlecase }}</td>
        <td>
          <span [appStatusBadge]="acc.isActive">
            {{ acc.isActive ? "Active" : "Inactive" }}
          </span>
        </td>
        <td class="actions">
          <a [routerLink]="['/accounts', acc.id]" class="btn-sm">View</a>
          <a [routerLink]="['/accounts/edit', acc.id]" class="btn-sm btn-edit">Edit</a>
          <button *appIfRole="'admin'" (click)="delete(acc.id)" class="btn-sm btn-danger">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## Step 4: Directives

### 4.1 Built-in Structural Directives

| Directive | Usage |
|-----------|-------|
| *ngIf="condition" | Renders element only when condition is truthy |
| *ngFor="let x of list" | Iterates over an array and stamps a template for each item |
| *ngSwitch | Switches between alternative views based on a value |
| [ngClass] | Dynamically binds one or more CSS classes |
| [ngStyle] | Dynamically binds inline styles |

### 4.2 Custom Attribute Directive: StatusBadge

Create `src/app/directives/status-badge.directive.ts`:

```typescript
import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({ selector: '[appStatusBadge]' })
export class StatusBadgeDirective implements OnChanges {
  @Input('appStatusBadge') isActive: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    const color = this.isActive ? '#166534' : '#991B1B';
    const bg    = this.isActive ? '#DCFCE7'  : '#FEE2E2';

    this.renderer.setStyle(this.el.nativeElement, 'color', color);
    this.renderer.setStyle(this.el.nativeElement, 'background-color', bg);
    this.renderer.setStyle(this.el.nativeElement, 'padding', '3px 10px');
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '9999px');
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', '600');
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '12px');
  }
}
```

### 4.3 Custom Structural Directive: IfRoleDirective

Create `src/app/directives/if-role.directive.ts`:

```typescript
import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({ selector: '[appIfRole]' })
export class IfRoleDirective implements OnInit {
  @Input('appIfRole') allowedRole: string = '';

  constructor(
    private tmpl: TemplateRef<any>,
    private vcr:  ViewContainerRef,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (this.auth.getUserRole() === this.allowedRole) {
      this.vcr.createEmbeddedView(this.tmpl);
    } else {
      this.vcr.clear();
    }
  }
}
```

🔑 **Key Point:** Use Renderer2 instead of directly manipulating `nativeElement.style`. This keeps code platform-safe for Server-Side Rendering.

---

## Step 5: Pipes

### Built-in Pipes Used in BankTrack

| Pipe | Template Syntax | Output |
|------|-----------------|--------|
| currency | {{ balance \| currency:"INR" }} | ₹1,25,000.00 |
| date | {{ createdAt \| date:"mediumDate" }} | Jan 15, 2024 |
| titlecase | {{ accountType \| titlecase }} | Savings |
| uppercase | {{ accountNo \| uppercase }} | SB001234 |

### 5.1 Custom Pipe: AccountMaskPipe

Create `src/app/pipes/account-mask.pipe.ts`:

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'accountMask' })
export class AccountMaskPipe implements PipeTransform {
  transform(value: string, visibleDigits: number = 4): string {
    if (!value) return '';
    const masked = value.slice(0, -visibleDigits).replace(/./g, '*');
    return masked + value.slice(-visibleDigits);
  }
}
```

---

## Step 6: Routing & Navigation

### 6.1 Define Routes

Open `src/app/app-routing.module.ts` and replace it with the following. Note the `/login` route added for the new login component:

```typescript
import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { LoginComponent }         from './components/login/login.component';
import { DashboardComponent }     from './components/dashboard/dashboard.component';
import { AccountListComponent }   from './components/account-list/account-list.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountFormComponent }   from './components/account-form/account-form.component';
import { authGuard }              from './guards/auth.guard';

const routes: Routes = [
  { path: '',                  redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',             component: LoginComponent },
  { path: 'dashboard',         component: DashboardComponent,    canActivate: [authGuard] },
  { path: 'accounts',          component: AccountListComponent,   canActivate: [authGuard] },
  { path: 'accounts/new',      component: AccountFormComponent,   canActivate: [authGuard] },
  { path: 'accounts/edit/:id', component: AccountFormComponent,   canActivate: [authGuard] },
  { path: 'accounts/:id',      component: AccountDetailComponent, canActivate: [authGuard] },
  { path: '**',                redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

⚠️ **Order Matters:** Always put more specific routes (`accounts/new`) before parameterised routes (`accounts/:id`). The router uses first-match-wins.

### 6.2 Update AppComponent

Open `src/app/app.component.html`:

```html
<nav class="main-nav" *ngIf="isLoggedIn()">
  <div class="nav-brand">
    <span class="brand-icon">🏦</span>
    <span class="brand-name">BankTrack</span>
  </div>
  <div class="nav-links">
    <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
    <a routerLink="/accounts"  routerLinkActive="active">Accounts</a>
  </div>
  <div class="nav-actions">
    <span class="nav-role">{{ role | titlecase }}</span>
    <button (click)="logout()" class="btn-logout">Logout</button>
  </div>
</nav>

<router-outlet></router-outlet>
```

Open `src/app/app.component.ts`:

```typescript
import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  get role(): string {
    return this.auth.getUserRole();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
```

---

## Step 7: Route Guards

### Concept Review: Guards

Guards are services that control navigation. Angular 16 supports both class-based and functional guards.

### 7.1 Generate the Guard

```bash
ng generate guard guards/auth
```

### 7.2 Implement the AuthGuard

Open `src/app/guards/auth.guard.ts`:

```typescript
import { inject }        from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router }        from '@angular/router';
import { AuthService }   from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) return true;
  router.navigate(['/login']);
  return false;
};
```

🔑 **Key Point:** Functional guards (CanActivateFn) in Angular 15+ use `inject()` instead of constructor injection — no `@Injectable` decorator needed.

---

## Step 8: Login Component (✨ New)

### What We Are Building

A polished login page with credential validation, error feedback, and role-based routing. The login form uses Reactive Forms and integrates with AuthService.

### 8.1 Login Component TypeScript

Open `src/app/components/login/login.component.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMsg    = '';
  isLoading   = false;
  showPassword = false;

  constructor(
    private fb:   FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMsg  = '';
    const { username, password } = this.loginForm.value;

    // Simulate async delay (replace with real HTTP call)
    setTimeout(() => {
      const success = this.auth.login(username, password);
      this.isLoading = false;

      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMsg = 'Invalid username or password. Please try again.';
      }
    }, 800);
  }
}
```

### 8.2 Login Component Template

Open `src/app/components/login/login.component.html`:

```html
<div class="login-page">
  <div class="login-card">
    <div class="login-header">
      <div class="login-logo">🏦</div>
      <h1>BankTrack</h1>
      <p>Sign in to your account</p>
    </div>

    <div class="error-banner" *ngIf="errorMsg">
      <span>⚠️</span> {{ errorMsg }}
    </div>

    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          id="username" 
          formControlName="username"
          type="text" 
          placeholder="Enter username"
          [class.invalid]="f['username'].touched && f['username'].invalid">
        <span 
          class="field-error"
          *ngIf="f['username'].touched && f['username'].hasError('required')">
          Username is required
        </span>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <div class="password-wrapper">
          <input 
            id="password" 
            formControlName="password"
            [type]="showPassword ? 'text' : 'password'"
            placeholder="Enter password"
            [class.invalid]="f['password'].touched && f['password'].invalid">
          <button type="button" class="toggle-pw" (click)="togglePassword()">
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
        <span 
          class="field-error"
          *ngIf="f['password'].touched && f['password'].hasError('required')">
          Password is required
        </span>
      </div>

      <div class="form-check">
        <label>
          <input type="checkbox" formControlName="rememberMe"> Remember me
        </label>
      </div>

      <button type="submit" class="btn-login" [disabled]="isLoading">
        <span *ngIf="isLoading" class="spinner"></span>
        {{ isLoading ? 'Signing in...' : 'Sign In' }}
      </button>
    </form>

    <div class="login-hint">
      <p><strong>Demo credentials:</strong></p>
      <p>Admin: admin / bank123</p>
      <p>Viewer: viewer / view123</p>
    </div>
  </div>
</div>
```

### 8.3 Login Component SCSS

Open `src/app/components/login/login.component.scss`:

```scss
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1E3A5F 0%, #1A56DB 100%);
  padding: 24px;
}

.login-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  padding: 48px 40px;
  width: 100%;
  max-width: 420px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;

  .login-logo {
    font-size: 48px;
    margin-bottom: 8px;
  }

  h1 {
    font-size: 28px;
    font-weight: 700;
    color: #1E293B;
    margin: 0 0 4px;
  }

  p {
    color: #64748B;
    margin: 0;
    font-size: 14px;
  }
}

.error-banner {
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #DC2626;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 20px;
  font-size: 14px;
}

.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    font-weight: 600;
    color: #374151;
    margin-bottom: 6px;
    font-size: 14px;
  }

  input {
    width: 100%;
    padding: 12px 14px;
    border: 1.5px solid #D1D5DB;
    border-radius: 8px;
    font-size: 15px;
    transition: border-color 0.2s;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #1A56DB;
      box-shadow: 0 0 0 3px rgba(26,86,219,0.15);
    }

    &.invalid {
      border-color: #EF4444;
    }
  }
}

.password-wrapper {
  position: relative;
}

.toggle-pw {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #1A56DB;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}

.field-error {
  color: #EF4444;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.form-check {
  margin-bottom: 24px;

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
    color: #374151;
  }
}

.btn-login {
  width: 100%;
  padding: 14px;
  background: #1A56DB;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background: #1E40AF;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.login-hint {
  margin-top: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  font-size: 13px;
  color: #64748B;
  text-align: center;

  p {
    margin: 2px 0;
  }
}
```

---

## Step 9: Dashboard UI Improvements (✨ New)

### What We Are Improving

The original dashboard had bare minimum stat cards with no visual hierarchy. We will redesign it with a modern banking aesthetic: gradient stat cards, summary icons, account type breakdown, and a recent-activity section.

### 9.1 Dashboard Component TypeScript

Open `src/app/components/dashboard/dashboard.component.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { AccountService }    from '../../services/account.service';
import { Account }           from '../../models/account.model';
import { AuthService }       from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalAccounts  = 0;
  activeAccounts = 0;
  totalBalance   = 0;
  savingsCount   = 0;
  currentCount   = 0;
  fixedCount     = 0;
  recentAccounts: Account[] = [];
  greeting = '';

  constructor(
    private service: AccountService,
    private auth:    AuthService
  ) {}

  ngOnInit(): void {
    const hour = new Date().getHours();
    this.greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

    this.service.getAccounts().subscribe(accounts => {
      this.totalAccounts  = accounts.length;
      this.activeAccounts = accounts.filter(a => a.isActive).length;
      this.totalBalance   = accounts.reduce((s, a) => s + a.balance, 0);
      this.savingsCount   = accounts.filter(a => a.accountType === 'savings').length;
      this.currentCount   = accounts.filter(a => a.accountType === 'current').length;
      this.fixedCount     = accounts.filter(a => a.accountType === 'fixed').length;
      this.recentAccounts = [...accounts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
    });
  }

  get userRole(): string {
    return this.auth.getUserRole();
  }
}
```

### 9.2 Dashboard Component Template

Open `src/app/components/dashboard/dashboard.component.html`:

```html
<div class="dashboard">
  <!-- Header -->
  <div class="dashboard-header">
    <div>
      <h1>{{ greeting }}, {{ userRole | titlecase }}</h1>
      <p class="subtitle">Here's your BankTrack overview</p>
    </div>
    <a routerLink="/accounts/new" class="btn-primary" *appIfRole="'admin'">
      + New Account
    </a>
  </div>

  <!-- KPI Cards -->
  <div class="stats-grid">
    <div class="stat-card stat-blue">
      <div class="stat-icon">🏦</div>
      <div class="stat-info">
        <span class="stat-label">Total Accounts</span>
        <span class="stat-value">{{ totalAccounts }}</span>
      </div>
    </div>

    <div class="stat-card stat-green">
      <div class="stat-icon">✅</div>
      <div class="stat-info">
        <span class="stat-label">Active Accounts</span>
        <span class="stat-value">{{ activeAccounts }}</span>
      </div>
    </div>

    <div class="stat-card stat-purple">
      <div class="stat-icon">💰</div>
      <div class="stat-info">
        <span class="stat-label">Total Balance</span>
        <span class="stat-value">{{ totalBalance | currency:"INR":"symbol":"1.0-0" }}</span>
      </div>
    </div>

    <div class="stat-card stat-orange">
      <div class="stat-icon">📊</div>
      <div class="stat-info">
        <span class="stat-label">Inactive Accounts</span>
        <span class="stat-value">{{ totalAccounts - activeAccounts }}</span>
      </div>
    </div>
  </div>

  <!-- Account Type Breakdown -->
  <div class="section-grid">
    <div class="card">
      <h2 class="card-title">Account Type Breakdown</h2>
      <div class="type-list">
        <div class="type-item">
          <span class="type-dot savings"></span>
          <span class="type-label">Savings</span>
          <span class="type-count">{{ savingsCount }}</span>
        </div>
        <div class="type-item">
          <span class="type-dot current"></span>
          <span class="type-label">Current</span>
          <span class="type-count">{{ currentCount }}</span>
        </div>
        <div class="type-item">
          <span class="type-dot fixed"></span>
          <span class="type-label">Fixed Deposit</span>
          <span class="type-count">{{ fixedCount }}</span>
        </div>
      </div>
    </div>

    <!-- Recent Accounts -->
    <div class="card">
      <h2 class="card-title">
        Recent Accounts
        <a routerLink="/accounts" class="view-all">View all →</a>
      </h2>
      <div class="recent-list">
        <div class="recent-item" *ngFor="let acc of recentAccounts">
          <div class="recent-avatar">{{ acc.holderName[0] | uppercase }}</div>
          <div class="recent-info">
            <span class="recent-name">{{ acc.holderName | titlecase }}</span>
            <span class="recent-no">{{ acc.accountNo | accountMask }}</span>
          </div>
          <div class="recent-right">
            <span class="recent-balance">{{ acc.balance | currency:"INR":"symbol":"1.0-0" }}</span>
            <span [appStatusBadge]="acc.isActive">
              {{ acc.isActive ? "Active" : "Inactive" }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 9.3 Dashboard Component SCSS

Open `src/app/components/dashboard/dashboard.component.scss`:

```scss
.dashboard {
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;

  h1 {
    font-size: 28px;
    font-weight: 700;
    color: #1E293B;
    margin: 0 0 4px;
  }

  .subtitle {
    color: #64748B;
    margin: 0;
    font-size: 15px;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

  .stat-icon {
    font-size: 36px;
  }

  .stat-info {
    display: flex;
    flex-direction: column;
  }

  .stat-label {
    font-size: 13px;
    font-weight: 500;
    opacity: 0.85;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .stat-value {
    font-size: 26px;
    font-weight: 700;
    margin-top: 4px;
  }

  &.stat-blue {
    background: linear-gradient(135deg, #1A56DB, #2563EB);
    color: #fff;
  }

  &.stat-green {
    background: linear-gradient(135deg, #16A34A, #22C55E);
    color: #fff;
  }

  &.stat-purple {
    background: linear-gradient(135deg, #7C3AED, #A855F7);
    color: #fff;
  }

  &.stat-orange {
    background: linear-gradient(135deg, #EA580C, #F97316);
    color: #fff;
  }
}

.section-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
}

.card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .view-all {
    font-size: 13px;
    color: #1A56DB;
    font-weight: 500;
    text-decoration: none;
  }
}

.type-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.type-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.type-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;

  &.savings {
    background: #1A56DB;
  }

  &.current {
    background: #16A34A;
  }

  &.fixed {
    background: #7C3AED;
  }
}

.type-label {
  flex: 1;
  font-size: 14px;
  color: #475569;
}

.type-count {
  font-weight: 700;
  color: #1E293B;
  font-size: 18px;
}

.recent-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recent-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #F8FAFC;
}

.recent-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1A56DB, #7C3AED);
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.recent-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.recent-name {
  font-weight: 600;
  color: #1E293B;
  font-size: 14px;
}

.recent-no {
  color: #64748B;
  font-size: 12px;
  font-family: monospace;
}

.recent-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.recent-balance {
  font-weight: 700;
  color: #1E293B;
  font-size: 14px;
}
```

### 9.4 Global SCSS (styles.scss)

Open `src/styles.scss` and add these global base styles:

```scss
/* Reset & Base */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background: #F1F5F9;
  color: #1E293B;
}

a {
  text-decoration: none;
}

/* Navigation */
.main-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 64px;
  background: #1E293B;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-icon {
  font-size: 24px;
}

.brand-name {
  font-size: 20px;
  font-weight: 700;
}

.nav-links {
  display: flex;
  gap: 8px;
}

.nav-links a {
  color: #94A3B8;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover,
  &.active {
    background: rgba(255,255,255,0.1);
    color: #fff;
  }
}

.nav-role {
  background: rgba(26,86,219,0.3);
  color: #93C5FD;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Shared Buttons */
.btn-primary {
  background: #1A56DB;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1E40AF;
  }
}

.btn-secondary {
  background: transparent;
  color: #1A56DB;
  border: 1.5px solid #1A56DB;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.btn-logout {
  background: rgba(239,68,68,0.15);
  color: #FCA5A5;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: rgba(239,68,68,0.25);
  }
}

.btn-sm {
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: #EFF6FF;
  color: #1A56DB;
}

.btn-edit {
  background: #FFFBEB;
  color: #B45309;
}

.btn-danger {
  background: #FEF2F2;
  color: #DC2626;
}

/* Table styles */
.accounts-table {
  width: 100%;
  border-collapse: collapse;

  th {
    background: #1E293B;
    color: #fff;
    padding: 12px 16px;
    text-align: left;
    font-size: 13px;
    font-weight: 600;
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid #E2E8F0;
    font-size: 14px;
  }

  tr:hover td {
    background: #F8FAFC;
  }
}

/* Form styles */
.form-container {
  max-width: 560px;
  margin: 40px auto;
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    font-weight: 600;
    color: #374151;
    margin-bottom: 6px;
  }

  input,
  select {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid #D1D5DB;
    border-radius: 8px;
    font-size: 15px;

    &:focus {
      outline: none;
      border-color: #1A56DB;
    }
  }
}

.error {
  color: #EF4444;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}
```

---

## Step 10: Mini Project Integration

### 10.1 AccountForm Component

Open `src/app/components/account-form/account-form.component.ts`:

```typescript
import { Component, OnInit }  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html'
})
export class AccountFormComponent implements OnInit {
  form!: FormGroup;
  editId:  number | null = null;
  title = 'New Account';

  constructor(
    private fb: FormBuilder,
    private service: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      accountNo:   ['', [Validators.required, Validators.minLength(5)]],
      holderName:  ['', Validators.required],
      balance:     [0,  [Validators.required, Validators.min(0)]],
      accountType: ['savings', Validators.required],
      isActive:    [true],
      createdAt:   [new Date().toISOString().split('T')[0]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = Number(id);
      this.title  = 'Edit Account';
      this.service.getAccountById(this.editId).subscribe(acc => {
        if (acc) this.form.patchValue(acc);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    if (this.editId) {
      this.service.updateAccount(this.editId, data).subscribe(() =>
        this.router.navigate(['/accounts']));
    } else {
      this.service.createAccount(data).subscribe(() =>
        this.router.navigate(['/accounts']));
    }
  }

  get f() {
    return this.form.controls;
  }
}
```

### 10.2 Final AppModule

Your final `src/app/app.module.ts` should include the LoginComponent and ReactiveFormsModule:

```typescript
import { NgModule }              from '@angular/core';
import { BrowserModule }         from '@angular/platform-browser';
import { ReactiveFormsModule }   from '@angular/forms';
import { AppRoutingModule }      from './app-routing.module';
import { AppComponent }          from './app.component';
import { LoginComponent }        from './components/login/login.component';
import { DashboardComponent }    from './components/dashboard/dashboard.component';
import { AccountListComponent }  from './components/account-list/account-list.component';
import { AccountDetailComponent }from './components/account-detail/account-detail.component';
import { AccountFormComponent }  from './components/account-form/account-form.component';
import { StatusBadgeDirective }  from './directives/status-badge.directive';
import { IfRoleDirective }       from './directives/if-role.directive';
import { AccountMaskPipe }       from './pipes/account-mask.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AccountListComponent,
    AccountDetailComponent,
    AccountFormComponent,
    StatusBadgeDirective,
    IfRoleDirective,
    AccountMaskPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

---

## Final Project File Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/                       ← ✨ New
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   └── login.component.scss
│   │   ├── dashboard/                   ← ✨ Redesigned
│   │   │   ├── dashboard.component.ts
│   │   │   ├── dashboard.component.html
│   │   │   └── dashboard.component.scss
│   │   ├── account-list/
│   │   │   ├── account-list.component.ts
│   │   │   ├── account-list.component.html
│   │   │   └── account-list.component.scss
│   │   ├── account-detail/
│   │   │   ├── account-detail.component.ts
│   │   │   ├── account-detail.component.html
│   │   │   └── account-detail.component.scss
│   │   └── account-form/
│   │       ├── account-form.component.ts
│   │       ├── account-form.component.html
│   │       └── account-form.component.scss
│   ├── directives/
│   │   ├── status-badge.directive.ts
│   │   └── if-role.directive.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── models/
│   │   └── account.model.ts
│   ├── pipes/
│   │   └── account-mask.pipe.ts
│   ├── services/
│   │   ├── account.service.ts
│   │   └── auth.service.ts
│   ├── app-routing.module.ts            ← Updated with /login route
│   ├── app.component.ts                 ← Updated with login check
│   ├── app.component.html
│   ├── app.component.scss
│   └── app.module.ts                    ← Updated with LoginComponent
└── styles.scss                          ← ✨ Global styles added
```

---

## Concept Quick-Reference Summary

| Concept | Where Used | Key Takeaway |
|---------|-----------|--------------|
| Component | login, dashboard, account-list, account-form | @Component decorator; class + template + styles |
| Lifecycle | AccountListComponent, AccountDetailComponent | ngOnInit for data fetch; ngOnDestroy to unsubscribe |
| Reactive Forms | LoginComponent, AccountFormComponent | FormBuilder creates typed form groups with validators |
| Structural Directive | All templates | *ngIf, *ngFor control DOM structure |
| Attribute Directive | StatusBadgeDirective, IfRoleDirective | Modify host element appearance or behaviour |
| Pipe | AccountMaskPipe, currency, date, titlecase | Transform values in templates; composable with \| |
| Service + DI | AccountService, AuthService | @Injectable; injected via constructor; singleton by default |
| Routing | app-routing.module.ts, routerLink | Map URL paths to components; /login added |
| Guard | authGuard on /dashboard and /accounts routes | Redirects to /login when not authenticated |

---

## Extension Challenges

If Time Allows:

- Add a search/filter input above the accounts table using `*ngIf` and two-way binding `[(ngModel)]`.

- Create a `canDeactivate` guard on AccountForm that warns the user if they navigate away with unsaved changes.

- Add a custom `RelativeDatePipe` that displays "3 days ago" instead of the raw date.

- Implement lazy loading for an AccountsModule to improve initial load time.

- Persist accounts to localStorage by injecting a StorageService into AccountService.

- Add a "Forgot Password" flow to LoginComponent using a modal dialog.

---

## Common Errors & FAQ

| Error / Question | Solution |
|------------------|----------|
| Can't bind to 'formGroup' | Import ReactiveFormsModule in AppModule. |
| 'router-outlet' is not a known element | Ensure AppRoutingModule is imported in AppModule. |
| NullInjectorError: No provider for AccountService | Add `providedIn:"root"` to @Injectable or provide in AppModule providers. |
| Login page not showing | Check that LoginComponent is declared in AppModule and the /login route is defined before the ** wildcard. |
| AuthGuard redirecting when logged in | Verify AuthService.isLoggedIn() returns true after login() is called. |
| ExpressionChangedAfterItHasBeenCheckedError | Avoid mutating bindings inside lifecycle hooks. Use setTimeout or ChangeDetectorRef. |
| Route param returns null | Use `this.route.snapshot.paramMap.get('id')` and cast with `Number()`. |

---

**Happy Coding! 🚀**
