import { Component } from '@angular/core';
import { Router }        from '@angular/router';
import { AuthService }   from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 constructor(private auth: AuthService, private router: Router) {}

  isLoggedIn(): boolean { return this.auth.isLoggedIn(); }
  get role(): string    { return this.auth.getUserRole(); }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }


}
