import { concatMap, delay, from, interval, of, reduce, scan, Subject } from "rxjs";
import {map, take, filter, takeUntil} from 'rxjs';

// from([1,2,3,4,5,6,7,8,9,10])
// .pipe(
//     map(data=> data**5),
//     filter(value => value%2==0),
//     take(3)
// )
// .subscribe(data => console.log(data))

// from([1,2,3,4,5,6,7,8,9,10])
// .pipe(
//     filter(value => value%2==0),
//     map(data=> data**5),
//     take(3)
// )
// .subscribe(data => console.log(data))

// const stop$ = new Subject();

// interval(500).pipe(
//     takeUntil(stop$)
// ).subscribe(n => console.log("n:",n))


// from([1,2,3,4,5,6,7,8,9,10])
// .pipe(
//     concatMap(value => of(value).pipe(delay(500))),
//     filter(value => value%2==0),
//     map(data=> data**5),
//     takeUntil(stop$)
// ).subscribe(data=>console.log("filter", data)
// )
// setTimeout(() => {
//     stop$.next()
// }, 3000);

// scan => reduce

of(1,2,3,4,5)
.pipe(
    scan((acc, val) => acc + val, 0)
).subscribe(console.log)
console.log('reduce \n');

of(1,2,3,4,5)
.pipe(
    reduce((acc, val) => acc + val, 0)
).subscribe(console.log)