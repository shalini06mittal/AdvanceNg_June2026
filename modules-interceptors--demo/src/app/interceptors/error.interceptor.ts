import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
    console.log('Error Interceptor constructor');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Error Interceptor intercept');
    return next.handle(req).pipe(
      retry(1), // Retry failed requests once
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 404:
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
