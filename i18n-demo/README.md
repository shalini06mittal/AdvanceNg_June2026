# I18nDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Steps for implementing i18N 

1. `npx @angular/cli@16 new i18n-demo --routing=true --standalone=false`
2. i18n is a directive by default available in angular [ see app.component.html]
3. Run command `ng add @angular/localize`
4. Run command `ng extract-i18n --output-path src/locale` 
    This will create `messages.xlf` file which can then be configured for separate locales
5. Create 2 copies of same messages.xlf for french and arabic and add <target> tag with respecitve conversion of text in that specific language
6. Update angular.json => within "projects" add "i18n" property and values for different languages
    Also within architect section => update configurations for build and serve
7. Run command `ng serve --configuration=ar` or `ng serve --configuration=fr` for specific language
8. `ng serve` will build for a specific language only. To build for all languages at the same time follow below steps
9. `ng build --configuration=all-locales` for all locales in one go
    `ng build --configuration=ar` for specific region, see dist folder created
10. To display dynamically for all languages: first build the project for any changes you make 
    and then deploy application on a light weight server
    `npx http-server dist/i18n-demo`
11. If you add other tags later re run the extract-i18n command

## Angular Translate :

12. For dynamic data to be translated [ data. binding syntax], 
Install `npm install @ngx-translate/core@15 @ngx-translate/http-loader@8`
13. create i18n folder within assets folder and create 3 json files
14. Update app module to load Translate Module
15. Update app component html for translate pipe
16. Update app component ts to inject TranslateService
