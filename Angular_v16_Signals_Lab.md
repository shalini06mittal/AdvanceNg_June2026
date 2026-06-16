# Angular v16 Signals: A Comprehensive Lab Guide

**Learn Angular Signals: The New Reactivity Primitive**

Version 1.0 | Updated: June 2024

---

## Table of Contents

1. [Introduction to Angular Signals](#1-introduction-to-angular-signals)
2. [What Are Signals?](#2-what-are-signals)
3. [Getting Started with Signals](#3-getting-started-with-signals)
4. [Creating and Reading Signals](#4-creating-and-reading-signals)
5. [Updating Signal Values](#5-updating-signal-values)
6. [Computed Signals](#6-computed-signals)
7. [Effects: Side Effects with Signals](#7-effects-side-effects-with-signals)
8. [Change Detection: Traditional vs Signals](#8-change-detection-traditional-vs-signals)
9. [Practical Examples & Lab Exercises](#9-practical-examples--lab-exercises)
10. [Best Practices & Performance](#10-best-practices--performance)
11. [Comparison: Signals vs RxJS](#11-comparison-signals-vs-rxjs)
12. [Conclusion](#12-conclusion)

---

## 1. Introduction to Angular Signals

Angular v16 introduces **Signals**, a groundbreaking reactivity primitive that fundamentally changes how developers manage state in Angular applications. This lab guide provides comprehensive coverage of Signals, from basic concepts to advanced patterns, with practical exercises to solidify your understanding.

### Why Signals Matter

- **Simplify state management** with a lightweight API
- **Reduce boilerplate** compared to traditional RxJS observables
- **Enable fine-grained reactivity** for optimal performance
- **Provide a foundation** for Angular's future evolution

---

## 2. What Are Signals?

Signals are a new reactivity primitive in Angular. A **Signal** is a wrapper around a value that can notify dependents when that value changes. Unlike traditional component state management, Signals provide fine-grained reactivity where only the exact parts of your application that depend on a signal update when it changes.

### Key Characteristics

- **Synchronous and predictable** - Signals execute immediately
- **Lightweight with minimal overhead** - Minimal performance impact
- **Integrates seamlessly with Angular templates** - Works naturally in component templates
- **Enables automatic change detection** - Fine-grained update tracking

### Signal vs Observable

| Feature | Signals | Observables |
|---------|---------|-------------|
| Execution | Synchronous | Asynchronous |
| API | Simple | Operator-based |
| Updates | Fine-grained | Subscription-based |
| Evaluation | Memoized | Lazy evaluation |

---

## 3. Getting Started with Signals

### Installation & Setup

Signals are available in Angular v16.0.0 and later. Update your project with:

```bash
ng update @angular/core @angular/cli
```

### Importing Signal API

Import the Signal function and related utilities from `@angular/core`:

```typescript
import { signal, computed, effect } from '@angular/core';
```

---

## 4. Creating and Reading Signals

### Creating a Signal

Create a signal with an initial value using the `signal()` function:

```typescript
import { Component } from '@angular/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `<p>Count: {{ count() }}</p>`
})
export class CounterComponent {
  count = signal(0);
}
```

### Reading Signal Values

In templates, read signals by calling them as functions. In TypeScript code, access the value the same way:

```typescript
// In template
<p>{{ count() }}</p>

// In TypeScript
export class MyComponent {
  count = signal(0);
  
  logCount() {
    console.log(this.count()); // Read the current value
  }
}
```

**Note:** Signals must be read by calling them as functions, not by direct property access.

---

## 5. Updating Signal Values

Signals provide multiple methods to update their values. Choose the appropriate method based on your use case.

### Method 1: Using `set()`

The `set()` method replaces the signal's value entirely:

```typescript
export class CounterComponent {
  count = signal(0);
  
  reset() {
    this.count.set(0);
  }
}
```

### Method 2: Using `update()`

The `update()` method transforms the current value based on a function:

```typescript
export class CounterComponent {
  count = signal(0);
  
  increment() {
    this.count.update(val => val + 1);
  }
  
  decrement() {
    this.count.update(val => val - 1);
  }
}
```

### Method 3: Mutating Objects

For complex objects, use `update()` with object spread syntax:

```typescript
export class UserComponent {
  user = signal({ name: 'John', age: 30 });
  
  updateName(newName: string) {
    this.user.update(u => ({ ...u, name: newName }));
  }
}
```

---

## 6. Computed Signals

Computed signals derive their value from other signals. They automatically update whenever their dependencies change, and they cache results to avoid unnecessary recalculations.

### Creating Computed Signals

Use the `computed()` function to create a signal that derives from other signals:

```typescript
import { Component } from '@angular/core';
import { signal, computed } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <p>First: {{ firstName() }}</p>
    <p>Last: {{ lastName() }}</p>
    <p>Full: {{ fullName() }}</p>
  `
})
export class UserComponent {
  firstName = signal('John');
  lastName = signal('Doe');
  
  fullName = computed(() => 
    `${this.firstName()} ${this.lastName()}`
  );
}
```

### Characteristics of Computed Signals

- **Read-only** - You cannot set a computed signal
- **Lazy evaluation** - Computed signals only calculate when accessed
- **Memoization** - Results are cached until dependencies change
- **Automatic tracking** - Dependencies are tracked automatically

---

## 7. Effects: Side Effects with Signals

Effects allow you to run side effects whenever signals change. An effect automatically tracks its signal dependencies and re-runs when those signals change.

### Creating Effects

Use the `effect()` function to create reactive side effects:

```typescript
import { Component } from '@angular/core';
import { signal, effect } from '@angular/core';

@Component({
  selector: 'app-logger'
})
export class LoggerComponent {
  count = signal(0);
  
  constructor() {
    effect(() => {
      console.log('Count changed to:', this.count());
      // This runs whenever count changes
    });
  }
}
```

### Common Effect Use Cases

- Logging and debugging
- Synchronizing state with local storage
- Making API calls when data changes
- Updating the document title
- Triggering animations

---

## 8. Change Detection: Traditional vs Signals

This section demonstrates how Angular's change detection mechanism works differently when using traditional component state versus Signals.

### Traditional Change Detection (OnPush Strategy)

**Without Signals**, you rely on Angular's zone.js to detect changes. By default, Angular checks the entire component tree whenever an event occurs.

```typescript
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-list-traditional',
  template: `
    <div>
      <h2>Product List (Traditional)</h2>
      <div *ngFor="let product of products; let i = index">
        <p>{{ product.name }} - ${{ product.price }}</p>
        <button (click)="updatePrice(i, product.price + 10)">
          Increase Price
        </button>
      </div>
      <p>Total Products: {{ products.length }}</p>
      <p>Last Updated: {{ lastUpdated | date:'HH:mm:ss' }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListTraditionalComponent {
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Mouse', price: 50 },
    { id: 3, name: 'Keyboard', price: 100 }
  ];
  lastUpdated: Date = new Date();

  constructor(private cdr: ChangeDetectorRef) {}

  updatePrice(index: number, newPrice: number) {
    this.products[index].price = newPrice;
    this.lastUpdated = new Date();
    
    // IMPORTANT: Must manually trigger change detection
    // with OnPush strategy or changes won't be detected
    this.cdr.markForCheck();
  }
}
```

**Issues with traditional approach:**
- Must manually call `markForCheck()` or change detection won't trigger
- Array mutations don't automatically trigger change detection
- Requires understanding of change detection strategy
- More boilerplate code

### Change Detection with Signals

**With Signals**, Angular automatically tracks which signals are used in the template and only updates those specific parts when the signals change.

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { signal, computed } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-list-signals',
  template: `
    <div>
      <h2>Product List (Signals)</h2>
      <div *ngFor="let product of products(); let i = index">
        <p>{{ product.name }} - ${{ product.price }}</p>
        <button (click)="updatePrice(i, product.price + 10)">
          Increase Price
        </button>
      </div>
      <p>Total Products: {{ productCount() }}</p>
      <p>Average Price: ${{ averagePrice() | number:'1.2-2' }}</p>
      <p>Last Updated: {{ lastUpdated() | date:'HH:mm:ss' }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListSignalsComponent {
  // Create signals for reactive state
  products = signal<Product[]>([
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Mouse', price: 50 },
    { id: 3, name: 'Keyboard', price: 100 }
  ]);
  
  lastUpdated = signal(new Date());

  // Computed signals automatically track dependencies
  productCount = computed(() => this.products().length);
  
  averagePrice = computed(() => {
    const products = this.products();
    if (products.length === 0) return 0;
    const total = products.reduce((sum, p) => sum + p.price, 0);
    return total / products.length;
  });

  // Update is automatic - no need to call markForCheck()
  updatePrice(index: number, newPrice: number) {
    this.products.update(prods => {
      const updated = [...prods];
      updated[index].price = newPrice;
      return updated;
    });
    
    this.lastUpdated.set(new Date());
    
    // NO need for this.cdr.markForCheck() ✓
    // Change detection happens automatically!
  }
}
```

**Benefits with Signals:**
- Automatic change detection - no manual triggering needed
- Fine-grained updates - only affected parts re-render
- Computed signals automatically track their dependencies
- Cleaner, more intuitive code
- Better performance - only necessary parts update

### Side-by-Side Comparison

```typescript
// ❌ TRADITIONAL APPROACH
export class TraditionalCounter {
  count = 0;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  increment() {
    this.count++; // Plain value
    this.cdr.markForCheck(); // Must manually trigger CD
  }
}

// ✅ SIGNALS APPROACH
export class SignalsCounter {
  count = signal(0); // Reactive signal
  
  increment() {
    this.count.update(c => c + 1); // Auto-triggers CD
    // No manual change detection needed!
  }
}
```

### Performance Implications

**Traditional approach:**
```
User Action → Zone.js triggers → Angular checks ENTIRE component tree
  → markForCheck() called → Change detection runs
```

**Signals approach:**
```
User Action → Signal updated → Angular updates ONLY dependent parts
  → Only affected templates re-render → Minimal performance impact
```

---

## 9. Practical Examples & Lab Exercises

### Exercise 1: Todo List Application

Create a todo list where users can add, remove, and toggle todos. Use signals to track the list and computed signals to calculate statistics.

```typescript
import { Component } from '@angular/core';
import { signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="todo-container">
      <h2>Todo List</h2>
      
      <div class="input-group">
        <input 
          [(ngModel)]="newTodo" 
          (keyup.enter)="addTodo()"
          placeholder="Add a new todo..."
        >
        <button (click)="addTodo()">Add</button>
      </div>
      
      <ul class="todo-list">
        <li *ngFor="let todo of todos()">
          <input 
            type="checkbox" 
            [checked]="todo.completed"
            (change)="toggleTodo(todo.id)"
          >
          <span [class.completed]="todo.completed">{{ todo.text }}</span>
          <button (click)="removeTodo(todo.id)" class="delete-btn">Delete</button>
        </li>
      </ul>
      
      <div class="stats">
        <p>Total: {{ totalCount() }} | Completed: {{ doneCount() }} | Remaining: {{ remainingCount() }}</p>
      </div>
    </div>
  `,
  styles: [`
    .completed { text-decoration: line-through; color: #999; }
    .todo-list { list-style: none; padding: 0; }
    li { margin: 10px 0; display: flex; gap: 10px; align-items: center; }
    .delete-btn { color: red; cursor: pointer; }
    .input-group { margin: 10px 0; }
  `]
})
export class TodoListComponent {
  todos = signal<Todo[]>([]);
  newTodo = '';
  nextId = 1;
  
  // Computed signals for statistics
  totalCount = computed(() => this.todos().length);
  
  doneCount = computed(() => 
    this.todos().filter(t => t.completed).length
  );
  
  remainingCount = computed(() =>
    this.todos().filter(t => !t.completed).length
  );
  
  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.update(todos => [...todos, {
        id: this.nextId++,
        text: this.newTodo,
        completed: false
      }]);
      this.newTodo = '';
    }
  }
  
  toggleTodo(id: number) {
    this.todos.update(todos =>
      todos.map(t => t.id === id ? {...t, completed: !t.completed} : t)
    );
  }
  
  removeTodo(id: number) {
    this.todos.update(todos => todos.filter(t => t.id !== id));
  }
}
```

### Exercise 2: User Profile with Local Storage

Create a user profile component that persists changes to local storage using effects.

```typescript
import { Component, effect } from '@angular/core';
import { signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface User {
  name: string;
  email: string;
  theme: 'light' | 'dark';
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div [class]="'theme-' + user().theme">
      <h2>User Profile</h2>
      
      <div class="form-group">
        <label>Name:</label>
        <input 
          [(ngModel)]="user" 
          (ngModelChange)="updateName($event)"
          class="name-input"
        >
      </div>
      
      <div class="form-group">
        <label>Email:</label>
        <p>{{ user().email }}</p>
      </div>
      
      <div class="form-group">
        <label>Theme:</label>
        <button (click)="toggleTheme()">
          Switch to {{ user().theme === 'light' ? 'Dark' : 'Light' }} Mode
        </button>
      </div>
      
      <p class="info">Changes are automatically saved to local storage</p>
    </div>
  `,
  styles: [`
    .theme-light { background: white; color: black; }
    .theme-dark { background: #333; color: white; }
    .form-group { margin: 15px 0; }
    .name-input { padding: 5px; }
    .info { font-style: italic; color: #666; }
  `]
})
export class ProfileComponent {
  user = signal<User>({
    name: 'John Doe',
    email: 'john@example.com',
    theme: 'light'
  });
  
  constructor() {
    // Load from local storage on init
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        this.user.set(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved user data', e);
      }
    }
    
    // Auto-save to local storage when user changes
    // This effect automatically tracks the user signal
    effect(() => {
      localStorage.setItem('user', JSON.stringify(this.user()));
      console.log('User saved to local storage');
    });
  }
  
  updateName(nameInput: string) {
    this.user.update(u => ({ ...u, name: nameInput }));
  }
  
  toggleTheme() {
    this.user.update(u => ({
      ...u,
      theme: u.theme === 'light' ? 'dark' : 'light'
    }));
  }
}
```

### Exercise 3: Real-time Search Filter

Implement a search feature using computed signals to filter data in real-time:

```typescript
import { Component } from '@angular/core';
import { signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Item {
  id: number;
  name: string;
  category: string;
}

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <h2>Real-time Search Filter</h2>
      
      <input 
        [(ngModel)]="searchQuery"
        (ngModelChange)="updateSearch($event)"
        type="text"
        placeholder="Search items..."
        class="search-input"
      >
      
      <div class="results">
        <h3>Results ({{ filteredItems().length }})</h3>
        <ul *ngIf="filteredItems().length > 0">
          <li *ngFor="let item of filteredItems()">
            <strong>{{ item.name }}</strong> 
            <span class="category">{{ item.category }}</span>
          </li>
        </ul>
        <p *ngIf="filteredItems().length === 0" class="no-results">
          No items found matching "{{ searchQuery() }}"
        </p>
      </div>
      
      <div class="stats">
        <p>Total Items: {{ items().length }} | Showing: {{ filteredItems().length }}</p>
      </div>
    </div>
  `,
  styles: [`
    .search-container { max-width: 500px; margin: 20px 0; }
    .search-input { width: 100%; padding: 10px; font-size: 16px; }
    .results { margin-top: 20px; }
    .category { background: #e0e0e0; padding: 2px 6px; border-radius: 3px; font-size: 12px; }
    .no-results { color: #999; font-style: italic; }
    .stats { color: #666; font-size: 14px; }
  `]
})
export class SearchFilterComponent {
  items = signal<Item[]>([
    { id: 1, name: 'Apple', category: 'Fruit' },
    { id: 2, name: 'Banana', category: 'Fruit' },
    { id: 3, name: 'Carrot', category: 'Vegetable' },
    { id: 4, name: 'Cherry', category: 'Fruit' },
    { id: 5, name: 'Cucumber', category: 'Vegetable' },
    { id: 6, name: 'Avocado', category: 'Fruit' }
  ]);
  
  searchQuery = signal('');
  
  // Computed signal that filters in real-time
  filteredItems = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return query === '' 
      ? this.items() 
      : this.items().filter(item =>
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        );
  });
  
  updateSearch(query: string) {
    this.searchQuery.set(query);
    console.log(`Searching for: ${query}`);
  }
}
```

---

## 10. Best Practices & Performance

### Do's ✅

- **Use signals for reactive state** that affects templates
- **Leverage computed signals** for derived state
- **Use effects sparingly** for truly necessary side effects
- **Keep signal dependencies** shallow and explicit
- **Use `update()`** for transformations based on current value
- **Combine with OnPush** change detection strategy for optimal performance

### Don'ts ❌

- **Avoid mutating signal values directly** - use `update()` instead
- **Don't create circular dependencies** in computed signals
- **Avoid heavy computations** in computed signals
- **Don't use effects** for component initialization (use constructor)
- **Avoid accessing signals** outside of template or reactive context

### Performance Tips

- **Computed signals are memoized** - they won't recalculate unnecessarily
- **Use fine-grained signals** instead of one large state object
- **Minimize effect re-runs** by being specific about dependencies
- **Avoid heavy DOM operations** in effects
- **Use `ChangeDetectionStrategy.OnPush`** with signals for best performance
- **Profile your components** with Angular DevTools to identify bottlenecks

### Memory Management

```typescript
// Good: Signal with clear scope
export class MyComponent {
  counter = signal(0); // Cleaned up when component is destroyed
}

// Be aware of effects in services
export class MyService {
  counter = signal(0);
  
  constructor() {
    // Effects in services persist as long as the service
    effect(() => {
      console.log('Counter:', this.counter());
    });
  }
}
```

---

## 11. Comparison: Signals vs RxJS

While Signals and RxJS Observables both serve reactivity needs, they have different characteristics and use cases.

| Feature | Signals | RxJS |
|---------|---------|------|
| Learning Curve | Simple | Steep |
| Best For | Component State | Complex Async |
| Execution | Synchronous | Asynchronous |
| Use Case | Local state | Event streams |
| Memory | Immediate | Subscription-based |
| Memoization | Built-in | Manual |

### When to Use Signals

- Managing component state
- Form handling and validation
- Simple state transformations
- Building new Angular applications
- Real-time UI updates
- Computed derived values

### When to Use RxJS

- HTTP requests with multiple operations
- Event streams and WebSockets
- Complex async sequences
- Retry logic and error handling
- Existing applications with RxJS foundation
- Timing and scheduling operations

### Using Both Together

Signals and RxJS complement each other:

```typescript
import { Component } from '@angular/core';
import { signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';

@Component({
  selector: 'app-hybrid'
})
export class HybridComponent {
  userId = signal(1);
  user = signal<any>(null);
  
  constructor(private http: HttpClient) {
    // Use effect to react to signal changes
    effect(() => {
      const id = this.userId();
      
      // Use RxJS for async operations
      from(
        this.http.get(`/api/users/${id}`).toPromise()
      ).subscribe(userData => {
        this.user.set(userData);
      });
    });
  }
  
  changeUser(id: number) {
    this.userId.set(id); // Triggers the effect
  }
}
```

---

## 12. Conclusion

Angular Signals represent a significant evolution in Angular's reactivity model. They provide a simple, powerful way to manage component state with fine-grained reactivity. By mastering signals through the exercises and concepts covered in this lab, you'll be equipped to build modern, performant Angular applications.

### Key Takeaways

✅ Signals provide **synchronous, fine-grained reactivity**

✅ Computed signals **derive values from other signals** with automatic memoization

✅ Effects enable **reactive side effects** in response to signal changes

✅ Signals **complement RxJS** - they're not a replacement

✅ **Practice the exercises** to solidify your understanding

✅ Use **OnPush change detection** with signals for optimal performance

### Next Steps

1. Install Angular v16+
2. Create a new project or upgrade existing one
3. Refactor a component to use signals
4. Experiment with computed signals and effects
5. Monitor performance improvements with Angular DevTools

### Resources

- [Angular Signals Documentation](https://angular.io/guide/signals)
- [Angular Change Detection Strategy](https://angular.io/api/core/ChangeDetectionStrategy)
- [Angular University - Signals](https://blog.angular-university.io/angular-signals/)

---

**Happy Signaling!** 🚀

*Master Angular Signals and build the next generation of reactive Angular applications.*
