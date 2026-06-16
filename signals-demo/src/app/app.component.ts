  import { Component, computed, effect, inject, signal } from '@angular/core';
import { COunterService } from './counter.service';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {

    state = inject(COunterService);
    // counter:number = 0;
    // name:string='Guest';
    // increment(){
    //   console.log((' increrment called'));
    //   this.counter++;
    // }
    // changeName(data:string){
    //   console.log(('Change Name'));
    //   this.name=data;
    // }
    get expensiveCalculation(){
      console.log(('Getter expensive'));
      let count = 0;
      for (let index = 0; index < 100000000; index++) {
      count+=index;
      }
      return count;
    }

    counter = signal(0);
    name = signal('Guest');
    employees = signal(['John', 'Marry']);
    user = signal({
      name:'Shalini', city:'Mumbai'
    });
    

    constructor(){
      effect(()=>{
        console.log('signal changed', this.employees());
        console.log('signal changed', this.counter());
        
      })
    }

    names = computed(()=>{
    console.log('All employees');
    return this.employees().join('-')
    });

    addemployee(){
      //this.employees().push('Jack');
      this.employees.update(arr => [...arr, 'Jack'])
    }

    changeCity(){
      this.user.update(user =>({...user, city:'Pune'}))
    }

    increment(){
      console.log((' increrment called'));
      this.counter.update(val => val+1);
    }
    changeName(data:string){
      console.log(('Change Name'));
      this.name.set(data);
    }
  
    // get total(){
    //   console.log('total called');
    //   return this.counter() * 100;
    // }

    total = computed(()=>{
      console.log('total called');
      return this.counter() * 100;
    });

    incrementServ(){
      console.log((' increrment called'));
      this.state.increment();
    }
  }
