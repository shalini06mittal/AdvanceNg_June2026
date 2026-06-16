import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  notifCount = 2;

  constructor(public themeService: ThemeService){}
  ngOnInit(): void {
    this.themeService.init();
  }


  
}
