import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

private isDark$ = new BehaviorSubject<boolean>(false);
  readonly isDark = this.isDark$.asObservable();

  init(): void {
    const saved = localStorage.getItem('theme') === 'dark';
    if (saved) {
      this.isDark$.next(true);
      document.body.classList.add('dark-mode');
    }
  }

  toggle(): void {
    const isDark = !this.isDark$.value;
    this.isDark$.next(isDark);
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  get isDarkMode(): boolean {
    return this.isDark$.value;
  }
}
