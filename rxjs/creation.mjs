import {of, from, fromEvent, interval, timer, EMPTY, NEVER, throwError, startWith} from 'rxjs';

// Creating observables

//1. of
of(1,2,3,4,5,6).subscribe({
    next:   val => console.log(val),
    error: err => console.log(err),
    complete: () => console.log("done") 
});

// of('Apple','Orange').subscribe(val => console.log(val));

// // 2. from

// from([10,20,30]).subscribe(val => console.log(val));

// from(fetch('https://jsonplaceholder.typicode.com/todos/1'))
// .subscribe(resp => resp.json().then(data => console.log(data)));

 // 3. from Event -> HTML from a DOM event

 //4. interval: 0,1,2,3 emit data every N ms

 const tick$ = interval(1000);
 console.log(tick$);
//  tick$.subscribe(data =>console.log(data));

// 5. timer(delay, interval)

// timer(1500, 500).subscribe(data => console.log(data));


//6. EMPTY
// EMPTY.subscribe({
//   next: () => console.log('Next'),
//   complete: () => console.log('Complete!')
// });

//7. NEVER
// const info = () => console.log('Will not be called');

// const result = NEVER.pipe(startWith(7));
// result.subscribe({
//   next: x => console.log(x),
//   error: info,
//   complete: info
// });

//8. ERROR
throwError(()=> new Error("wrong"))
.subscribe({
    error: err => console.log(err)
})