import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseComponent } from './expense.component';
import { FormExpenseComponent } from './form-expense/form-expense.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [ExpenseComponent, FormExpenseComponent],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    NgSelectModule,
    BsDatepickerModule.forRoot()
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ExpenseModule { }
