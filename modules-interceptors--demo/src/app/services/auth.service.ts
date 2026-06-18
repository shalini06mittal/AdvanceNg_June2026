import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    console.log("Created an instance of AuthenticationService...");
  }
  getToken() {
    return 'TOKEN';
  }

  isAuthenticated() {
    return true;
  }
}
