import { Component, OnInit } from '@angular/core';
import { LessonsService } from 'src/app/services/lessons.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(public lessonsService:LessonsService,
    private userService:UserService
  ){
    console.log('Home Component');
    
  }
  ngOnInit(): void {
   // throw new Error('Method not implemented.');
  }
}
