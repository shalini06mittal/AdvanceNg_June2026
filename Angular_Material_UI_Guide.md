# Angular Material UI Guide — v16
### *Employee Management Dashboard*

**A Complete Guide: Basic to Advanced**

*Using Angular Version 16 with Hands-On Project*

**Project: Employee Management Dashboard**

*Simulated REST API with JSON Dummy Data*

---

## Table of Contents

1. [Introduction to Angular Material](#chapter-1-introduction-to-angular-material)
2. [Project Setup & Installation](#chapter-2-project-setup--installation)
3. [Core Concepts & Theming](#chapter-3-core-concepts--theming)
4. [Basic Components (Buttons, Icons, Cards)](#chapter-4-basic-components--buttons-icons--cards)
5. [Form Controls & Validation](#chapter-5-form-controls--validation)
6. [Navigation Components (Toolbar, Sidenav, Tabs)](#chapter-6-navigation-components)
7. [Data Display (Tables, Lists, Chips)](#chapter-7-data-display--mattable-lists--chips)
8. [Dialogs, Snackbars & Overlays](#chapter-8-dialogs-snackbars--overlays)
9. [Advanced Data Table with Sorting, Filtering & Pagination](#chapter-9-advanced-data-table--sort-filter--pagination)
10. [Advanced Theming & Custom Components](#chapter-10-advanced-theming--custom-components)
11. [Performance & Best Practices](#chapter-11-performance--best-practices)
12. [Complete Project Source Reference](#chapter-12-complete-project-source-reference)

---

## Chapter 1: Introduction to Angular Material

Angular Material is the official component library for Angular, implementing Google's Material Design specification. It provides a rich set of pre-built, accessible, and highly customizable UI components that follow Material Design principles — helping developers build beautiful, consistent, and production-ready applications quickly.

### 1.1 What is Material Design?

Material Design is a design language developed by Google in 2014. It is based on the metaphor of physical materials (paper, ink) and uses depth, shadows, motion, and colour to create intuitive interfaces. Angular Material translates these guidelines into reusable Angular components.

### 1.2 Why Angular Material?

| Feature | Benefit |
|---|---|
| Accessibility (a11y) | Built-in ARIA support and keyboard navigation |
| Theming System | Custom palettes via CSS variables and SCSS |
| CDK (Component Dev Kit) | Low-level primitives for building custom components |
| Tree-shakeable | Only import what you use; keeps bundle lean |
| SSR Compatible | Works with Angular Universal out of the box |
| Active Maintenance | Maintained by Google's Angular team |

### 1.3 Angular Material vs Other Libraries

| Library | Framework | Design System | Bundle Size |
|---|---|---|---|
| Angular Material | Angular | Material Design | ~100KB (tree-shaken) |
| PrimeNG | Angular | Custom / PrimeFlex | ~300KB |
| NG-ZORRO | Angular | Ant Design | ~250KB |
| Bootstrap | Any | Bootstrap UI | ~70KB CSS |

---

## Chapter 2: Project Setup & Installation

We will build an Employee Management Dashboard from scratch throughout this guide. Each chapter adds more features to the project, giving you a real-world context for every concept introduced.

### 2.1 Prerequisites

- Node.js v18+ and npm v9+
- Angular CLI v16: `npm install -g @angular/cli@16`
- A code editor (VS Code recommended)

### 2.2 Creating the Angular 16 Project

```bash
# Create new Angular 16 project
ng new employee-dashboard --routing --style=scss

# Navigate into the project
cd employee-dashboard

# Add Angular Material (choose 'Indigo/Pink' theme when prompted)
ng add @angular/material@16

# Options chosen during ng add:
#  ✔ Choose a prebuilt theme name: Indigo/Pink
#  ✔ Set up global Angular Material typography styles: Yes
#  ✔ Include the animations module: Yes
```

> 💡 **Tip:** Run `ng add @angular/material` instead of `npm install` — `ng add` automatically configures `app.module.ts`, `angular.json`, and adds base styles to `styles.scss`.

### 2.3 Project Folder Structure

```
employee-dashboard/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/          # TypeScript interfaces
│   │   │   └── services/        # Data & HTTP services
│   │   ├── shared/
│   │   │   └── material.module.ts  # Central Material imports
│   │   ├── features/
│   │   │   ├── employees/       # Employee list & detail
│   │   │   ├── dashboard/       # Home dashboard
│   │   │   └── settings/        # Settings page
│   │   ├── app-routing.module.ts
│   │   └── app.module.ts
│   ├── assets/
│   │   └── data/
│   │       └── employees.json   # Dummy API data
│   └── styles.scss
└── angular.json
```

### 2.4 Dummy JSON Data (Simulated REST API)

Create `src/assets/data/employees.json` with the following content. This file simulates a REST API response and will be loaded via Angular's `HttpClient` throughout the project.

```json
// src/assets/data/employees.json
{
  "employees": [
    {
      "id": 1, "firstName": "Alice", "lastName": "Johnson",
      "email": "alice.johnson@example.com", "department": "Engineering",
      "role": "Senior Developer", "salary": 95000,
      "joinDate": "2020-03-15", "status": "active",
      "avatar": "AJ", "skills": ["Angular", "TypeScript", "RxJS"]
    },
    {
      "id": 2, "firstName": "Bob", "lastName": "Smith",
      "email": "bob.smith@example.com", "department": "Design",
      "role": "UI/UX Designer", "salary": 78000,
      "joinDate": "2019-07-22", "status": "active",
      "avatar": "BS", "skills": ["Figma", "CSS", "Sketch"]
    },
    {
      "id": 3, "firstName": "Carol", "lastName": "White",
      "email": "carol.white@example.com", "department": "HR",
      "role": "HR Manager", "salary": 72000,
      "joinDate": "2018-11-10", "status": "on-leave",
      "avatar": "CW", "skills": ["Recruitment", "Compliance", "Payroll"]
    },
    {
      "id": 4, "firstName": "David", "lastName": "Lee",
      "email": "david.lee@example.com", "department": "Engineering",
      "role": "DevOps Engineer", "salary": 88000,
      "joinDate": "2021-01-05", "status": "active",
      "avatar": "DL", "skills": ["Docker", "Kubernetes", "CI/CD"]
    },
    {
      "id": 5, "firstName": "Eva", "lastName": "Martinez",
      "email": "eva.martinez@example.com", "department": "Finance",
      "role": "Financial Analyst", "salary": 81000,
      "joinDate": "2022-06-18", "status": "active",
      "avatar": "EM", "skills": ["Excel", "SAP", "Power BI"]
    }
  ],
  "departments": ["Engineering","Design","HR","Finance","Marketing"],
  "stats": { "totalEmployees": 5, "activeCount": 4, "onLeaveCount": 1 }
}
```

### 2.5 Creating the Employee Service

Generate the service that will load the JSON file and expose it as an Observable, simulating what a real HTTP call would return.

```bash
# Generate core service
ng generate service core/services/employee
```

```typescript
// src/app/core/services/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly dataUrl = 'assets/data/employees.json';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<{ employees: Employee[] }>(this.dataUrl)
      .pipe(map(res => res.employees));
  }

  getById(id: number): Observable<Employee | undefined> {
    return this.getAll().pipe(map(emp => emp.find(e => e.id === id)));
  }
}
```

### 2.6 Creating the Shared Material Module

Centralise all Angular Material imports in one shared module. This is a best practice for maintainability.

```typescript
// src/app/shared/material.module.ts
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

const MATERIAL_MODULES = [
  MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule,
  MatSidenavModule, MatListModule, MatTableModule, MatFormFieldModule,
  MatInputModule, MatSelectModule, MatDialogModule, MatSnackBarModule,
  MatPaginatorModule, MatSortModule, MatChipsModule, MatBadgeModule,
  MatProgressSpinnerModule, MatTooltipModule, MatTabsModule,
];

@NgModule({ imports: MATERIAL_MODULES, exports: MATERIAL_MODULES })
export class MaterialModule {}
```

---

## Chapter 3: Core Concepts & Theming

Angular Material's theming system is built on top of SCSS and allows you to create a consistent design language across your application using colour palettes, typography, and density settings.

### 3.1 Theming Architecture

Every Angular Material theme consists of three main palettes:

- **Primary** — the main brand colour (e.g. Indigo)
- **Accent** — used for interactive elements and highlights (e.g. Pink)
- **Warn** — used to indicate errors and dangerous actions (e.g. Red)

### 3.2 Custom Theme in styles.scss

```scss
// src/styles.scss
@use '@angular/material' as mat;

// 1. Define your custom palettes
$my-primary: mat.define-palette(mat.$indigo-palette, 700);
$my-accent:  mat.define-palette(mat.$teal-palette,   400);
$my-warn:    mat.define-palette(mat.$red-palette);

// 2. Create the theme object
$my-theme: mat.define-light-theme((
  color: (
    primary: $my-primary,
    accent:  $my-accent,
    warn:    $my-warn,
  ),
  typography: mat.define-typography-config(
    $font-family: 'Roboto, sans-serif',
    $headline-1: mat.define-typography-level(96px, 96px, 300),
    $body-1:     mat.define-typography-level(16px, 24px, 400),
  ),
  density: 0,
));

// 3. Apply the theme
@include mat.all-component-themes($my-theme);

// 4. Dark theme variant (applied via CSS class)
$dark-theme: mat.define-dark-theme((
  color: (
    primary: mat.define-palette(mat.$blue-grey-palette),
    accent:  mat.define-palette(mat.$amber-palette),
  ),
));

.dark-mode {
  @include mat.all-component-colors($dark-theme);
}
```

> 💡 **Tip:** Use `mat.define-palette()` with a palette map and a hue value (50, 100, 200, … 900, A100, A200, A400, A700). The default hue is 500 when not specified.

### 3.3 Typography Classes

| CSS Class | Material Role | Usage |
|---|---|---|
| `mat-display-1` | Display 1 | Hero headlines |
| `mat-headline` | H1 | Page titles |
| `mat-title` | H2 | Section titles |
| `mat-subheading-2` | H3 | Subsections |
| `mat-body-1` | Body 1 | Primary text |
| `mat-body-2` | Body 2 | Secondary text |
| `mat-caption` | Caption | Captions, labels |

---

## Chapter 4: Basic Components — Buttons, Icons & Cards

### 4.1 MatButton

Buttons are one of the most-used components. Angular Material provides several variants through directives on the native `<button>` element.

| Directive | Appearance | Use Case |
|---|---|---|
| `mat-button` | Text only | Low-emphasis actions |
| `mat-raised-button` | Filled with shadow | Primary call-to-action |
| `mat-flat-button` | Filled, no shadow | Standard actions |
| `mat-stroked-button` | Outlined | Secondary actions |
| `mat-icon-button` | Icon only | Toolbar / icon actions |
| `mat-fab` | Floating action btn | Primary page action |
| `mat-mini-fab` | Smaller FAB | Compact spaces |

#### Button Template Examples

```html
<!-- app/features/dashboard/dashboard.component.html -->

<!-- Basic variants -->
<button mat-button color='primary'>Text Button</button>
<button mat-raised-button color='primary'>Raised Button</button>
<button mat-flat-button color='accent'>Flat Button</button>
<button mat-stroked-button color='warn'>Stroked Button</button>

<!-- With icon inside -->
<button mat-raised-button color='primary'>
  <mat-icon>add</mat-icon> Add Employee
</button>

<!-- Icon button -->
<button mat-icon-button [matTooltip]='"Edit"' (click)='onEdit(emp)'>
  <mat-icon>edit</mat-icon>
</button>

<!-- Floating Action Button -->
<button mat-fab color='primary' aria-label='Add new employee'>
  <mat-icon>person_add</mat-icon>
</button>

<!-- Loading state with spinner -->
<button mat-raised-button color='primary' [disabled]='isLoading'>
  <mat-spinner *ngIf='isLoading' diameter='20'></mat-spinner>
  <span *ngIf='!isLoading'>Save Employee</span>
</button>
```

### 4.2 MatIcon

Angular Material uses Google's Material Icons font. Icons can be rendered inline, in buttons, or standalone.

```html
<!-- Icon sizes using font-size override -->
<mat-icon>home</mat-icon>
<mat-icon style='font-size: 48px; width: 48px; height: 48px;'>people</mat-icon>

<!-- Coloured icons -->
<mat-icon color='primary'>settings</mat-icon>
<mat-icon color='accent'>favorite</mat-icon>
<mat-icon color='warn'>delete</mat-icon>

<!-- Badge on icon (notification count) -->
<mat-icon [matBadge]='notifCount' matBadgeColor='warn'>notifications</mat-icon>
```

### 4.3 MatCard — Employee Card Component

Cards are surface-level containers for content. Let's build an `EmployeeCardComponent` that uses our dummy data.

```bash
# Generate component
ng generate component features/employees/employee-card
```

```html
<!-- employee-card.component.html -->
<mat-card class='employee-card'>
  <mat-card-header>
    <!-- Avatar -->
    <div mat-card-avatar class='avatar'>{{ employee.avatar }}</div>
    <mat-card-title>{{ employee.firstName }} {{ employee.lastName }}</mat-card-title>
    <mat-card-subtitle>{{ employee.role }}</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <p><mat-icon inline>business</mat-icon> {{ employee.department }}</p>
    <p><mat-icon inline>email</mat-icon> {{ employee.email }}</p>

    <!-- Status chip -->
    <mat-chip-listbox aria-label='Status'>
      <mat-chip [ngClass]='statusClass'>{{ employee.status }}</mat-chip>
    </mat-chip-listbox>

    <!-- Skills -->
    <div class='skills'>
      <mat-chip-listbox>
        <mat-chip *ngFor='let skill of employee.skills'>{{ skill }}</mat-chip>
      </mat-chip-listbox>
    </div>
  </mat-card-content>

  <mat-card-actions align='end'>
    <button mat-button color='primary' (click)='onView()'>VIEW</button>
    <button mat-icon-button color='warn' (click)='onDelete()'>
      <mat-icon>delete</mat-icon>
    </button>
  </mat-card-actions>
</mat-card>
```

```typescript
// employee-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../core/models/employee.model';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent {
  @Input() employee!: Employee;
  @Output() view   = new EventEmitter<Employee>();
  @Output() delete = new EventEmitter<number>();

  get statusClass(): string {
    return this.employee.status === 'active' ? 'status-active' : 'status-leave';
  }

  onView()   { this.view.emit(this.employee); }
  onDelete() { this.delete.emit(this.employee.id); }
}
```

---

## Chapter 5: Form Controls & Validation

Angular Material provides a comprehensive set of form components that integrate seamlessly with Angular's Reactive Forms and Template-Driven Forms.

### 5.1 Key Form Components

| Component | Module | Description |
|---|---|---|
| `mat-form-field` | MatFormFieldModule | Wrapper that adds label, hint, and error |
| `matInput` | MatInputModule | Styled native input/textarea |
| `mat-select` | MatSelectModule | Dropdown selection |
| `mat-checkbox` | MatCheckboxModule | Boolean toggle |
| `mat-radio-group` | MatRadioModule | Single-choice group |
| `mat-datepicker` | MatDatepickerModule | Calendar date picker |
| `mat-slide-toggle` | MatSlideToggleModule | On/off switch |
| `mat-autocomplete` | MatAutocompleteModule | Search with suggestions |

### 5.2 Reactive Form — Add Employee

We will build an 'Add Employee' reactive form with full validation, using our dummy data departments as a select option.

```typescript
// add-employee.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent implements OnInit {
  form!: FormGroup;
  departments = ['Engineering', 'Design', 'HR', 'Finance', 'Marketing'];
  statuses    = ['active', 'on-leave', 'inactive'];

  constructor(private fb: FormBuilder) {}

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
    if (this.form.valid) { console.log(this.form.value); }
    else { this.form.markAllAsTouched(); }
  }
}
```

#### Form Template

```html
<!-- add-employee.component.html -->
<form [formGroup]='form' (ngSubmit)='onSubmit()'>

  <!-- Name row -->
  <div class='form-row'>
    <mat-form-field appearance='outline' class='half-width'>
      <mat-label>First Name</mat-label>
      <input matInput formControlName='firstName' placeholder='Alice'>
      <mat-error>{{ getError('firstName') }}</mat-error>
    </mat-form-field>

    <mat-form-field appearance='outline' class='half-width'>
      <mat-label>Last Name</mat-label>
      <input matInput formControlName='lastName' placeholder='Johnson'>
      <mat-error>{{ getError('lastName') }}</mat-error>
    </mat-form-field>
  </div>

  <!-- Email -->
  <mat-form-field appearance='outline' class='full-width'>
    <mat-label>Email Address</mat-label>
    <input matInput type='email' formControlName='email'>
    <mat-icon matSuffix>email</mat-icon>
    <mat-error>{{ getError('email') }}</mat-error>
  </mat-form-field>

  <!-- Department select -->
  <mat-form-field appearance='outline' class='full-width'>
    <mat-label>Department</mat-label>
    <mat-select formControlName='department'>
      <mat-option *ngFor='let dept of departments' [value]='dept'>
        {{ dept }}
      </mat-option>
    </mat-select>
    <mat-error>{{ getError('department') }}</mat-error>
  </mat-form-field>

  <!-- Salary with prefix -->
  <mat-form-field appearance='outline' class='full-width'>
    <mat-label>Salary</mat-label>
    <span matPrefix>$ &nbsp;</span>
    <input matInput type='number' formControlName='salary'>
    <mat-hint>Minimum $30,000</mat-hint>
    <mat-error>{{ getError('salary') }}</mat-error>
  </mat-form-field>

  <!-- Date Picker -->
  <mat-form-field appearance='outline' class='full-width'>
    <mat-label>Join Date</mat-label>
    <input matInput [matDatepicker]='picker' formControlName='joinDate'>
    <mat-datepicker-toggle matSuffix [for]='picker'></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
    <mat-error>{{ getError('joinDate') }}</mat-error>
  </mat-form-field>

  <div class='actions'>
    <button mat-button type='button' (click)='form.reset()'>Reset</button>
    <button mat-raised-button color='primary' type='submit'>Save Employee</button>
  </div>

</form>
```

---

## Chapter 6: Navigation Components

Navigation is fundamental to any dashboard application. Angular Material provides a Toolbar for the top bar, Sidenav for the side drawer, and Tabs for tabbed content.

### 6.1 App Shell Layout — Toolbar + Sidenav

The main application layout uses `mat-sidenav-container` as the outer wrapper, giving us a responsive shell.

```html
<!-- app.component.html -->
<mat-sidenav-container class='app-container' autosize>

  <!-- SIDE NAVIGATION -->
  <mat-sidenav #sidenav mode='side' opened class='sidenav'>
    <mat-toolbar color='primary'>
      <span>EmpDash</span>
    </mat-toolbar>

    <mat-nav-list>
      <a mat-list-item routerLink='/dashboard' routerLinkActive='active-link'>
        <mat-icon matListItemIcon>dashboard</mat-icon>
        <span matListItemTitle>Dashboard</span>
      </a>
      <a mat-list-item routerLink='/employees' routerLinkActive='active-link'>
        <mat-icon matListItemIcon>people</mat-icon>
        <span matListItemTitle>Employees</span>
      </a>
      <a mat-list-item routerLink='/settings' routerLinkActive='active-link'>
        <mat-icon matListItemIcon>settings</mat-icon>
        <span matListItemTitle>Settings</span>
      </a>
    </mat-nav-list>
  </mat-sidenav>

  <!-- MAIN CONTENT AREA -->
  <mat-sidenav-content>

    <!-- TOP TOOLBAR -->
    <mat-toolbar color='primary' class='toolbar'>
      <button mat-icon-button (click)='sidenav.toggle()'>
        <mat-icon>menu</mat-icon>
      </button>
      <span>Employee Management Dashboard</span>
      <span class='toolbar-spacer'></span>
      <button mat-icon-button [matBadge]='3' matBadgeColor='warn'>
        <mat-icon>notifications</mat-icon>
      </button>
      <button mat-icon-button>
        <mat-icon>account_circle</mat-icon>
      </button>
    </mat-toolbar>

    <!-- ROUTER OUTLET -->
    <main class='main-content'>
      <router-outlet></router-outlet>
    </main>

  </mat-sidenav-content>

</mat-sidenav-container>
```

### 6.2 MatTabs — Employee Detail View

Tabs allow organising related information into sections. The employee detail page uses tabs for profile, salary history, and skills.

```html
<!-- employee-detail.component.html -->
<mat-tab-group animationDuration='300ms' color='primary'>

  <mat-tab>
    <ng-template mat-tab-label>
      <mat-icon class='tab-icon'>person</mat-icon>
      Profile
    </ng-template>
    <app-employee-profile [employee]='employee'></app-employee-profile>
  </mat-tab>

  <mat-tab label='Salary History'>
    <!-- salary content -->
  </mat-tab>

  <mat-tab>
    <ng-template mat-tab-label>
      <mat-icon class='tab-icon'>build</mat-icon>
      Skills
    </ng-template>
    <mat-chip-listbox class='skills-list'>
      <mat-chip *ngFor='let skill of employee?.skills'
                highlighted color='primary'>
        {{ skill }}
      </mat-chip>
    </mat-chip-listbox>
  </mat-tab>

</mat-tab-group>
```

---

## Chapter 7: Data Display — MatTable, Lists & Chips

### 7.1 Basic MatTable

`MatTable` is a powerful data-grid component that works with a `DataSource`. It supports virtual scrolling, lazy loading, sorting, filtering, and pagination.

```typescript
// employees.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee } from '../../core/models/employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {
  displayedColumns = ['avatar','name','department','role','status','salary','actions'];
  dataSource = new MatTableDataSource<Employee>([]);
  isLoading = true;

  constructor(private empService: EmployeeService) {}

  ngOnInit(): void {
    this.empService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.isLoading = false;
    });
  }
}
```

```html
<!-- employees.component.html -->
<div class='loading-wrapper' *ngIf='isLoading'>
  <mat-spinner></mat-spinner>
</div>

<mat-table [dataSource]='dataSource' *ngIf='!isLoading'>

  <!-- Avatar Column -->
  <ng-container matColumnDef='avatar'>
    <mat-header-cell *matHeaderCellDef></mat-header-cell>
    <mat-cell *matCellDef='let emp'>
      <div class='avatar-circle'>{{ emp.avatar }}</div>
    </mat-cell>
  </ng-container>

  <!-- Name Column -->
  <ng-container matColumnDef='name'>
    <mat-header-cell *matHeaderCellDef>Name</mat-header-cell>
    <mat-cell *matCellDef='let emp'>
      {{ emp.firstName }} {{ emp.lastName }}
    </mat-cell>
  </ng-container>

  <!-- Department Column -->
  <ng-container matColumnDef='department'>
    <mat-header-cell *matHeaderCellDef>Department</mat-header-cell>
    <mat-cell *matCellDef='let emp'>{{ emp.department }}</mat-cell>
  </ng-container>

  <!-- Status Column -->
  <ng-container matColumnDef='status'>
    <mat-header-cell *matHeaderCellDef>Status</mat-header-cell>
    <mat-cell *matCellDef='let emp'>
      <mat-chip [color]="emp.status==='active'?'primary':'warn'" highlighted>
        {{ emp.status }}
      </mat-chip>
    </mat-cell>
  </ng-container>

  <!-- Salary Column -->
  <ng-container matColumnDef='salary'>
    <mat-header-cell *matHeaderCellDef>Salary</mat-header-cell>
    <mat-cell *matCellDef='let emp'>
      {{ emp.salary | currency:'USD':'symbol':'1.0-0' }}
    </mat-cell>
  </ng-container>

  <!-- Actions Column -->
  <ng-container matColumnDef='actions'>
    <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
    <mat-cell *matCellDef='let emp'>
      <button mat-icon-button color='primary' [routerLink]="['/employees', emp.id]">
        <mat-icon>visibility</mat-icon>
      </button>
      <button mat-icon-button color='warn' (click)='onDelete(emp)'>
        <mat-icon>delete</mat-icon>
      </button>
    </mat-cell>
  </ng-container>

  <mat-header-row *matHeaderRowDef='displayedColumns'></mat-header-row>
  <mat-row *matRowDef='let row; columns: displayedColumns;'></mat-row>

</mat-table>
```

---

## Chapter 8: Dialogs, Snackbars & Overlays

### 8.1 MatDialog

Dialogs are modal overlays. They are opened programmatically through the `MatDialog` service and can receive data and return results.

```typescript
// confirm-delete-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData { employeeName: string; }

@Component({
  selector: 'app-confirm-delete',
  template: `
    <h2 mat-dialog-title>Confirm Delete</h2>
    <mat-dialog-content>
      Are you sure you want to remove <strong>{{ data.employeeName }}</strong>?
    </mat-dialog-content>
    <mat-dialog-actions align='end'>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color='warn' [mat-dialog-close]='true'>
        Delete
      </button>
    </mat-dialog-actions>
  `
})
export class ConfirmDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}

// Opening the dialog from parent component
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

onDelete(employee: Employee): void {
  const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
    width: '400px',
    data: { employeeName: `${employee.firstName} ${employee.lastName}` }
  });

  dialogRef.afterClosed().subscribe(confirmed => {
    if (confirmed) {
      // Remove from data source
      this.dataSource.data = this.dataSource.data.filter(e => e.id !== employee.id);

      // Show snackbar notification
      this.snackBar.open(`${employee.firstName} has been removed.`, 'Undo', {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        panelClass: ['snack-warn']
      });
    }
  });
}
```

### 8.2 Snackbar Variants

| Use Case | panelClass | Duration |
|---|---|---|
| Success confirmation | `['snack-success']` | 3000ms |
| Error message | `['snack-error']` | 5000ms (with action) |
| Info notification | `['snack-info']` | 3000ms |
| Undo action | `['snack-warn']` | 4000ms |

---

## Chapter 9: Advanced Data Table — Sort, Filter & Pagination

The real power of `MatTable` emerges when you combine `MatSort`, `MatPaginator`, and client-side filtering. This is one of the most common patterns in enterprise dashboards.

### 9.1 Component Setup

```typescript
// advanced-employees.component.ts
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator }       from '@angular/material/paginator';
import { MatSort }            from '@angular/material/sort';
import { EmployeeService }    from '../../core/services/employee.service';
import { Employee }           from '../../core/models/employee.model';

@Component({
  selector: 'app-advanced-employees',
  templateUrl: './advanced-employees.component.html'
})
export class AdvancedEmployeesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  displayedColumns = ['id','name','department','role','salary','status','actions'];
  dataSource = new MatTableDataSource<Employee>([]);
  isLoading = true;

  constructor(private empService: EmployeeService) {}

  ngOnInit(): void {
    this.empService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.isLoading = false;
    });
  }

  ngAfterViewInit(): void {
    // Connect sort & paginator AFTER view is initialised
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;

    // Custom sort for nested property or pipe-formatted value
    this.dataSource.sortingDataAccessor = (emp, col) => {
      switch (col) {
        case 'name': return `${emp.firstName} ${emp.lastName}`;
        default:     return (emp as any)[col];
      }
    };
  }

  // Global filter across all columns
  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Filter by department only
  filterByDept(dept: string): void {
    this.dataSource.filterPredicate = (data, filter) =>
      !filter || data.department.toLowerCase() === filter;
    this.dataSource.filter = dept.toLowerCase();
  }
}
```

### 9.2 Advanced Table Template

```html
<!-- advanced-employees.component.html -->

<!-- Filter + Dept selector toolbar -->
<mat-toolbar class='table-toolbar'>
  <mat-form-field appearance='outline' class='filter-field'>
    <mat-label>Search employees…</mat-label>
    <input matInput (keyup)='applyFilter($event)' placeholder='e.g. Alice'>
    <mat-icon matSuffix>search</mat-icon>
  </mat-form-field>

  <mat-form-field appearance='outline'>
    <mat-label>Department</mat-label>
    <mat-select (selectionChange)='filterByDept($event.value)'>
      <mat-option value=''>All Departments</mat-option>
      <mat-option *ngFor='let d of departments' [value]='d'>{{ d }}</mat-option>
    </mat-select>
  </mat-form-field>
</mat-toolbar>

<!-- Sortable table -->
<mat-table [dataSource]='dataSource' matSort>

  <ng-container matColumnDef='id'>
    <mat-header-cell *matHeaderCellDef mat-sort-header>#</mat-header-cell>
    <mat-cell *matCellDef='let e'>{{ e.id }}</mat-cell>
  </ng-container>

  <ng-container matColumnDef='name'>
    <mat-header-cell *matHeaderCellDef mat-sort-header>Name</mat-header-cell>
    <mat-cell *matCellDef='let e'>{{ e.firstName }} {{ e.lastName }}</mat-cell>
  </ng-container>

  <ng-container matColumnDef='salary'>
    <mat-header-cell *matHeaderCellDef mat-sort-header>Salary</mat-header-cell>
    <mat-cell *matCellDef='let e'>{{ e.salary | currency }}</mat-cell>
  </ng-container>

  <mat-header-row *matHeaderRowDef='displayedColumns; sticky: true'></mat-header-row>
  <mat-row *matRowDef='let row; columns: displayedColumns'></mat-row>

  <!-- No-data row -->
  <tr class='mat-row' *matNoDataRow>
    <td class='mat-cell' [attr.colspan]='displayedColumns.length'>
      No results found for filter: <em>{{ dataSource.filter }}</em>
    </td>
  </tr>

</mat-table>

<!-- Paginator -->
<mat-paginator
  [pageSizeOptions]='[5, 10, 25]'
  showFirstLastButtons
  aria-label='Select page'>
</mat-paginator>
```

---

## Chapter 10: Advanced Theming & Custom Components

### 10.1 Dark Mode Toggle

Implement a user-controlled dark mode by toggling a CSS class on the body element and applying an alternative Material theme.

```typescript
// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark$ = new BehaviorSubject<boolean>(false);
  readonly theme$ = this.isDark$.asObservable();

  toggle(): void {
    const isDark = !this.isDark$.value;
    this.isDark$.next(isDark);
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  init(): void {
    const saved = localStorage.getItem('theme') === 'dark';
    if (saved) { this.toggle(); }
  }
}
```

### 10.2 Building a Custom Themed Component

Use `@mixin` and Angular Material's theming mixins to create a fully theme-aware custom component.

```scss
// employee-status-badge.component.scss
@use '@angular/material' as mat;

@mixin theme($theme) {
  $primary: map.get($theme, primary);
  $warn:    map.get($theme, warn);

  .status-badge {
    &.active   { background: mat.get-color-from-palette($primary, 100); }
    &.on-leave { background: mat.get-color-from-palette($warn, 100); }
  }
}
```

### 10.3 Component-Level Theme Override (density)

```scss
// styles.scss — reduce density for a compact table
@use '@angular/material' as mat;

.compact-table {
  @include mat.table-density(-2);     // -2 = smaller row height
  @include mat.paginator-density(-2);
}
```

### 10.4 Angular Material CDK — Custom Drag-and-Drop

The Component Dev Kit (CDK) provides drag-and-drop functionality without needing any specific visual style.

```bash
# npm install @angular/cdk (already included with Angular Material)
```

```html
<!-- drag-drop-list.component.html -->
<div cdkDropList class='drag-list' (cdkDropListDropped)='drop($event)'>
  <div class='drag-item' *ngFor='let emp of employees' cdkDrag>
    <mat-icon cdkDragHandle>drag_indicator</mat-icon>
    {{ emp.firstName }} {{ emp.lastName }} — {{ emp.department }}
  </div>
</div>
```

```typescript
// In TypeScript:
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

drop(event: CdkDragDrop<Employee[]>): void {
  moveItemInArray(this.employees, event.previousIndex, event.currentIndex);
}
```

---

## Chapter 11: Performance & Best Practices

### 11.1 Lazy Loading Feature Modules

Always lazy-load Angular Material modules per feature to reduce the initial bundle size.

```typescript
// app-routing.module.ts
const routes: Routes = [
  { path: 'employees', loadChildren: () =>
      import('./features/employees/employees.module').then(m => m.EmployeesModule) },
  { path: 'settings', loadChildren: () =>
      import('./features/settings/settings.module').then(m => m.SettingsModule) },
];
```

### 11.2 Virtual Scrolling for Long Lists

When rendering thousands of rows, use the CDK Virtual Scroll viewport instead of a regular list.

```html
<!-- Instead of *ngFor on large lists, use virtual scroll -->
<cdk-virtual-scroll-viewport itemSize='60' style='height: 600px;'>
  <div *cdkVirtualFor='let emp of employees' class='list-item'>
    {{ emp.firstName }} {{ emp.lastName }}
  </div>
</cdk-virtual-scroll-viewport>
```

### 11.3 Performance Checklist

| Practice | Benefit | Implementation |
|---|---|---|
| OnPush change detection | Reduces CD cycles by ~70% | `changeDetection: ChangeDetectionStrategy.OnPush` |
| TrackBy in `*ngFor` | Prevents full list re-render | `trackBy: (i, emp) => emp.id` |
| Lazy-loaded modules | Smaller initial bundle | `loadChildren` in routing |
| Virtual scrolling (CDK) | Handle 10,000+ rows smoothly | `CdkVirtualScrollViewport` |
| Debounce filter input | Fewer filter computations | `debounceTime(300)` on `keyup$` |
| Memoised computations | Avoid re-computing in templates | Use getters / pure pipes |

---

## Chapter 12: Complete Project Source Reference

### 12.1 Employee Model Interface

```typescript
// src/app/core/models/employee.model.ts
export interface Employee {
  id:          number;
  firstName:   string;
  lastName:    string;
  email:       string;
  department:  string;
  role:        string;
  salary:      number;
  joinDate:    string;     // ISO date string
  status:      'active' | 'on-leave' | 'inactive';
  avatar:      string;     // Initials, e.g. 'AJ'
  skills:      string[];
}

export interface DashboardStats {
  totalEmployees: number;
  activeCount:    number;
  onLeaveCount:   number;
}
```

### 12.2 AppModule

```typescript
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,   // Required for Material animations
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,       // Required for MatDatepicker
    AppRoutingModule,
    MaterialModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### 12.3 Quick Command Reference

| Command | Purpose |
|---|---|
| `ng new myapp --routing --style=scss` | Create new Angular 16 project |
| `ng add @angular/material@16` | Add Angular Material with schematics |
| `ng generate component features/employees/list` | Generate a new component |
| `ng generate service core/services/employee` | Generate a service |
| `ng generate module shared/material --flat` | Generate the shared Material module |
| `ng build --configuration=production` | Build for production |
| `ng test` | Run unit tests |

### 12.4 Useful Angular Material Resources

- **Official Docs:** [material.angular.io](https://material.angular.io)
- **Material Icons Explorer:** [fonts.google.com/icons](https://fonts.google.com/icons)
- **Angular CDK:** [material.angular.io/cdk/categories](https://material.angular.io/cdk/categories)
- **Material Design Guidelines:** [m3.material.io](https://m3.material.io)
- **Angular Update Guide:** [update.angular.io](https://update.angular.io)

---

*Angular Material 16 — Employee Management Dashboard Guide*

© 2024 Angular Material Guide
