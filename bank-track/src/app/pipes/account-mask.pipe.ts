import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountMask'
})
export class AccountMaskPipe implements PipeTransform {

 transform(value: string, visibleDigits: number = 4): string {
    if (!value) return '';
    const masked = value.slice(0, -visibleDigits).replace(/./g, '*');
    return masked + value.slice(-visibleDigits);
  }


}
