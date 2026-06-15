import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Employee } from '../core/models/employee.model';
import { EmployeeService } from '../core/services/employee.service';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {
  employee: Employee | undefined;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private empService: EmployeeService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.empService.getById(id).subscribe(emp => {
      this.employee = emp;
      this.isLoading = false;
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      active: 'status-active',
      'on-leave': 'status-leave',
      inactive: 'status-inactive',
    };
    return map[status] ?? '';
  }
}
