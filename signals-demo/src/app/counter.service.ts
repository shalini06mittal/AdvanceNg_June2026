import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class COunterService {

  private readonly _count = signal(0);
  readonly count = this._count.asReadonly();
  constructor() { }

  increment(){
    this._count.update(v => v+1);
  }
}
