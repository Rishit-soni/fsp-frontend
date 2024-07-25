import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormEmployeeComponent } from './form-employee/form-employee.component';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [
  {path:'', component: EmployeeComponent},
  {path: 'add', component: FormEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
