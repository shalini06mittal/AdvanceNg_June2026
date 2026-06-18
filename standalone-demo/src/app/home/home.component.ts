import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe } from '../capitalize.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, CapitalizePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    username:string='Home'
}
