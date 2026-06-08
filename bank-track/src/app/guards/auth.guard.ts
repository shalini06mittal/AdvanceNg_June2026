import { inject }  from '@angular/core';
import { Router }  from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = (): boolean => {
  console.log('Auth Guard');
  
  const auth   = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) {
    console.log('User is authenticated');
    return true;
  }
  console.log('User not authenticated');
  router.navigate(['/login']);
  return false;
};
