// higher order observable
// switchMap, mergemap, concatmap, exhaustmap

import {from, of} from 'rxjs';

import { switchMap, debounceTime, map, delay, mergeMap, concatMap, exhaustMap } from 'rxjs/operators';


// from([1,2,3,4,5])
// .pipe(
//     switchMap(value => of(value*10).pipe(delay(1000)))
// ).subscribe(console.log)

// from([1,2,3,4,5])
// .pipe(
//     mergeMap(value => of(value*10).pipe(delay(1000)))
// ).subscribe(console.log)

// from([1,2,3,4,5])
// .pipe(
//     mergeMap(value => of(value*10))
// ).subscribe(console.log)

// of('s1','s2','s3','s4')
// .pipe(
//     concatMap(step => of(`Procesing step ${step}`).pipe(delay(1000)))
// ).subscribe(console.log)

of('s1','s2','s3','s4')
.pipe(
    exhaustMap(step => of(`Procesing step ${step}`).pipe(delay(1000)))
).subscribe(console.log)