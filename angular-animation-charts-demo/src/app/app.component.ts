import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('toggleGreenButton',[
      state('true', style({
        backgroundColor: 'green',
        color:'yellow',
        transform: 'scale(1.1)'
      })),
      // state('void', style({
      //   backgroundColor: 'black',
      //   color:'yellow',
      //   transform: 'scale(1)'
      // })),
      state('false', style({
        backgroundColor: 'red',
        color:'yellow',
         transform: 'scale(1)'
      })),
      // transition('true => false', animate('500ms linear')),
      // transition('false => true', animate('500ms linear')),
      
      transition('void => *', 
        [
           style({
            backgroundColor: 'black',
            color:'yellow',
            transform: 'scale(1)',
            opacity:0
          }),
          animate('2000ms'), 
            style({opacity:1})
          ]),
          transition('true <=> false', animate('500ms ease-in-out')),
      ]),

      trigger('animateArc',[
        state('true', style({
          left:'400px',
          top:'200px'
        })),
         state('false', style({
          left:'0',
          top:'200px'
        })),
        transition('false => true', animate('1000ms linear', keyframes([
            style({left:'0px', top:'200px', offset:0}),
            style({left:'200px', top:'100px', offset:0.5}),
            style({left:'400px', top:'200px', offset:1}),
        ]))),
        transition('true => false', animate('1000ms linear', keyframes([
            style({left:'400px', top:'200px', offset:0}),
            style({left:'200px', top:'100px', offset:0.5}),
            style({left:'0px', top:'200px', offset:1}),
        ])))
      ])
  ]
})
export class AppComponent {
  title = 'angular-animation-charts-demo';
  show:boolean = false
  buttonText:string='Show Button';
  isGreen:string = 'true'
  arc:string = 'false'
  toggleGreen(){
    this.isGreen = this.isGreen === 'true' ? 'false' : 'true';
  }
  toggleShow(){
    this.show = !this.show;
    this.buttonText = this.show ? 'Hide Button' : 'Show Button';
  }
  toggleBounce(){
    this.arc = this.arc === 'false' ? 'true' : 'false';
  }
}
