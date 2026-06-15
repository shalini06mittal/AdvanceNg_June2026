import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../core/models/employee.model';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent {

  @Input() employee!: Employee;
  @Output() view = new EventEmitter<Employee>();
  @Output() delete = new EventEmitter<Employee>();

  get statusClass(): string{
    const map : Record<string, string> = {
      active: "status-active",
      'on-leave': "status-leave",
      inactive: "status-inactive",
    }
    return map[this.employee.status] ?? '';
  }

  onView(){ this.view.emit(this.employee);}
  onDelete(){this.delete.emit(this.employee);}

}
