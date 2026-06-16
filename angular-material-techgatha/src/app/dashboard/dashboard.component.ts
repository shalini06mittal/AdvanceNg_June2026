import { Component, OnInit } from '@angular/core';
import { DashboardStats, Employee } from '../core/models/employee.model';
import { EmployeeService } from '../core/services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
 

  stats : DashboardStats | null = null;
  recentEmployees : Employee[] = [];
  isLoading = true;

  constructor(private empService: EmployeeService){}
  ngOnInit(): void {
      this.empService.getStats().subscribe(s => this.stats=s);

      this.empService.getAll().subscribe(emps =>{
        this.recentEmployees = [...emps]
          .sort((a,b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
          .slice(0,3);
          this.isLoading = false;
      })
    }

    getStatusClass(status:string):string{
        const map: Record<string, string> = {
        active: 'status-active',
        'on-leave': 'status-leave',
        inactive: 'status-inactive',
      };
      return map[status] ?? '';
    }

}
