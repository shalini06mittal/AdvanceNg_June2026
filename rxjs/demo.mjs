import {Observable} from 'rxjs';
// import {of, fromEvent, pipe, map, concatMap, switchMap, mergeMap, exhaustMap, delay, debounceTime} from 'rxjs/operators';

// observer => next, error, complete
// subscriber => sub type of observer
const myObs = new Observable(subscriber =>{
    
    setTimeout(() => {
         subscriber.next('red');
    }, 1000);
    setTimeout(() => {
        subscriber.next('yellow');    
    }, 2000);
    
    setTimeout(() => {
        subscriber.next('orange');    
    }, 3000);
    
    // setTimeout(() => {
    //     subscriber.error('error - somethign went wron');    
    // }, 4000);
    
     setTimeout(() => {
        subscriber.next('olive gren');    
    }, 4000);
    setTimeout(() => {
        subscriber.next('green');    
    }, 5000);
    
    setTimeout(() => {
        subscriber.complete();    
    }, 6000);
    
});
const subs = myObs.subscribe({
    next: (value ) => console.log('Next Value ', value),
    error: err => console.log(err),
    complete: ()=> console.log('complete')
    
});
setTimeout(() => {
    subs.unsubscribe();
}, 3000);
// console.log('Observable created');


