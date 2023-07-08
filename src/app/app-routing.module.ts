import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { AddDepartmentComponent } from './departments/add-department/add-department.component';
import { UpdateDepartmentComponent } from './departments/update-department/update-department.component';
import { DepartmentDetailsComponent } from './departments/department-details/department-details.component';
import { GetDepartmentsComponent } from './departments/get-departments/get-departments.component';


const routes: Routes = [
  { path: '', redirectTo: 'allDepartments', pathMatch: 'full' },
  {path: 'employee-form', component:AddEmployeeComponent},
  {path: 'updateEmployee/:id', component:UpdateEmployeeComponent},
  {path: 'employee-table', component:TableComponent},
  // Departments
  {path: 'allDepartments', component:GetDepartmentsComponent},
  {path: 'addDepartment', component:AddDepartmentComponent},
  {path: 'updateDepartment/:id', component:UpdateDepartmentComponent},
  {path: 'departmentDetails/:id', component:DepartmentDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
