import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class LessonsService {

  static counter = 0;

    id = 0;

    constructor() {
        this.id = LessonsService.counter++;
        console.log(`instantiated lessons service with id ${this.id}`);
    }
}
