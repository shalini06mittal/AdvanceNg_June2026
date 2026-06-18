import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {
    console.log('Auth Interceptor constructor');
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log('Auth Interceptor intercept');
    
    const token = this.auth.getToken();

    console.log(!token);
    
    if (!token) {
      return next.handle(request); // Pass through unchanged
    }

    // Clone the request — HttpRequests are IMMUTABLE
    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    return next.handle(authReq);
    
  }
}
