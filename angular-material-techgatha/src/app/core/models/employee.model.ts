export interface Employee{
    id:number
    firstName: string
    lastName: string
    email:string
    department:string,
    role: string
    salary: number
    joinDate: string
    status: string,
    avatar: string
    skills: string[]
}
export interface DashboardStats {
  totalEmployees: number;
  activeCount: number;
  onLeaveCount: number;
}

export interface EmployeeApiResponse {
  employees: Employee[];
  departments: string[];
  stats: DashboardStats;
}