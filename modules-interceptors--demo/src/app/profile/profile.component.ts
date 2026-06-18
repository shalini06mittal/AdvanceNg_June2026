import { Component } from '@angular/core';
import { LessonsService } from '../services/lessons.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(public lessonsService:LessonsService){}

}
