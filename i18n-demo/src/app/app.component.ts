import { Component, Inject, LOCALE_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'i18n-demo';
  today = new Date();

  constructor(@Inject(LOCALE_ID) locale: string, 
  private translate: TranslateService) {
    
      console.log(locale);
      const lang:string = 'en';

      this.translate.setDefaultLang(lang);
      this.translate.use(lang);

      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
  
  switchLanguage(locale: string) {
    console.log('Language changed to:', locale);
    this.translate.use(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    // window.location.href = `/${locale}/`;
     
  }
}
