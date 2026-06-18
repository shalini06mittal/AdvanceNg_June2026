import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements HttpInterceptor {

  constructor() {
    console.log('Log Interceptor constructor');
    
  }

  // component -> interceptor -> server -> response -> tap -> subscriber(component)
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Log Interceptor intercept');

    console.log('REQUEST URL', request.url);
    console.log('REQUEST Method', request.method);
    return next.handle(request).pipe(
      tap({
        next: () => console.log('Response received from ', request.url),

        error: (err) => console.log('Error from ', request.url, err)
        
      })
    );
     
  }
}
