import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';


const routes: Routes = [
  { path: '', redirectTo: 'employee-form', pathMatch: 'full' },
  {path: 'employee-form', component:AddEmployeeComponent},
  {path: 'employee-table', component:TableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
