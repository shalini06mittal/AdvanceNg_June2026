import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export function usernameExistsValidator(): AsyncValidatorFn {

    console.log('Async validator');
    
  return (control: AbstractControl): Observable<ValidationErrors | null> => {


    const existingUsers = ['john', 'admin', 'alice'];

    return of(existingUsers).pipe(
      delay(2000), // Simulate API call

      map(users => {

        console.log('inside map');
        
        const usernameExists = users.includes(
          control.value?.toLowerCase()
        );

        return usernameExists
          ? { usernameTaken: true }
          : null;
      })
    );
  };
}