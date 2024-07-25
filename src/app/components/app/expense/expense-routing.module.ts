import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './expense.component';
import { FormExpenseComponent } from './form-expense/form-expense.component';

const routes: Routes = [
  {path:'', component: ExpenseComponent},
  {path:'add', component:FormExpenseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
