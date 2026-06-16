import { combineLatest, interval, map } from "rxjs";

const price$ = interval(1000).pipe(map(n=>n*10+100));//100, 110, 120, 130
const qty$ = interval(1500).pipe(map(n=>n+1));1,2,3,4,5

combineLatest([price$, qty$])// 100,1 : 110, 1
.pipe(
    map(([price, qty])=> ({price, qty, total : price * qty }))
).subscribe(console.log)