import {AbstractControl} from '@angular/forms'

export function userNameValidator(control: AbstractControl) : { [key:string] : any} | null {

   // console.log('user name validator ', control.value);
    
    const isUsernameCorrect = /junk|admin/.test(control.value);

  //  console.log('user name corretct ? ', isUsernameCorrect);
    
    return isUsernameCorrect ? { 'validateUserName' : {value : control.value } } : null;
}