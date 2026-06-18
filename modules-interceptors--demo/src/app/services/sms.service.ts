import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor() { }
  send() {
    console.log('Sending SMS');
  }
}
