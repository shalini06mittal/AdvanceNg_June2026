import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { 
    console.log('User Service');
    
     this.http.get('https://jsonplaceholder.typicode.com/users')
    .subscribe(data => console.log(data));
  }

  getEmployees(){
    
     this.http.get('http://localhost:9090/get/employee')
    .subscribe(data => console.log(data));
  }
}
