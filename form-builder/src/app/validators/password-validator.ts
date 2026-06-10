import {AbstractControl} from '@angular/forms'
// cross field validation
export function passwordValidator(control: AbstractControl) : { [key:string] : any} | null {
    
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');
    
    if(
        passwordControl?.pristine && confirmPasswordControl?.pristine ||
        passwordControl?.untouched && confirmPasswordControl?.untouched
    ){
        return null;
    }
    return passwordControl && confirmPasswordControl 
            && passwordControl.value !== confirmPasswordControl.value ? 
            { 'passwordMisMatchError' : true } : null;
}