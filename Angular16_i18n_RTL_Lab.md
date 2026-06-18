# Angular 16 — Internationalization & RTL Support
*Comprehensive Lab Reference Document*

**Angular Version:** 16 &nbsp;|&nbsp; **Difficulty:** Intermediate → Advanced

### Topics Covered

- ✓ Angular i18n built-in translation pipeline
- ✓ Setting up `@angular/localize` and extracting messages
- ✓ Translation file formats — XLIFF 1.2, XLIFF 2.0, XMB/XTB
- ✓ ICU message expressions — plural, select, ordinal
- ✓ Date, number, currency, and percent pipes
- ✓ Runtime locale switching with `LOCALE_ID` and `registerLocaleData`
- ✓ Right-to-Left (RTL) layouts — Arabic, Hebrew, Urdu, Persian
- ✓ CSS logical properties for bidi-aware styling
- ✓ Angular CDK Bidirectionality module
- ✓ Third-party i18n: ngx-translate and transloco
- ✓ Automated testing, CI/CD build strategies, and best practices

---

## Table of Contents

1. [Introduction to Internationalization (i18n)](#1-introduction-to-internationalization-i18n)
   - 1.1 [Key Concepts & Terminology](#11-key-concepts--terminology)
   - 1.2 [Angular i18n Strategy Options](#12-angular-i18n-strategy-options)
2. [Angular Built-in i18n with @angular/localize](#2-angular-built-in-i18n-with-angularlocalize)
   - 2.1 [Installation & Setup](#21-installation--setup)
   - 2.2 [Marking Text for Translation](#22-marking-text-for-translation)
   - 2.3 [Extracting Translation Messages](#23-extracting-translation-messages)
   - 2.4 [Translation File Formats](#24-translation-file-formats)
   - 2.5 [Building for Multiple Locales](#25-building-for-multiple-locales)
3. [ICU Message Expressions](#3-icu-message-expressions)
   - 3.1 [What are ICU Messages?](#31-what-are-icu-messages)
   - 3.2 [Plural Expressions](#32-plural-expressions)
   - 3.3 [Select Expressions (Gender & Enumeration)](#33-select-expressions-gender--enumeration)
   - 3.4 [Nested ICU Expressions](#34-nested-icu-expressions)
4. [Locale-Aware Pipes & Data Formatting](#4-locale-aware-pipes--data-formatting)
   - 4.1 [Registering Locale Data](#41-registering-locale-data)
   - 4.2 [Built-in Locale Pipes](#42-built-in-locale-pipes)
   - 4.3 [Date Format Tokens Reference](#43-date-format-tokens-reference)
   - 4.4 [Runtime Locale Switching](#44-runtime-locale-switching)
5. [Right-to-Left (RTL) Support](#5-right-to-left-rtl-support)
   - 5.1 [RTL Languages at a Glance](#51-rtl-languages-at-a-glance)
   - 5.2 [HTML & Template Setup](#52-html--template-setup)
   - 5.3 [Angular CDK Bidirectionality](#53-angular-cdk-bidirectionality)
   - 5.4 [CSS Logical Properties (Bidi-Aware Styling)](#54-css-logical-properties-bidi-aware-styling)
   - 5.5 [SCSS Mixin for RTL](#55-scss-mixin-for-rtl)
   - 5.6 [Angular Material RTL Support](#56-angular-material-rtl-support)
6. [Third-Party i18n Libraries](#6-third-party-i18n-libraries)
   - 6.1 [ngx-translate](#61-ngx-translate)
   - 6.2 [Transloco](#62-transloco)
7. [Testing & CI/CD for i18n](#7-testing--cicd-for-i18n)
   - 7.1 [Unit Testing with Translations](#71-unit-testing-with-translations)
   - 7.2 [CI/CD Multi-Locale Build Pipeline](#72-cicd-multi-locale-build-pipeline)
   - 7.3 [E2E Testing RTL Layouts](#73-e2e-testing-rtl-layouts)
8. [Best Practices & Common Pitfalls](#8-best-practices--common-pitfalls)
   - 8.1 [i18n Best Practices](#81-i18n-best-practices)
   - 8.2 [RTL Best Practices](#82-rtl-best-practices)
   - 8.3 [Common Pitfalls](#83-common-pitfalls)
   - 8.4 [Debugging i18n Issues](#84-debugging-i18n-issues)
9. [Quick Reference](#9-quick-reference)
   - 9.1 [File Structure](#91-file-structure)
   - 9.2 [CLI Commands Cheat Sheet](#92-cli-commands-cheat-sheet)
   - 9.3 [Key Imports Reference](#93-key-imports-reference)

---

## 1. Introduction to Internationalization (i18n)

### 1.1 Key Concepts & Terminology

Internationalization (i18n) and Localization (l10n) are often confused. Understanding the distinction is essential before writing a single line of Angular code:

| Term | Abbreviation | Definition |
|------|--------------|------------|
| Internationalization | i18n | Designing and building software so it can be adapted to different languages and regions without engineering changes. |
| Localization | l10n | The process of adapting internationalized software for a specific region or locale (translations, formats, currencies). |
| Locale | — | A code identifying language + region, e.g. `en-US` (English, United States), `ar-SA` (Arabic, Saudi Arabia). |
| Translation | — | Converting text from a source language (usually `en`) into a target language. |
| RTL | — | Right-to-Left. Text direction used by Arabic, Hebrew, Persian, Urdu and others. |
| LTR | — | Left-to-Right. Text direction used by English, French, German, and most Latin-script languages. |
| Bidi | — | Bidirectional. Content that mixes LTR and RTL text in the same document or UI. |
| ICU | — | International Components for Unicode. A library defining the message-format syntax Angular uses for plurals and selects. |

### 1.2 Angular i18n Strategy Options

Angular supports multiple i18n strategies. Choose based on your project size and requirements:

| Strategy | Package | Best For | Trade-offs |
|----------|---------|----------|------------|
| Built-in Angular i18n | `@angular/localize` | AOT builds, one-locale-per-bundle | No runtime locale switching |
| ngx-translate | `ngx-translate/core` | Runtime switching, simple key-value | No ICU support built-in |
| Transloco | `@ngneat/transloco` | Runtime switching, lazy loading, ICU via plugin | Third-party dependency |
| Angular i18n + runtime patch | `@angular/localize` + custom | AOT performance + runtime switching | Complex setup |

---

## 2. Angular Built-in i18n with @angular/localize

### 2.1 Installation & Setup

```bash
# Add @angular/localize to the project
ng add @angular/localize

# This automatically adds to polyfills.ts:
# import '@angular/localize/init';

# angular.json gains an 'i18n' section and build configurations
```

Configure your `angular.json` with locale information:

```json
// angular.json (excerpt)
{
  "projects": {
    "my-app": {
      "i18n": {
        "sourceLocale": "en-US",
        "locales": {
          "ar": { "translation": "src/locale/messages.ar.xlf", "baseHref": "/ar/" },
          "he": { "translation": "src/locale/messages.he.xlf", "baseHref": "/he/" },
          "fr": { "translation": "src/locale/messages.fr.xlf", "baseHref": "/fr/" },
          "ja": { "translation": "src/locale/messages.ja.xlf", "baseHref": "/ja/" }
        }
      },
      "architect": {
        "build": {
          "configurations": {
            "ar": { "localize": ["ar"] },
            "he": { "localize": ["he"] },
            "all-locales": { "localize": true }
          }
        }
      }
    }
  }
}
```

### 2.2 Marking Text for Translation

Use the `i18n` attribute to mark template text for extraction:

```html
<!-- Basic text marking -->
<h1 i18n="@@page.title">Welcome to our application</h1>

<!-- With description and meaning (helps translators) -->
<p i18n="Shown on the home page|Hero section tagline@@hero.tagline">
  Building the future, one line at a time.
</p>

<!-- Attribute translation -->
<img [src]="logo" i18n-alt="@@logo.alt" alt="Company logo">
<input i18n-placeholder="@@search.placeholder" placeholder="Search...">

<!-- Inside a component -->
<button i18n="@@action.save">Save</button>
<button i18n="@@action.cancel">Cancel</button>
```

> **💡 Custom IDs (`@@`):** Always provide a custom ID using `@@id-name`. Without a custom ID, Angular generates an ID from the message content — changing the text will break all existing translations.

#### Marking Text in TypeScript

```typescript
// component.ts — use $localize tagged template literal
import '@angular/localize/init';

export class MyComponent {

  // Simple string
  title = $localize`:@@app.title:My Application`;

  // With interpolation
  greeting(name: string) {
    return $localize`:@@greeting.message:Hello, ${name}:name:!`;
  }

  // With meaning and description
  errorMsg = $localize
    `:Error on form submission|Validation error message@@form.error:Please fix the errors above.`;
}
```

### 2.3 Extracting Translation Messages

```bash
# Extract to XLIFF 1.2 (default)
ng extract-i18n

# Extract to XLIFF 2.0 (recommended for modern tools)
ng extract-i18n --format xliff2 --output-path src/locale

# Extract to JSON (for ngx-translate pipeline)
ng extract-i18n --format json --out-file messages.json

# Specify output file name
ng extract-i18n --output-path src/locale --out-file messages.xlf
```

### 2.4 Translation File Formats

#### XLIFF 1.2 (`messages.xlf`)

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en-US" target-language="ar" datatype="plaintext">
    <body>
      <trans-unit id="page.title" datatype="html">
        <source>Welcome to our application</source>
        <target>مرحباً بكم في تطبيقنا</target>
        <note priority="1" from="description">Main page heading</note>
      </trans-unit>
      <trans-unit id="action.save">
        <source>Save</source>
        <target>حفظ</target>
      </trans-unit>
    </body>
  </file>
</xliff>
```

#### XLIFF 2.0 (`messages.ar.xlf`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xliff version="2.0" xmlns="urn:oasis:names:tc:xliff:document:2.0"
       srcLang="en-US" trgLang="ar">
  <file id="ngi18n" original="ng.template">
    <unit id="page.title">
      <segment state="translated">
        <source>Welcome to our application</source>
        <target>مرحباً بكم في تطبيقنا</target>
      </segment>
    </unit>
  </file>
</xliff>
```

### 2.5 Building for Multiple Locales

```bash
# Build a single locale
ng build --configuration=ar
ng build --configuration=he

# Build ALL locales at once (outputs to dist/my-app/ar, dist/my-app/he ...)
ng build --configuration=all-locales

# Serve for development with a specific locale
ng serve --configuration=ar

# Production build with base href
ng build --configuration=production,ar --base-href=/ar/
```

> **⚙️ Build Output:** Each locale produces a fully separate bundle with translations compiled in at build time. This means AOT-compiled, zero-runtime-overhead locale support. Deploy each bundle to its own path (e.g. `/ar/`, `/fr/`) and use a CDN or server routing to serve the right one.

---

## 3. ICU Message Expressions

### 3.1 What are ICU Messages?

ICU (International Components for Unicode) message syntax handles grammatical variations that simple string substitution cannot: plural forms, gender, and enumerated selections. Angular supports ICU expressions directly inside `i18n`-marked elements.

### 3.2 Plural Expressions

```html
<!-- Template -->
<span i18n="@@message.count">
  {messageCount, plural,
    =0    {No messages}
    =1    {One message}
    other {{{messageCount}} messages}
  }
</span>
```

```xml
<!-- Arabic translation has 6 plural categories -->
<!-- messages.ar.xlf -->
<source>{messageCount, plural, =0 {No messages} =1 {One message} other {{messageCount} messages}}</source>
<target>{messageCount, plural,
  =0    {لا رسائل}
  =1    {رسالة واحدة}
  =2    {رسالتان}
  few   {{messageCount} رسائل}
  many  {{messageCount} رسالة}
  other {{messageCount} رسالة}
}</target>
```

| Category | Used By Languages | Meaning |
|----------|-------------------|---------|
| `zero` | Arabic, Welsh | When count == 0 |
| `one` | Most Western languages | When count == 1 |
| `two` | Arabic, Hebrew, Welsh | When count == 2 |
| `few` | Arabic, Russian, Czech | Small numbers (varies by language) |
| `many` | Arabic, Polish | Larger numbers (varies by language) |
| `other` | All languages | Catch-all (required) |

### 3.3 Select Expressions (Gender & Enumeration)

```html
<!-- Gender selection -->
<p i18n="@@user.greeted">
  {gender, select,
    male   {He completed the task}
    female {She completed the task}
    other  {They completed the task}
  }
</p>

<!-- Status selection -->
<span i18n="@@order.status">
  {orderStatus, select,
    pending   {Order is pending}
    shipped   {Order has been shipped}
    delivered {Order was delivered}
    cancelled {Order was cancelled}
    other     {Unknown status}
  }
</span>
```

### 3.4 Nested ICU Expressions

```html
<!-- Plural nested inside select -->
<p i18n="@@cart.summary">
  {gender, select,
    male {
      He has {itemCount, plural,
        =0    {no items}
        =1    {one item}
        other {{{itemCount}} items}
      } in his cart.
    }
    female {
      She has {itemCount, plural,
        =0    {no items}
        =1    {one item}
        other {{{itemCount}} items}
      } in her cart.
    }
    other {
      They have {itemCount, plural,
        =0    {no items}
        =1    {one item}
        other {{{itemCount}} items}
      } in their cart.
    }
  }
</p>
```

---

## 4. Locale-Aware Pipes & Data Formatting

### 4.1 Registering Locale Data

Angular ships only `en-US` data by default. Register additional locale data at app startup:

```typescript
// app.module.ts (NgModule approach)
import { LOCALE_ID, NgModule }    from '@angular/core';
import { registerLocaleData }     from '@angular/common';
import localeAr                  from '@angular/common/locales/ar';
import localeHe                  from '@angular/common/locales/he';
import localeFr                  from '@angular/common/locales/fr';
import localeJa                  from '@angular/common/locales/ja';
import localeArExtra             from '@angular/common/locales/extra/ar';

registerLocaleData(localeAr, 'ar', localeArExtra);
registerLocaleData(localeHe, 'he');
registerLocaleData(localeFr, 'fr');
registerLocaleData(localeJa, 'ja');

@NgModule({
  providers: [
    { provide: LOCALE_ID, useValue: 'ar' } // or from environment
  ]
})
export class AppModule {}

// Standalone app (main.ts)
bootstrapApplication(AppComponent, {
  providers: [
    { provide: LOCALE_ID, useValue: navigator.language || 'en-US' }
  ]
});
```

### 4.2 Built-in Locale Pipes

| Pipe | Usage Example | en-US Output | ar-SA Output |
|------|---------------|--------------|--------------|
| `DatePipe` | `{{ today \| date:'longDate' }}` | June 16, 2024 | ١٦ يونيو ٢٠٢٤ |
| `DatePipe` | `{{ today \| date:'short' }}` | 6/16/24, 9:30 AM | ٩:٣٠ ص ١٦/٦/٢٠٢٤ |
| `DecimalPipe` | `{{ 1234567.89 \| number:'1.2-2' }}` | 1,234,567.89 | ١٬٢٣٤٬٥٦٧٫٨٩ |
| `CurrencyPipe` | `{{ 99.5 \| currency:'USD' }}` | $99.50 | ٩٩٫٥٠ US$ |
| `CurrencyPipe` | `{{ 99.5 \| currency:'SAR' }}` | SAR 99.50 | ٩٩٫٥٠ ر.س. |
| `PercentPipe` | `{{ 0.876 \| percent:'1.1-1' }}` | 87.6% | ٨٧٫٦% |

### 4.3 Date Format Tokens Reference

| Token | Meaning | Example (en-US) |
|-------|---------|-----------------|
| `yyyy` | 4-digit year | 2024 |
| `yy` | 2-digit year | 24 |
| `MMMM` | Full month name | June |
| `MMM` | Short month name | Jun |
| `MM` | Month as 2 digits | 06 |
| `dd` | Day as 2 digits | 16 |
| `EEEE` | Full weekday name | Sunday |
| `EEE` | Short weekday name | Sun |
| `HH` | Hour (24h, 2 digits) | 14 |
| `hh` | Hour (12h, 2 digits) | 02 |
| `mm` | Minutes (2 digits) | 05 |
| `ss` | Seconds (2 digits) | 09 |
| `a` | AM/PM | PM |
| `z` | Timezone abbreviation | GMT+5:30 |
| `shortDate` | Predefined short date | 6/16/24 |
| `mediumDate` | Predefined medium date | Jun 16, 2024 |
| `longDate` | Predefined long date | June 16, 2024 |
| `fullDate` | Predefined full date | Sunday, June 16, 2024 |

### 4.4 Runtime Locale Switching

```typescript
// locale.service.ts
import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { registerLocaleData }            from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LocaleService {

  private localeMap: Record<string, () => Promise<any>> = {
    'ar': () => import('@angular/common/locales/ar'),
    'he': () => import('@angular/common/locales/he'),
    'fr': () => import('@angular/common/locales/fr'),
    'ja': () => import('@angular/common/locales/ja'),
    'zh': () => import('@angular/common/locales/zh'),
  };

  constructor(@Inject(LOCALE_ID) public currentLocale: string) {}

  async setLocale(locale: string): Promise<void> {
    const loader = this.localeMap[locale];
    if (!loader) throw new Error(`Locale '${locale}' is not configured`);

    const data = await loader();
    registerLocaleData(data.default, locale);

    // For built-in Angular i18n: reload to the locale's base path
    window.location.href = `/${locale}/`;
  }

  getSupportedLocales() {
    return Object.keys(this.localeMap);
  }
}
```

---

## 5. Right-to-Left (RTL) Support

### 5.1 RTL Languages at a Glance

| Language | Code | Region | Script | Notable Differences |
|----------|------|--------|--------|---------------------|
| Arabic | `ar` | Middle East, N. Africa | Arabic | 6 plural forms, numbers remain LTR |
| Hebrew | `he` | Israel | Hebrew | 2 plural forms, EN punctuation flipped |
| Persian | `fa` | Iran | Arabic | Uses Eastern Arabic numerals |
| Urdu | `ur` | Pakistan, India | Arabic | Written right-to-left, spoken left |
| Pashto | `ps` | Afghanistan | Arabic | Similar to Persian/Dari |
| Sindhi | `sd` | Pakistan | Arabic | Uses Perso-Arabic script |
| Dhivehi | `dv` | Maldives | Thaana | Unique script, RTL direction |

### 5.2 HTML & Template Setup

```html
<!-- index.html — dynamic direction based on locale -->
<!DOCTYPE html>
<html lang="{{ locale }}" [dir]="textDirection">
<head>
  <meta charset="UTF-8">
  <!-- Preload RTL stylesheet if needed -->
</head>
</html>

<!-- app.component.html -->
<div [dir]="dir.value">
  <!-- All content inherits direction -->
  <router-outlet></router-outlet>
</div>
```

```typescript
// app.component.ts — detect direction from LOCALE_ID
import { Component, Inject, OnInit } from '@angular/core';
import { LOCALE_ID }                 from '@angular/core';
import { Directionality }            from '@angular/cdk/bidi';

const RTL_LOCALES = ['ar','he','fa','ur','ps','sd','dv','ug','yi'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  isRtl = false;

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  ngOnInit() {
    const lang = this.locale.split('-')[0];
    this.isRtl = RTL_LOCALES.includes(lang);

    document.documentElement.dir  = this.isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = this.locale;
  }
}
```

### 5.3 Angular CDK Bidirectionality

The Angular CDK provides the `Directionality` service and `BidiModule` to reactively observe and inject text direction:

```bash
# Install CDK if not already present
npm install @angular/cdk

# Import BidiModule
import { BidiModule } from '@angular/cdk/bidi';
```

```typescript
// Using Directionality service in a component
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Directionality }               from '@angular/cdk/bidi';
import { Subscription }                 from 'rxjs';

@Component({
  template: `
    <div [class.rtl-layout]="isRtl">
      <mat-icon>{{ isRtl ? 'arrow_back' : 'arrow_forward' }}</mat-icon>
    </div>
  `
})
export class NavigationComponent implements OnInit, OnDestroy {

  isRtl = false;
  private dirSub!: Subscription;

  constructor(private dir: Directionality) {}

  ngOnInit() {
    this.isRtl   = this.dir.value === 'rtl';
    this.dirSub  = this.dir.change.subscribe(d => {
      this.isRtl = d === 'rtl';
    });
  }

  ngOnDestroy() { this.dirSub.unsubscribe(); }
}
```

### 5.4 CSS Logical Properties (Bidi-Aware Styling)

Traditional CSS uses physical properties (`left`, `right`, `margin-left`). These break in RTL layouts. CSS Logical Properties adapt automatically to the text direction:

| Physical Property (Avoid) | Logical Equivalent (Use) | Direction-Aware Effect |
|---------------------------|--------------------------|------------------------|
| `margin-left` | `margin-inline-start` | LTR: left &nbsp;│&nbsp; RTL: right |
| `margin-right` | `margin-inline-end` | LTR: right │ RTL: left |
| `padding-left` | `padding-inline-start` | LTR: left &nbsp;│&nbsp; RTL: right |
| `padding-right` | `padding-inline-end` | LTR: right │ RTL: left |
| `border-left` | `border-inline-start` | LTR: left &nbsp;│&nbsp; RTL: right |
| `border-right` | `border-inline-end` | LTR: right │ RTL: left |
| `left` (position) | `inset-inline-start` | LTR: left &nbsp;│&nbsp; RTL: right |
| `right` (position) | `inset-inline-end` | LTR: right │ RTL: left |
| `text-align: left` | `text-align: start` | LTR: left &nbsp;│&nbsp; RTL: right |
| `text-align: right` | `text-align: end` | LTR: right │ RTL: left |
| `float: left` | `float: inline-start` | LTR: left &nbsp;│&nbsp; RTL: right |
| `float: right` | `float: inline-end` | LTR: right │ RTL: left |

```scss
/* styles.scss — bidi-aware component styles */
.card {
  /* Physical: breaks RTL */
  /* margin-left: 16px;  <-- AVOID */

  /* Logical: works in both directions */
  margin-inline-start: 16px;
  padding-inline-start: 24px;
  border-inline-start: 4px solid var(--primary-color);
}

.icon-label {
  display: flex;
  align-items: center;
  gap: 8px; /* gap is direction-neutral */
}

.dropdown-arrow {
  /* Flip icons for RTL */
  [dir='rtl'] & {
    transform: scaleX(-1);
  }
}

/* Or use :dir() pseudo-class (modern browsers) */
.icon:dir(rtl) {
  transform: scaleX(-1);
}
```

### 5.5 SCSS Mixin for RTL

```scss
// _rtl.mixins.scss
@mixin rtl {
  [dir='rtl'] & { @content; }
}

@mixin ltr {
  [dir='ltr'] & { @content; }
}

@mixin bidi-value($prop, $ltr-val, $rtl-val) {
  #{$prop}: $ltr-val;
  @include rtl { #{$prop}: $rtl-val; }
}

// Usage in component styles
.sidebar {
  @include bidi-value(border-radius, '8px 0 0 8px', '0 8px 8px 0');

  @include rtl {
    text-align: right;
    direction: rtl;
  }
}
```

### 5.6 Angular Material RTL Support

```html
<!-- app.component.html -->
<!-- Angular Material automatically mirrors layouts for RTL. -->
<!-- Just ensure the [dir] attribute is set on a parent element. -->
<div [attr.dir]="isRtl ? 'rtl' : 'ltr'">
  <mat-toolbar>
    <!-- Icon flips automatically in RTL -->
    <button mat-icon-button>
      <mat-icon>menu</mat-icon>
    </button>
    <span>{{ title }}</span>
    <span class="spacer"></span>
    <mat-icon>notifications</mat-icon>
  </mat-toolbar>

  <mat-sidenav-container>
    <!-- In RTL, start sidenav appears on the right -->
    <mat-sidenav position="start">
      <nav><!-- Navigation --></nav>
    </mat-sidenav>
    <mat-sidenav-content>
      <router-outlet></router-outlet>
    </mat-sidenav-content>
  </mat-sidenav-container>
</div>
```

> **✅ Material RTL:** Angular Material components use CSS logical properties internally and respect the `dir` attribute. Setting `dir='rtl'` on a parent container is all that is needed for most Material components to mirror correctly.

---

## 6. Third-Party i18n Libraries

### 6.1 ngx-translate

ngx-translate is the most widely-used Angular i18n library for runtime locale switching with a simple JSON key-value format.

```bash
# Install
npm install @ngx-translate/core @ngx-translate/http-loader

# File structure
src/assets/i18n/
  en.json
  ar.json
  fr.json
```

```typescript
// app.module.ts
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader }              from '@ngx-translate/http-loader';
import { HttpClient }                       from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide:    TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:       [HttpClient]
      }
    })
  ]
})
export class AppModule {}
```

```json
// en.json
{
  "nav": {
    "home":     "Home",
    "about":    "About",
    "contact":  "Contact"
  },
  "greeting": "Hello, {{ name }}!",
  "items":    "{{ count }} items in your cart"
}

// ar.json
{
  "nav": {
    "home":     "الرئيسية",
    "about":    "عنا",
    "contact":  "تواصل"
  },
  "greeting": "مرحباً، {{ name }}!",
  "items":    "{{ count }} عنصر في سلة التسوق"
}
```

```typescript
// Using TranslateService in a component
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  template: `
    <!-- Pipe usage -->
    <h1>{{ 'nav.home' | translate }}</h1>

    <!-- With params -->
    <p>{{ 'greeting' | translate:{ name: userName } }}</p>

    <!-- Directive usage -->
    <span [translate]="'items'" [translateParams]="{ count: 5 }"></span>

    <!-- Language switcher -->
    <select (change)="switchLang($event)">
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  `
})
export class AppComponent implements OnInit {
  userName = 'Ahmed';

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.translate.addLangs(['en', 'ar', 'fr']);
    this.translate.setDefaultLang('en');
    const browser = this.translate.getBrowserLang() || 'en';
    this.translate.use(browser.match(/en|ar|fr/) ? browser : 'en');
  }

  switchLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.translate.use(lang);
    document.dir = ['ar','he','fa'].includes(lang) ? 'rtl' : 'ltr';
  }
}
```

### 6.2 Transloco

Transloco is a modern alternative with built-in support for lazy loading, scoped translations, and a rich plugin ecosystem.

```bash
# Install Transloco
ng add @ngneat/transloco

# This runs a schematic that creates:
#   transloco-root.module.ts
#   assets/i18n/en.json
#   assets/i18n/es.json  (or your chosen language)
```

```typescript
// transloco-root.module.ts (generated)
import { NgModule, isDevMode }         from '@angular/core';
import { HttpClientModule }            from '@angular/common/http';
import { TranslocoModule, provideTransloco,
         TranslocoHttpLoader }         from '@ngneat/transloco';

@NgModule({
  exports: [TranslocoModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: ['en', 'ar', 'fr', 'ja'],
        defaultLang:    'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode()
      },
      loader: TranslocoHttpLoader
    })
  ]
})
export class TranslocoRootModule {}
```

```html
<!-- Transloco template usage -->

<!-- Structural directive (lazy-loads translation file) -->
<ng-container *transloco="let t">
  <h1>{{ t('title') }}</h1>
  <p>{{ t('greeting', { name: 'Fatima' }) }}</p>
</ng-container>

<!-- Pipe usage -->
<span>{{ 'nav.home' | transloco }}</span>

<!-- Scoped translations (feature module) -->
<ng-container *transloco="let t; scope: 'dashboard'">
  <h2>{{ t('dashboard.title') }}</h2>
</ng-container>
```

**Library Comparison:**

| Feature | ngx-translate | Transloco | @angular/localize |
|---------|---------------|-----------|-------------------|
| Runtime switching | Yes | Yes | No (rebuild required) |
| Lazy loading | Manual | Built-in | N/A |
| ICU / Plural support | Plugin | Plugin | Native |
| Scoped translations | No | Yes | No |
| Type-safe keys | No | Plugin | No |
| SSR support | Partial | Full | Full |
| File format | JSON | JSON | XLIFF/XMB |
| AOT performance | Medium | Medium | Best |
| Angular 16 compatibility | Yes | Yes | Yes |

---

## 7. Testing & CI/CD for i18n

### 7.1 Unit Testing with Translations

```typescript
// Testing with @angular/localize
import { TestBed }           from '@angular/core/testing';
import { LOCALE_ID }         from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeAr              from '@angular/common/locales/ar';

registerLocaleData(localeAr, 'ar');

describe('DateFormatComponent (ar)', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [DateFormatComponent],
    providers: [{ provide: LOCALE_ID, useValue: 'ar' }]
  }));

  it('should format date in Arabic numerals', () => {
    const fixture = TestBed.createComponent(DateFormatComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.date');
    expect(el.textContent).toMatch(/[٠-٩]/); // Arabic-Indic digits
  });
});

// Testing RTL direction
describe('AppComponent RTL', () => {
  it('should set dir=rtl for Arabic locale', () => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'ar' }]
    });
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(document.documentElement.dir).toBe('rtl');
  });
});
```

### 7.2 CI/CD Multi-Locale Build Pipeline

```yaml
# .github/workflows/i18n-build.yml
name: i18n Multi-Locale Build

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        locale: [en, ar, he, fr, ja, zh]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci

      - name: Build locale ${{ matrix.locale }}
        run: ng build --configuration=production,${{ matrix.locale }}

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: dist-${{ matrix.locale }}
          path: dist/my-app/${{ matrix.locale }}/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Download all locale builds
        uses: actions/download-artifact@v4
      - name: Deploy to CDN / hosting
        run: |
          # Deploy each locale to its path
          for locale in en ar he fr ja zh; do
            aws s3 sync dist-$locale/ s3://my-bucket/$locale/ --delete
          done
```

### 7.3 E2E Testing RTL Layouts

```typescript
// e2e/rtl.spec.ts  (Playwright)
import { test, expect } from '@playwright/test';

test.describe('RTL Layout — Arabic', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/ar/');
  });

  test('document should have dir=rtl', async ({ page }) => {
    const dir = await page.evaluate(
      () => document.documentElement.dir
    );
    expect(dir).toBe('rtl');
  });

  test('sidebar should appear on the right', async ({ page }) => {
    const sidebar = page.locator('.mat-sidenav');
    const box     = await sidebar.boundingBox();
    const vpWidth = page.viewportSize()!.width;
    // Sidebar right edge should be near viewport right edge
    expect(box!.x + box!.width).toBeGreaterThan(vpWidth * 0.8);
  });

  test('should take RTL screenshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('homepage-ar.png');
  });
});
```

---

## 8. Best Practices & Common Pitfalls

### 8.1 i18n Best Practices

- Always assign custom IDs (`@@`) to every i18n marker — never rely on auto-generated hash IDs.
- Provide meaningful descriptions and meaning prefixes to help translators understand context.
- Never concatenate translated strings; use ICU message expressions for variable content.
- Keep translations in version control alongside source code — treat them as code.
- Use a translation management platform (Lokalise, Crowdin, Phrase) for professional translation workflows.
- Extract messages after every feature branch merge, not just at release time.
- Test with pseudo-locales (`en-XA` for long strings, `en-XB` for RTL simulation) to catch layout issues early.
- Avoid hardcoded colours, images, or icons that carry cultural meaning — abstract them.

### 8.2 RTL Best Practices

- Use CSS logical properties (`margin-inline-start`, `padding-inline-end`) from day one — retrofitting is painful.
- Never use `transform: scaleX(-1)` to mirror entire components — flip only directional icons.
- Test with real RTL content, not just `direction=rtl` on English text.
- Avoid absolute positioning for layout — use Flexbox (`flex-direction` is direction-aware) or CSS Grid.
- Font size may need to increase for Arabic/Hebrew — these scripts can be harder to read at small sizes.
- Line height should increase for Arabic text (diacritics extend above/below baseline).
- Numbers, phone numbers, and code snippets stay LTR even inside RTL text — use `unicode-bidi: embed`.
- Test on real devices — RTL rendering in simulators can differ from physical devices.

### 8.3 Common Pitfalls

| Pitfall | Problem | Solution |
|---------|---------|----------|
| Hardcoded direction in CSS | `margin-left`, `padding-right` break RTL | Use CSS logical properties |
| String concatenation | `'Hello ' + name` causes incorrect word order in some languages | Use ICU expressions or `$localize` interpolation |
| Missing plural rules | Translators only given `one` and `other` forms | Use ICU plural with all required category forms |
| Icon not mirrored | Back arrow points wrong direction in RTL | Flip directional icons with `[dir='rtl'] scaleX(-1)` |
| Date in wrong calendar | Showing Gregorian dates to Arabic users | Use `DatePipe` with locale; offer Hijri option |
| Missing locale registration | Pipes show `en-US` formatting for all locales | Call `registerLocaleData()` for every supported locale |
| Font not supporting script | Arabic/Hebrew characters show as boxes | Include a web font that supports the required Unicode ranges |
| Layout overflow in RTL | Absolute-positioned popups overflow on wrong side | Use CDK Overlay which handles RTL positioning automatically |

### 8.4 Debugging i18n Issues

- **Missing translation warning:** Set `missingTranslationStrategy: MissingTranslationStrategy.Warning` in `TranslateModule` to log missing keys.
- **XLIFF validation:** Run `xliff-simple-merge` or use an IDE plugin (VS Code XLIFF editor) to validate file structure.
- **Pseudo-locale testing:** Use `ng build --configuration=pseudo` to render accented text and expose truncation issues.
- **Dir inspector:** Browser DevTools > Elements; inspect the `dir` attribute propagation through the DOM tree.
- **Layout in RTL:** Open DevTools in Firefox — it has a RTL layout mode toggle in the responsive design tool.
- **ICU message errors:** Angular reports ICU parse errors at build time; check `ng build` output for `'Invalid ICU message'` warnings.

---

## 9. Quick Reference

### 9.1 File Structure

```
src/
  assets/
    i18n/                   # ngx-translate / Transloco JSON files
      en.json
      ar.json
      fr.json
  locale/                   # Angular i18n XLIFF files
    messages.xlf            # Source extraction output
    messages.ar.xlf         # Arabic translation
    messages.he.xlf         # Hebrew translation
    messages.fr.xlf         # French translation
  app/
    core/
      services/
        locale.service.ts
      guards/
        locale.guard.ts
    shared/
      directives/
        rtl.directive.ts    # Custom RTL helper directive
      pipes/
        locale-date.pipe.ts # Custom locale-aware date pipe
    styles/
      _rtl.mixins.scss      # RTL SCSS mixins
      _bidi.scss            # Bidirectional layout utilities
```

### 9.2 CLI Commands Cheat Sheet

| Command | Description |
|---------|-------------|
| `ng add @angular/localize` | Add localize package and polyfill |
| `ng extract-i18n --format xliff2` | Extract messages to XLIFF 2.0 |
| `ng build --configuration=ar` | Build for a single locale |
| `ng build --configuration=all-locales` | Build all configured locales |
| `ng serve --configuration=ar` | Serve with Arabic locale |
| `ng test -- --locale=ar` | Run unit tests with a specific locale |
| `npm install @ngx-translate/core` | Install ngx-translate |
| `ng add @ngneat/transloco` | Add Transloco with schematic |
| `npm install @angular/cdk` | Install CDK (for BidiModule) |
| `npx xliff-simple-merge src/locale/messages.xlf ar` | Merge new keys into existing XLIFF |

### 9.3 Key Imports Reference

| Import | Module | Purpose |
|--------|--------|---------|
| `LOCALE_ID` | `@angular/core` | Token to inject/provide the current locale string |
| `registerLocaleData` | `@angular/common` | Register locale data for pipes |
| `DatePipe` | `@angular/common` | Locale-aware date formatting |
| `CurrencyPipe` | `@angular/common` | Locale-aware currency formatting |
| `DecimalPipe` | `@angular/common` | Locale-aware number formatting |
| `PercentPipe` | `@angular/common` | Locale-aware percent formatting |
| `BidiModule` | `@angular/cdk/bidi` | CDK bidirectionality support |
| `Directionality` | `@angular/cdk/bidi` | Service to observe text direction changes |
| `TranslateModule` | `@ngx-translate/core` | ngx-translate module and components |
| `TranslateService` | `@ngx-translate/core` | ngx-translate programmatic API |
| `TranslocoModule` | `@ngneat/transloco` | Transloco module and directives |
| `TranslocoService` | `@ngneat/transloco` | Transloco programmatic API |

---

> **📚 Further Reading:**
> - [Angular i18n Guide](https://angular.io/guide/i18n-overview)
> - [MDN CSS Logical Properties](https://developer.mozilla.org/docs/Web/CSS/CSS_logical_properties)
> - [Unicode CLDR Plural Rules](https://unicode-org.github.io/cldr-staging/charts/latest/supplemental/language_plural_rules.html)
> - [RTL Styling Guide](https://rtlstyling.com)

---

*— End of Lab Document —*

*© 2024 Angular Training Labs*
