import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay, delay } from 'rxjs';
import { Employee, DashboardStats, EmployeeApiResponse } from '../models/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly dataUrl = 'assets/data/employees.json';
  // Cache the HTTP call so multiple subscribers reuse one request

  constructor(private http: HttpClient) { }

  private response$!: Observable<EmployeeApiResponse>;
  
  refreshEmployees() {
    this.response$ = this.http
      .get<EmployeeApiResponse>(this.dataUrl)
      .pipe(
        delay(2000),
        shareReplay(1));
  }

  private getResponse(): Observable<EmployeeApiResponse> {

    if (!this.response$) {
      this.refreshEmployees();
    }

    return this.response$!;
  }
  // getAll(): Observable<Employee[]> {
  //   return this.http.get<{ employees: Employee[] }>(this.dataUrl)
  //     .pipe(map(res => res.employees));
  // }

  getById(id: number): Observable<Employee | undefined> {
    return this.getAll().pipe(delay(2000),map(emp => emp.find(e => e.id === id)));
  }
  getAll(): Observable<Employee[]> {
    return this.getResponse().pipe(map(res => res.employees));
  }

  getDepartments(): Observable<string[]> {
    return this.getResponse().pipe(map(res => res.departments));
  }

  getStats(): Observable<DashboardStats> {
    return this.getResponse().pipe(map(res => res.stats));
  }

}
