# Angular v16 — Modules, Lazy Loading & Dependency Injection
### *A Complete Lab Guide with Concepts, Code & Exercises*

> **Covers:** NgModule • Feature Modules • Lazy Loading • Route Guards • Providers • Injection Tokens • Tree-Shaking • Standalone APIs

---

## Table of Contents

- [Chapter 1: Understanding Angular Modules](#chapter-1-understanding-angular-modules)
  - [1.1 What is a Module in Angular?](#11-what-is-a-module-in-angular)
  - [1.2 The @NgModule Decorator — Every Property Explained](#12-the-ngmodule-decorator--every-property-explained)
  - [1.3 Module Types in a Real Angular Application](#13-module-types-in-a-real-angular-application)
- [Chapter 2: Feature Modules & Architecture Patterns](#chapter-2-feature-modules--architecture-patterns)
  - [2.1 Creating a Feature Module](#21-creating-a-feature-module)
  - [2.2 The Shared Module Pattern](#22-the-shared-module-pattern)
  - [2.3 The Core Module Pattern](#23-the-core-module-pattern)
- [Chapter 3: Lazy Loading — Deep Dive](#chapter-3-lazy-loading--deep-dive)
  - [3.1 What is Lazy Loading and Why Does it Matter?](#31-what-is-lazy-loading-and-why-does-it-matter)
  - [3.2 Setting Up Lazy Loading — Step by Step](#32-setting-up-lazy-loading--step-by-step)
  - [3.3 Preloading Strategies](#33-preloading-strategies)
  - [3.4 Route Guards with Lazy Loading](#34-route-guards-with-lazy-loading)
- [Chapter 4: Dependency Injection & Service Architecture](#chapter-4-dependency-injection--service-architecture)
  - [4.1 How Angular's DI System Works](#41-how-angulars-di-system-works)
  - [4.2 The Three Ways to Provide a Service](#42-the-three-ways-to-provide-a-service)
  - [4.3 Provider Configurations — useClass, useValue, useFactory, useExisting](#43-provider-configurations--useclass-usevalue-usefactory-useexisting)
  - [4.4 Injection Tokens](#44-injection-tokens)
  - [4.5 @Optional, @Self, @SkipSelf, @Host — Injection Decorators](#45-optional-self-skipself-host--injection-decorators)
- [Chapter 5: HTTP Interceptors — Module-Scoped Middleware](#chapter-5-http-interceptors--module-scoped-middleware)
  - [5.1 What are HTTP Interceptors?](#51-what-are-http-interceptors)
- [Chapter 6: Standalone Components — The Angular v16 Way](#chapter-6-standalone-components--the-angular-v16-way)
  - [6.1 Standalone Components vs NgModules](#61-standalone-components-vs-ngmodules)
- [Chapter 7: Advanced Module & DI Patterns](#chapter-7-advanced-module--di-patterns)
  - [7.1 forRoot() / forChild() Pattern — Configurable Modules](#71-forroot--forchild-pattern--configurable-modules)
  - [7.2 Dynamic Module Loading with NgComponentOutlet](#72-dynamic-module-loading-with-ngcomponentoutlet)
  - [7.3 Tree-Shakeable Providers Deep Dive](#73-tree-shakeable-providers-deep-dive)
  - [7.4 Service Inheritance & Extending Services](#74-service-inheritance--extending-services)
- [Chapter 8: Complete Lab Project — E-Commerce App](#chapter-8-complete-lab-project--e-commerce-app)
  - [8.1 Project Architecture](#81-project-architecture)
  - [8.2 State Management with Services](#82-state-management-with-services)
- [Chapter 9: Testing Modules & Services](#chapter-9-testing-modules--services)
  - [9.1 Testing a Service with TestBed](#91-testing-a-service-with-testbed)
  - [9.2 Testing a Guard](#92-testing-a-guard)
- [Chapter 10: Best Practices & Common Pitfalls](#chapter-10-best-practices--common-pitfalls)
  - [10.1 The Golden Rules of Angular Modules](#101-the-golden-rules-of-angular-modules)
  - [10.2 Common Pitfalls & How to Fix Them](#102-common-pitfalls--how-to-fix-them)
  - [10.3 Performance Checklist](#103-performance-checklist)
- [Appendix: Quick Reference](#appendix-quick-reference)
  - [A. Angular CLI Module Commands](#a-angular-cli-module-commands)
  - [B. Module Relationship Cheat Sheet](#b-module-relationship-cheat-sheet)
  - [C. Injection Token Checklist](#c-injection-token-checklist)
  - [D. Lazy Loading Mental Model](#d-lazy-loading-mental-model)

---

# Chapter 1: Understanding Angular Modules

## 1.1 What is a Module in Angular?

An Angular **NgModule** is a class decorated with `@NgModule` that acts as a cohesive block of related functionality. It declares which components, directives, and pipes belong to it; which external modules it needs; which providers (services) it creates; and which declarations it makes available to other modules.

> **🎯 Analogy: The City District Analogy**
>
> Think of an Angular app as a city. Each NgModule is a distinct district — the Financial District, the Medical District, the Shopping District. Each district has its own buildings (components), local rules (services), and chooses which other districts it wants to collaborate with (imports). The AppModule is City Hall — the root authority that ties every district together and bootstraps the city. Citizens (users) only see the districts they walk into (lazy-loaded modules only load when you navigate to them).

---

## 1.2 The @NgModule Decorator — Every Property Explained

Every Angular module is defined by the `@NgModule` decorator. Let's dissect every possible property:

```typescript
// src/app/app.module.ts
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }    from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserService }     from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,      // Root component
    HeaderComponent,   // Shared header
    FooterComponent,   // Shared footer
    // RULE: Only declare what belongs to THIS module
  ],
  imports: [
    BrowserModule,        // Must be imported ONLY in AppModule
    FormsModule,          // Enables [(ngModel)]
    HttpClientModule,     // Enables HttpClient injection
    AppRoutingModule,     // Routing configuration
    // Other feature modules go here
  ],
  providers: [
    UserService,          // Available throughout the app
    // Modern: prefer providedIn: 'root' inside the service itself
  ],
  exports: [
    HeaderComponent,      // Other modules can use <app-header>
    FooterComponent,      // Export what other modules need to consume
  ],
  bootstrap: [AppComponent], // Only in AppModule — the root component
})
export class AppModule {}
```

| Property | What It Does | Key Rules |
|---|---|---|
| `declarations` | Lists components, directives & pipes owned by this module | Cannot declare what another module already declares |
| `imports` | Other modules whose exported items this module needs | `BrowserModule`: AppModule only; child modules use `CommonModule` |
| `exports` | Subset of declarations available to importing modules | Services are NOT exported — only declarations |
| `providers` | Services registered in this module's injector | Prefer `providedIn: 'root'` on the service class itself |
| `bootstrap` | The root component Angular creates at startup | Only AppModule has this property |
| `entryComponents` | (Angular 9+ not needed) Dynamic components | Replaced by Ivy; kept for legacy support |
| `schemas` | Allows custom HTML elements (e.g. `CUSTOM_ELEMENTS_SCHEMA`) | Useful for Web Components integration |

---

## 1.3 Module Types in a Real Angular Application

A well-structured Angular app organises its modules into clearly defined types:

| Module Type | Purpose | Examples |
|---|---|---|
| Root Module | Bootstraps the app; imports all feature modules | `AppModule` |
| Feature Module | Groups related features (a domain slice) | `UserModule`, `OrderModule`, `ProductModule` |
| Routing Module | Holds route definitions for a feature | `AppRoutingModule`, `UserRoutingModule` |
| Shared Module | Re-exports common declarations used everywhere | `SharedModule` (pipes, directives, CommonModule) |
| Core Module | Singleton services & one-time-use components | `CoreModule` (NavBar, AuthService, interceptors) |
| Widget/UI Module | Pure UI components without business logic | `MaterialModule`, `NgZorroModule` |

> **💡 Note:** A golden rule: **NEVER** import `SharedModule` into `CoreModule` or vice versa. `CoreModule` is imported ONCE in `AppModule`. `SharedModule` is imported in every Feature Module that needs shared UI.

---

# Chapter 2: Feature Modules & Architecture Patterns

## 2.1 Creating a Feature Module

A Feature Module encapsulates a single business domain. In Angular v16, generate one with the CLI:

```bash
# Generate a feature module with routing
ng generate module features/user --routing --route users --module app.module

# Or shorthand
ng g m features/user --routing

# This creates:
# src/app/features/user/
#   user.module.ts
#   user-routing.module.ts
```

### 2.1.1 Feature Module — Full Example

```typescript
// src/app/features/user/user.module.ts
import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';   // NOT BrowserModule
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule }  from './user-routing.module';
import { SharedModule }       from '../../shared/shared.module';
import { UserListComponent }   from './pages/user-list/user-list.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserFormComponent }   from './pages/user-form/user-form.component';
import { UserCardComponent }   from './components/user-card/user-card.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserFormComponent,
    UserCardComponent,
  ],
  imports: [
    CommonModule,         // *ngIf, *ngFor, async pipe
    ReactiveFormsModule,  // FormBuilder, FormGroup
    UserRoutingModule,    // /users route config
    SharedModule,         // Shared pipes, UI components
  ],
  // No 'exports' — these components are only used via router
})
export class UserModule {}
```

---

## 2.2 The Shared Module Pattern

The `SharedModule` re-exports frequently needed modules and declares shared components/pipes. This prevents importing `CommonModule` in every feature module individually.

```typescript
// src/app/shared/shared.module.ts
import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { RouterModule }     from '@angular/router';

// Shared Declarations
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AvatarComponent }        from './components/avatar/avatar.component';
import { TruncatePipe }           from './pipes/truncate.pipe';
import { TimeAgoPipe }            from './pipes/time-ago.pipe';
import { HighlightDirective }     from './directives/highlight.directive';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AvatarComponent,
    TruncatePipe,
    TimeAgoPipe,
    HighlightDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    // Re-export Angular modules so consumers don't need to import them
    CommonModule,
    FormsModule,
    RouterModule,
    // Export our own declarations
    LoadingSpinnerComponent,
    AvatarComponent,
    TruncatePipe,
    TimeAgoPipe,
    HighlightDirective,
  ],
  // NO providers here — use providedIn: 'root' on services
})
export class SharedModule {}
```

> **⚠️ Warning:** NEVER add providers to `SharedModule`. Because `SharedModule` is imported multiple times (once per Feature Module), services declared in its `providers` array would create MULTIPLE instances — one per importing module. Always use `providedIn: 'root'` on the service class.

---

## 2.3 The Core Module Pattern

The `CoreModule` provides singleton services and one-time components (navigation, auth). It is imported **ONLY** in `AppModule`.

```typescript
// src/app/core/core.module.ts
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent }    from './components/navbar/navbar.component';
import { AuthInterceptor }    from './interceptors/auth.interceptor';
import { AuthService }        from './services/auth.service';
import { LoggingService }     from './services/logging.service';

@NgModule({
  declarations: [NavbarComponent],
  imports:      [CommonModule],
  exports:      [NavbarComponent],
  providers: [
    AuthService,
    LoggingService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoreModule {
  // Guard against importing CoreModule more than once
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it ONLY in AppModule.'
      );
    }
  }
}
```

> **💡 Note:** The `@Optional() @SkipSelf()` constructor guard is a classic Angular pattern to enforce single-import of `CoreModule`. If a lazy module accidentally imports `CoreModule`, Angular throws a clear error at runtime.

---

# Chapter 3: Lazy Loading — Deep Dive

## 3.1 What is Lazy Loading and Why Does it Matter?

By default, Angular bundles **all** modules together into one JavaScript file (`main.js`). For large apps this can be 1MB+ and causes a long initial load time. Lazy loading splits the app into **separate JavaScript chunks** — each feature module gets its own file that is only downloaded when the user navigates to that feature.

> **🎯 Analogy: The Restaurant Menu Analogy**
>
> Think of a restaurant that makes every dish in the kitchen the moment you walk in the door — whether you order it or not. That's eager loading. A smarter restaurant (lazy loading) only cooks a dish when it's actually ordered. The customer gets seated faster (faster initial load), and the kitchen only does work that's actually needed. If a customer never orders the Chef's Special, that dish is never cooked.

| Scenario | Eager Loading | Lazy Loading |
|---|---|---|
| Initial bundle size | All modules included | Only AppModule + bootstrapped modules |
| Time to First Byte | Slower — large download | Faster — minimal initial bundle |
| Feature load time | Instant (already loaded) | Small delay on first navigation |
| Best for | Small apps, always-used modules | Large apps, rarely-used features |
| Memory footprint | Everything in memory | Only loaded features in memory |

---

## 3.2 Setting Up Lazy Loading — Step by Step

### Step 1: Create the Feature Module with Routing

```bash
# Generate with --route flag for automatic lazy route setup
ng generate module features/admin --route admin --module app.module

# This auto-configures lazy loading in app-routing.module.ts:
# { path: 'admin', loadChildren: () =>
#     import('./features/admin/admin.module').then(m => m.AdminModule) }
```

### Step 2: Configure the Root Router

```typescript
// src/app/app-routing.module.ts
import { NgModule }          from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }     from './home/home.component';

const routes: Routes = [
  // Eagerly loaded — part of the main bundle
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },

  // Lazily loaded — separate JS chunk downloaded on demand
  {
    path: 'users',
    loadChildren: () =>
      import('./features/user/user.module').then(m => m.UserModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then(m => m.AdminModule),
    canLoad: [AdminGuard],  // Prevent even downloading the chunk
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard], // Check auth before activating
  },
  { path: '**', redirectTo: '' }, // Wildcard catch-all
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules, // Preload in background
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

### Step 3: Configure the Feature Router (forChild)

```typescript
// src/app/features/user/user-routing.module.ts
import { NgModule }          from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent }   from './pages/user-list/user-list.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserFormComponent }   from './pages/user-form/user-form.component';

const routes: Routes = [
  // Paths are RELATIVE — 'users/' prefix comes from parent router
  { path: '',            component: UserListComponent   }, // /users
  { path: ':id',         component: UserDetailComponent }, // /users/42
  { path: ':id/edit',    component: UserFormComponent   }, // /users/42/edit
  { path: 'new',         component: UserFormComponent   }, // /users/new
];

@NgModule({
  // CRITICAL: Feature modules use forChild(), NOT forRoot()
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
```

> **💡 Note:** `forRoot()` registers the Router service and should only be called ONCE in `AppRoutingModule`. `forChild()` adds routes to the existing router without re-creating the service.

---

## 3.3 Preloading Strategies

Preloading downloads lazy modules in the background after the initial load completes — giving you the best of both worlds: fast startup **and** instant navigation.

```typescript
import { RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';

// Strategy 1: NoPreloading (default) — load only on navigation
RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })

// Strategy 2: PreloadAllModules — preload everything after initial load
RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })

// Strategy 3: Custom — preload only routes with { data: { preload: true } }
// routes:
{ path: 'users',  loadChildren: ..., data: { preload: true  } }
{ path: 'admin',  loadChildren: ..., data: { preload: false } }

// custom-preloading.strategy.ts
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data?.['preload'] ? load() : of(null);
  }
}

// Register in AppRoutingModule:
RouterModule.forRoot(routes, {
  preloadingStrategy: SelectivePreloadingStrategy
})
```

---

## 3.4 Route Guards with Lazy Loading

Angular v16 provides five types of guards. Two are particularly important with lazy loading:

| Guard | Interface | Purpose | Returns |
|---|---|---|---|
| `canActivate` | `CanActivateFn` | Can user access this route? | `boolean \| UrlTree` |
| `canActivateChild` | `CanActivateChildFn` | Can user access child routes? | `boolean \| UrlTree` |
| `canDeactivate` | `CanDeactivateFn` | Can user leave this route? | `boolean \| UrlTree` |
| `canLoad` | `CanLoadFn` | Can the CHUNK even be downloaded? | `boolean \| UrlTree` |
| `canMatch` | `CanMatchFn` | Should this route match at all? (v14.1+) | `boolean \| UrlTree` |
| `resolve` | `ResolveFn` | Pre-fetch data before activating | `Observable \| Promise` |

```typescript
// src/app/core/guards/auth.guard.ts  (Angular v14+ functional style)
import { inject }      from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// canActivate: blocks route activation if not authenticated
export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  // Redirect to login, preserving intended URL
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};

// canLoad: prevents even downloading the admin chunk
export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.hasRole('ADMIN');
};

// Usage in routes:
{
  path: 'admin',
  canActivate: [authGuard, adminGuard],
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
}
```

### 3.4.1 Resolve Guard — Pre-loading Data

```typescript
// src/app/features/user/guards/user.resolver.ts
import { inject }        from '@angular/core';
import { ResolveFn }     from '@angular/router';
import { UserService }   from '../services/user.service';
import { User }          from '../models/user.model';

export const userResolver: ResolveFn<User> = (route) => {
  const userService = inject(UserService);
  return userService.getById(route.paramMap.get('id')!);
  // Data is available in component via route.data['user']
};

// Register in route config:
{
  path: ':id',
  component: UserDetailComponent,
  resolve: { user: userResolver }
}

// Access in component:
@Component({...})
export class UserDetailComponent {
  user = this.route.snapshot.data['user'] as User;
  constructor(private route: ActivatedRoute) {}
}
```

> **🧪 Lab Exercise: Lab 1 — Implement Lazy Loading**
>
> 1. Create a new Angular v16 project: `ng new angular-modules-lab --routing`
> 2. Generate three feature modules: `users`, `products`, `admin` (each with `--routing`)
> 3. Configure lazy loading routes in `app-routing.module.ts`
> 4. Create an `authGuard` (functional style) that checks `localStorage` for a token
> 5. Apply the guard to the admin route
> 6. Build the project (`ng build`) and inspect the `dist/` folder — notice separate chunk files
> 7. Measure bundle sizes with `ng build --stats-json` and use `webpack-bundle-analyzer`

---

# Chapter 4: Dependency Injection & Service Architecture

## 4.1 How Angular's DI System Works

Angular uses a **hierarchical injection system**. Every module and component can have its own injector. When a token is requested, Angular walks up the injector tree until it finds a provider, or throws an error.

> **🎯 Analogy: The Library System Analogy**
>
> Angular's DI system is like a city library network. When you need a book (service), you first check your local branch (component injector). If they don't have it, they check the district library (feature module injector). If still not found, they check the main city library (root injector). The first library that has the book provides it. If you want everyone in the city to share the SAME copy of a book, you keep it in the main library (`providedIn: 'root'`).

---

## 4.2 The Three Ways to Provide a Service

### 4.2.1 `providedIn: 'root'` — The Recommended Way

```typescript
// src/app/core/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User }       from '../models/user.model';

@Injectable({
  providedIn: 'root',  // Registered in the ROOT injector
                       // Single instance shared app-wide
                       // Tree-shakeable (removed if never injected)
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  create(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  update(id: string, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, user);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

### 4.2.2 `providedIn: 'any'` — Instance Per Lazy Module

```typescript
// providedIn: 'any' — creates a new instance for EACH lazy-loaded module
// Eagerly loaded modules still share the root instance
// Use when each lazy module needs its own isolated service state
@Injectable({ providedIn: 'any' })
export class CartService {
  // Each lazy feature gets its own CartService instance
  private items: CartItem[] = [];
}
```

### 4.2.3 Module-Level providers — Scoped Instances

```typescript
// Providing inside a module's providers array creates an instance
// scoped to that module's injector and all its children
@NgModule({
  providers: [
    CartService,  // New instance scoped to this module only
  ]
})
export class CheckoutModule {}

// Component-level providers — new instance per component
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  providers: [CounterService], // New instance per component instance
})
export class CounterComponent {
  constructor(private counter: CounterService) {}
}
```

---

## 4.3 Provider Configurations — useClass, useValue, useFactory, useExisting

Angular's DI supports multiple provider recipe types beyond a simple class reference:

```typescript
// src/app/core/core.module.ts — various provider recipes

// 1. useClass — provide a DIFFERENT class for a token
//    Useful for swapping implementations (e.g., mock vs real)
{ provide: UserService, useClass: MockUserService }

// 2. useValue — provide a static VALUE for a token
//    Useful for configuration, feature flags, constants
{ provide: API_URL,       useValue: 'https://api.production.com' }
{ provide: FEATURE_FLAGS, useValue: { darkMode: true, beta: false } }

// 3. useFactory — provide value created by a factory function
//    Useful when creation depends on other services / runtime conditions
{
  provide: Logger,
  useFactory: (env: Environment) => {
    return env.production ? new ProdLogger() : new DevLogger();
  },
  deps: [Environment],  // Inject Environment into the factory
},

// 4. useExisting — alias one token to another
//    Both tokens resolve to the SAME instance
{ provide: OldUserService, useExisting: UserService }

// 5. multi: true — multiple values for a single token (array)
{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,    multi: true }
{ provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
```

---

## 4.4 Injection Tokens

When you want to inject a non-class value (a string, number, object, or interface), you need an **InjectionToken**. It provides a unique, type-safe DI token.

```typescript
// src/app/core/tokens/app-config.token.ts
import { InjectionToken } from '@angular/core';

// Define the interface
export interface AppConfig {
  apiUrl:     string;
  maxRetries: number;
  timeout:    number;
  featureFlags: {
    darkMode: boolean;
    betaFeatures: boolean;
  };
}

// Create the token with the type as generic
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

// ─── Provide in AppModule ────────────────────────────────────────────────
// app.module.ts
@NgModule({
  providers: [
    {
      provide:  APP_CONFIG,
      useValue: {
        apiUrl:     'https://api.example.com',
        maxRetries: 3,
        timeout:    5000,
        featureFlags: { darkMode: false, betaFeatures: true },
      } satisfies AppConfig,
    },
  ],
})

// ─── Inject in a service ─────────────────────────────────────────────────
import { inject, Inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // Modern way (Angular v14+)
  private config = inject(APP_CONFIG);

  // Classic way
  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}
}
```

### 4.4.1 InjectionToken with Factory — Self-Contained Tokens

```typescript
// Token provides its own default factory — no need to register in NgModule
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG', {
  providedIn: 'root',
  factory: () => ({
    apiUrl:     'https://api.example.com',
    maxRetries: 3,
    timeout:    5000,
    featureFlags: { darkMode: false, betaFeatures: false },
  }),
});

// Can still be overridden in any module's providers array
```

---

## 4.5 @Optional, @Self, @SkipSelf, @Host — Injection Decorators

These decorators control exactly how Angular searches the injector hierarchy:

| Decorator | Behaviour | Use Case |
|---|---|---|
| `@Optional()` | Returns `null` if no provider found (no error) | Optional features, progressive enhancement |
| `@Self()` | Only looks in the current component's injector | Enforce local providers only |
| `@SkipSelf()` | Skips the current injector, starts at parent | CoreModule guard pattern |
| `@Host()` | Only looks up to the host component | Directives finding their host's service |

```typescript
import { Injectable, Optional, Self, SkipSelf, Host } from '@angular/core';

// @Optional: safely inject a service that may not exist
@Component({ selector: 'app-debug-panel' })
export class DebugPanelComponent {
  constructor(@Optional() private debugService?: DebugService) {
    if (this.debugService) {
      this.debugService.log('DebugPanel initialised');
    }
  }
}

// @Self: only resolve from THIS component's providers
@Component({
  providers: [FormValidationService]  // Local instance
})
export class FormComponent {
  constructor(@Self() private validator: FormValidationService) {}
}

// @SkipSelf: skip current, start searching from parent
export class ChildModule {
  constructor(@Optional() @SkipSelf() parent?: ChildModule) {
    if (parent) throw new Error('ChildModule already loaded');
  }
}
```

---

# Chapter 5: HTTP Interceptors — Module-Scoped Middleware

## 5.1 What are HTTP Interceptors?

Interceptors are services that implement `HttpInterceptor`. They sit between your code and the network, allowing you to inspect and transform every **outgoing request** and every **incoming response**. They are registered as multi-providers on the `HTTP_INTERCEPTORS` token.

> **🎯 Analogy: The Passport Control Analogy**
>
> Think of HTTP interceptors as passport control and customs at an international airport. Every person (HTTP request) must pass through passport control (interceptors) before leaving the country. Officers can stamp passports (add auth headers), check baggage (log request bodies), turn people away (cancel requests), or add customs declarations (transform responses). Multiple checkpoints can be chained — immigration, security, and customs all run in sequence.

### 5.1.1 Authentication Interceptor

```typescript
// src/app/core/interceptors/auth.interceptor.ts
import { Injectable }    from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor }
  from '@angular/common/http';
import { Observable }    from 'rxjs';
import { AuthService }   from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();

    if (!token) {
      return next.handle(req); // Pass through unchanged
    }

    // Clone the request — HttpRequests are IMMUTABLE
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    return next.handle(authReq);
  }
}
```

### 5.1.2 Error Handling Interceptor

```typescript
// src/app/core/interceptors/error.interceptor.ts
import { Injectable }    from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler,
         HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError }  from 'rxjs';
import { catchError, retry }       from 'rxjs/operators';
import { Router }        from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1), // Retry failed requests once
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.router.navigate(['/login']);
            break;
          case 403:
            this.router.navigate(['/forbidden']);
            break;
          case 500:
            console.error('Server error:', error.message);
            break;
        }
        return throwError(() => error);
      })
    );
  }
}
```

### 5.1.3 Registering Interceptors

```typescript
// src/app/core/core.module.ts
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor }   from './interceptors/auth.interceptor';
import { ErrorInterceptor }  from './interceptors/error.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@NgModule({
  providers: [
    // Interceptors run in ORDER of registration (top to bottom)
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,    multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor,   multi: true },
  ]
})
export class CoreModule {}

// Request flow:  LoggingInterceptor → AuthInterceptor → ErrorInterceptor → Server
// Response flow: ErrorInterceptor  → AuthInterceptor → LoggingInterceptor → Component
```

---

# Chapter 6: Standalone Components — The Angular v16 Way

## 6.1 Standalone Components vs NgModules

Angular v14 introduced **Standalone Components** as a developer preview. In Angular **v16**, they are stable and production-ready. Standalone components skip NgModule entirely — they declare their dependencies directly.

| Feature | NgModule Approach | Standalone Approach |
|---|---|---|
| Dependency declaration | In module's `imports` array | Directly in `@Component` imports |
| Service scope | Module providers / `providedIn` | `inject()` / `bootstrapApplication` providers |
| Lazy loading | `loadChildren`: module | `loadComponent`: standalone component |
| SharedModule | Required for common pipes | Import `CommonModule`/pipes directly |
| Boilerplate | Higher (separate module file) | Lower (self-contained) |
| Tree-shaking | Module-level | Component-level (more granular) |
| Best for | Large existing codebases | New projects, new features |

### 6.1.1 Standalone Component Example

```typescript
// src/app/features/product/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }     from '@angular/common';
import { RouterModule }     from '@angular/router';
import { FormsModule }      from '@angular/forms';
import { ProductService }   from './product.service';
import { Product }          from './product.model';
import { ProductCardComponent } from './product-card.component';

@Component({
  selector:    'app-product-list',
  standalone:  true,               // <-- Key flag
  imports: [
    CommonModule,                  // *ngIf, *ngFor, async pipe
    RouterModule,                  // routerLink
    FormsModule,                   // [(ngModel)]
    ProductCardComponent,          // Another standalone component
  ],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe(p => this.products = p);
  }
}
```

### 6.1.2 Lazy Loading a Standalone Component

```typescript
// app-routing.module.ts — lazy load a standalone component directly
const routes: Routes = [
  {
    path: 'products',
    // loadComponent instead of loadChildren
    loadComponent: () =>
      import('./features/product/product-list.component')
        .then(m => m.ProductListComponent),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      // Lazy load a standalone ROUTES array (no module needed)
      import('./features/checkout/checkout.routes')
        .then(m => m.CHECKOUT_ROUTES),
  },
];

// checkout.routes.ts
export const CHECKOUT_ROUTES: Routes = [
  { path: '',     component: CheckoutStepOneComponent },
  { path: 'pay',  component: CheckoutPaymentComponent },
  { path: 'done', component: CheckoutConfirmComponent },
];
```

### 6.1.3 Bootstrapping a Full Standalone App

```typescript
// src/main.ts — fully standalone app (no AppModule)
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter }        from '@angular/router';
import { provideHttpClient,
         withInterceptors }     from '@angular/common/http';
import { provideAnimations }    from '@angular/platform-browser/animations';
import { AppComponent }         from './app/app.component';
import { APP_ROUTES }           from './app/app.routes';
import { authInterceptor }      from './app/core/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    // Router with lazy routes
    provideRouter(APP_ROUTES),

    // HttpClient with functional interceptors
    provideHttpClient(
      withInterceptors([authInterceptor])  // Functional style
    ),

    // Animations
    provideAnimations(),

    // Custom providers
    { provide: APP_CONFIG, useValue: environment },
  ]
}).catch(err => console.error(err));
```

---

# Chapter 7: Advanced Module & DI Patterns

## 7.1 forRoot() / forChild() Pattern — Configurable Modules

Use this pattern when you want to create a library module that accepts **configuration** at import time. `forRoot()` is called once (in AppModule) with configuration; `forChild()` is called in feature modules without configuration.

```typescript
// src/app/logger/logger.module.ts
import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';

export interface LoggerConfig {
  level:   'debug' | 'info' | 'warn' | 'error';
  remote:  boolean;
  apiUrl?: string;
}

export const LOGGER_CONFIG = new InjectionToken<LoggerConfig>('LOGGER_CONFIG');

@NgModule({
  // Declarations, imports, exports for logging UI components...
})
export class LoggerModule {
  // forRoot: called once in AppModule with configuration
  static forRoot(config: LoggerConfig): ModuleWithProviders<LoggerModule> {
    return {
      ngModule: LoggerModule,
      providers: [
        { provide: LOGGER_CONFIG, useValue: config },
        LoggerService,
        RemoteLoggerService,
      ],
    };
  }

  // forChild: called in feature modules (no providers)
  static forChild(): ModuleWithProviders<LoggerModule> {
    return { ngModule: LoggerModule };
  }
}

// AppModule usage:
LoggerModule.forRoot({ level: 'info', remote: true, apiUrl: '/logs' })

// FeatureModule usage:
LoggerModule.forChild()
```

---

## 7.2 Dynamic Module Loading with NgComponentOutlet

```typescript
// Dynamically render a component based on runtime data
import { Component, Input, Type } from '@angular/core';
import { CommonModule }           from '@angular/common';
import { NgComponentOutlet }      from '@angular/common';

@Component({
  selector:   'app-dynamic-widget',
  standalone: true,
  imports:    [NgComponentOutlet],
  template: `
    <ng-container *ngComponentOutlet="widgetComponent"></ng-container>
  `
})
export class DynamicWidgetComponent {
  @Input() widgetType!: string;

  get widgetComponent(): Type<any> {
    const map: Record<string, Type<any>> = {
      'chart':  ChartWidgetComponent,
      'table':  TableWidgetComponent,
      'map':    MapWidgetComponent,
    };
    return map[this.widgetType];
  }
}
```

---

## 7.3 Tree-Shakeable Providers Deep Dive

When you use `providedIn: 'root'`, Angular can **tree-shake** the service out of the bundle if it is never injected anywhere. This is only possible with `providedIn` — services listed in module `providers` arrays are **always** included in the bundle regardless of usage.

```typescript
// ✅ Tree-shakeable — removed from bundle if never injected
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  // Only included in bundle if something injects AnalyticsService
}

// ❌ NOT tree-shakeable — always included because it's in providers array
@NgModule({
  providers: [AnalyticsService]  // Always bundled, even if unused
})
export class CoreModule {}

// ✅ Feature-scoped tree-shakeable service
@Injectable({ providedIn: UserModule })
export class UserPreferencesService {
  // Only available within UserModule; tree-shaken if UserModule
  // is lazy-loaded and never navigated to
}
```

---

## 7.4 Service Inheritance & Extending Services

```typescript
// Base service with common CRUD operations
@Injectable()
export abstract class BaseApiService<T> {
  constructor(
    protected http: HttpClient,
    protected baseUrl: string
  ) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  getById(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create(entity: Partial<T>): Observable<T> {
    return this.http.post<T>(this.baseUrl, entity);
  }

  update(id: number | string, entity: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, entity);
  }

  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

// Concrete service — inherits all CRUD, adds domain methods
@Injectable({ providedIn: 'root' })
export class UserService extends BaseApiService<User> {
  constructor(http: HttpClient) {
    super(http, 'https://api.example.com/users');
  }

  // Domain-specific method
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`);
  }
}
```

---

# Chapter 8: Complete Lab Project — E-Commerce App

## 8.1 Project Architecture

Apply all concepts in a structured e-commerce application. Here is the recommended folder structure:

```
src/
├── app/
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── app-routing.module.ts
│   │
│   ├── core/                    # CoreModule — singleton services
│   │   ├── core.module.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── logging.service.ts
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   └── admin.guard.ts
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   │   └── error.interceptor.ts
│   │   └── tokens/
│   │       └── app-config.token.ts
│   │
│   ├── shared/                  # SharedModule — reusable UI
│   │   ├── shared.module.ts
│   │   ├── components/
│   │   │   ├── loading-spinner/
│   │   │   └── error-message/
│   │   ├── directives/
│   │   │   └── highlight.directive.ts
│   │   └── pipes/
│   │       ├── currency-format.pipe.ts
│   │       └── truncate.pipe.ts
│   │
│   └── features/                # Feature Modules (lazy-loaded)
│       ├── home/
│       │   ├── home.module.ts
│       │   └── home.component.ts
│       ├── product/             # Lazy loaded
│       │   ├── product.module.ts
│       │   ├── product-routing.module.ts
│       │   ├── services/product.service.ts
│       │   └── pages/ ...
│       ├── cart/                # Lazy loaded
│       │   └── ...
│       └── admin/               # Lazy loaded + guard
│           └── ...
```

---

## 8.2 State Management with Services

```typescript
// src/app/features/cart/services/cart.service.ts
import { Injectable }        from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged }   from 'rxjs/operators';
import { Product }           from '../../product/models/product.model';

export interface CartItem {
  product:  Product;
  quantity: number;
}

export interface CartState {
  items:     CartItem[];
  isLoading: boolean;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private state$ = new BehaviorSubject<CartState>({
    items:     [],
    isLoading: false,
  });

  // Selector observables
  items$: Observable<CartItem[]> = this.state$.pipe(
    map(s => s.items),
    distinctUntilChanged()
  );

  itemCount$: Observable<number> = this.items$.pipe(
    map(items => items.reduce((sum, i) => sum + i.quantity, 0))
  );

  total$: Observable<number> = this.items$.pipe(
    map(items => items.reduce(
      (sum, i) => sum + i.product.price * i.quantity, 0
    ))
  );

  addItem(product: Product, quantity = 1): void {
    const current  = this.state$.value;
    const existing = current.items.find(i => i.product.id === product.id);

    const items = existing
      ? current.items.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      : [...current.items, { product, quantity }];

    this.state$.next({ ...current, items });
  }

  removeItem(productId: number): void {
    const current = this.state$.value;
    this.state$.next({
      ...current,
      items: current.items.filter(i => i.product.id !== productId)
    });
  }

  clearCart(): void {
    this.state$.next({ items: [], isLoading: false });
  }
}
```

> **🧪 Lab Exercise: Lab 2 — Build the E-Commerce App**
>
> 1. Create the project structure shown in section 8.1 using the Angular CLI
> 2. Implement `CoreModule` with `AuthService` (JWT), `AuthGuard` and `AuthInterceptor`
> 3. Implement `SharedModule` with a `LoadingSpinnerComponent` and `TruncatePipe`
> 4. Create `ProductModule` (lazy loaded) with product list, detail and search
> 5. Create `CartModule` (lazy loaded) using the `CartService` above
> 6. Create `AdminModule` (lazy loaded) with `adminGuard` (role: `ADMIN`)
> 7. Add `APP_CONFIG` InjectionToken with API URL and feature flags
> 8. Implement Error and Logging interceptors in `CoreModule`
> 9. Refactor one feature module to use Standalone Components
> 10. Run `ng build --stats-json` and analyze bundle sizes

---

# Chapter 9: Testing Modules & Services

## 9.1 Testing a Service with TestBed

```typescript
// src/app/core/services/user.service.spec.ts
import { TestBed }         from '@angular/core/testing';
import { HttpClientTestingModule,
         HttpTestingController } from '@angular/common/http/testing';
import { UserService }     from './user.service';
import { APP_CONFIG }      from '../tokens/app-config.token';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: APP_CONFIG, useValue: { apiUrl: 'http://test-api' } }
      ],
    });
    service  = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify()); // Ensure no outstanding requests

  it('should fetch all users', () => {
    const mockUsers = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

    service.getAll().subscribe(users => {
      expect(users).toEqual(mockUsers);
      expect(users.length).toBe(2);
    });

    const req = httpMock.expectOne('http://test-api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should handle 404 error', () => {
    service.getById('999').subscribe({
      error: err => expect(err.status).toBe(404)
    });

    const req = httpMock.expectOne('http://test-api/users/999');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });
});
```

---

## 9.2 Testing a Guard

```typescript
// src/app/core/guards/auth.guard.spec.ts
import { TestBed }         from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authGuard }       from './auth.guard';
import { AuthService }     from '../services/auth.service';

describe('authGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
  });

  it('should allow access when authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, {} as RouterStateSnapshot)
    );

    expect(result).toBe(true);
  });

  it('should redirect when not authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, { url: '/admin' } as RouterStateSnapshot)
    );

    expect(result).not.toBe(true); // UrlTree redirect
  });
});
```

---

# Chapter 10: Best Practices & Common Pitfalls

## 10.1 The Golden Rules of Angular Modules

| Rule | Correct | Incorrect |
|---|---|---|
| BrowserModule scope | Import once in AppModule | Importing in feature modules |
| CommonModule | Import in every feature module | Relying on BrowserModule in features |
| Service providers | Use `providedIn: 'root'` | Declaring in SharedModule providers |
| CoreModule | Import once in AppModule | Importing in feature or shared modules |
| `RouterModule.forRoot` | Call once in AppRoutingModule | Calling in feature modules |
| `RouterModule.forChild` | Use in all feature routing modules | Using `forRoot()` in features |
| Lazy loading | `loadChildren` with dynamic `import()` | Importing feature modules in AppModule |
| Declarations | Declare in exactly ONE module | Declaring in multiple modules |

---

## 10.2 Common Pitfalls & How to Fix Them

### Pitfall 1: Duplicate Service Instances

```typescript
// ❌ PROBLEM: Service in SharedModule providers creates duplicate instances
@NgModule({
  providers: [UserService] // BAD — every importer gets a new instance!
})
export class SharedModule {}

// ✅ FIX: Use providedIn: 'root' — single instance guaranteed
@Injectable({ providedIn: 'root' })
export class UserService { ... }
```

### Pitfall 2: Circular Module Dependencies

```typescript
// ❌ PROBLEM: Module A imports Module B, Module B imports Module A
// ModuleA imports [ModuleB] && ModuleB imports [ModuleA]
// → Error: Circular dependency!

// ✅ FIX: Extract shared functionality to SharedModule
// ModuleA imports [SharedModule]
// ModuleB imports [SharedModule]
// Neither imports the other
```

### Pitfall 3: Forgetting to Add Components to Declarations

```typescript
// ❌ Error: 'app-user-card' is not a known element
// Cause: UserCardComponent was never added to declarations
@NgModule({
  imports: [CommonModule, UserRoutingModule],
  // declarations: [] ← UserCardComponent missing!
})
export class UserModule {}

// ✅ FIX: Add it to declarations
@NgModule({
  declarations: [UserListComponent, UserCardComponent], // ← Added
  imports:      [CommonModule, UserRoutingModule],
})
export class UserModule {}
```

### Pitfall 4: Not Unsubscribing from Observables

```typescript
// ❌ Memory leak — subscription lives forever
@Component({ ... })
export class UserListComponent implements OnInit {
  ngOnInit() {
    this.userService.getAll().subscribe(u => this.users = u);
    // Never unsubscribed!
  }
}

// ✅ FIX Option 1: takeUntil + Subject
export class UserListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.userService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(u => this.users = u);
  }

  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }
}

// ✅ FIX Option 2: async pipe in template (auto-unsubscribes)
// In template: *ngIf="users$ | async as users"
```

---

## 10.3 Performance Checklist

| Optimisation | Implementation | Impact |
|---|---|---|
| Lazy load all feature routes | `loadChildren` with dynamic `import()` | Reduces initial bundle size |
| Selective preloading | Custom `PreloadingStrategy` | Fast nav without large initial load |
| `providedIn: 'root'` | On all services instead of module providers | Enables tree-shaking |
| OnPush change detection | `@Component changeDetection: ChangeDetectionStrategy.OnPush` | Reduces re-render cycles |
| TrackBy in `*ngFor` | `trackBy: trackByFn` | Prevents full DOM re-render on list changes |
| `async` pipe over manual subscribe | `\| async` in templates | Auto-unsubscribe, no memory leaks |
| Standalone components | For new components/features | Smaller, more granular bundles |
| Avoid importing BrowserModule in features | Use `CommonModule` instead | Prevents duplicate providers |

---

# Appendix: Quick Reference

## A. Angular CLI Module Commands

```bash
# Generate a module
ng g module features/blog
ng g module features/blog --routing
ng g module features/blog --route blog --module app.module

# Generate components/services/guards in a module
ng g component features/blog/pages/blog-list
ng g service  features/blog/services/blog
ng g guard    core/guards/auth
ng g pipe     shared/pipes/truncate
ng g directive shared/directives/highlight

# Generate standalone component (Angular v16)
ng g component features/blog/pages/blog-list --standalone

# Analyse bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/app/stats.json
```

---

## B. Module Relationship Cheat Sheet

| Relationship | Rule | Example |
|---|---|---|
| AppModule → CoreModule | Import ONCE in AppModule | `imports: [CoreModule]` |
| AppModule → SharedModule | NEVER — AppModule does not need shared UI | N/A |
| FeatureModule → SharedModule | Import in every feature that needs shared UI | `imports: [SharedModule]` |
| FeatureModule → CoreModule | NEVER — CoreModule is AppModule-only | CoreModule guard enforces this |
| AppRoutingModule → FeatureModule | Via lazy `loadChildren`, NOT direct import | `loadChildren: () => import(...)` |
| FeatureModule → FeatureModule | NEVER directly — extract to SharedModule | SharedModule holds shared code |

---

## C. Injection Token Checklist

- Use `InjectionToken<T>` for non-class values (strings, objects, interfaces)
- Provide `InjectionToken` in AppModule's `providers`, CoreModule, or with `factory` option
- Use `inject()` (Angular v14+) or `@Inject()` decorator to consume tokens
- Type the token generically for compile-time safety: `new InjectionToken<MyConfig>()`
- Consider `providedIn` with `factory` for self-contained tokens

---

## D. Lazy Loading Mental Model

```typescript
// Without lazy loading (eager):
// Browser downloads: main.js (contains EVERYTHING)
// Bundle:  AppModule + UserModule + AdminModule + ProductModule
// Size:    ~500KB on first load

// With lazy loading:
// Browser downloads: main.js (contains AppModule only)
// main.js size:  ~80KB (fast initial load!)

// When user navigates to /users:
//   Browser downloads: users-users-module.js  (~40KB)

// When user navigates to /admin:
//   Browser downloads: admin-admin-module.js  (~60KB)

// When user navigates to /products:
//   Browser downloads: product-product-module.js  (~50KB)

// If user NEVER visits /admin → its JS is NEVER downloaded
```

---

**Reference:** https://blog.angular-university.io/angular2-ngmodule/

---

*— End of Document —*

*Angular v16 Lab Guide • Modules, Lazy Loading & Dependency Injection*
