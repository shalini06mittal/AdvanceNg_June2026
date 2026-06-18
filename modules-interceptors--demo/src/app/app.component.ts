import { Component, Inject } from '@angular/core';
import { UserService } from './services/user.service';
import { EmailService } from './services/email.service';
import { APP_CONFIG } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'modules-interceptors--demo';
  constructor( public userService:UserService,
    private s1:EmailService,
    @Inject(APP_CONFIG) private config:any,
    @Inject('COLORS') private colors:string,
    @Inject('FONT_COLORS') private fontcolors:string[],

  ){
    // s1.send()
    // console.log(this.config.apiUrl);
    // console.log(colors);
    // console.log(fontcolors);
    
    
    
  }
}
