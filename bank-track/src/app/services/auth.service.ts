import { Injectable } from '@angular/core';

export type Role = 'admin' | 'viewer';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = false;   // Changed to false — login page controls this
  private role: Role = 'viewer';

  isLoggedIn(): boolean  { return this.loggedIn; }
  getUserRole(): string  { return this.role; }
  setRole(r: Role): void { this.role = r; }

  login(username: string, password: string): boolean {
    // Simulate credential check (replace with real API call)
    if (username === 'admin' && password === 'bank123') {
      this.loggedIn = true; this.role = 'admin'; return true;
    }
    if (username === 'viewer' && password === 'view123') {
      this.loggedIn = true; this.role = 'viewer'; return true;
    }
    return false;
  }

  logout(): void { this.loggedIn = false; }
}
