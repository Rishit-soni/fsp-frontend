import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExpenseService } from 'src/app/services/expense.service';
import * as dropdown from 'src/app/utils/dropdown';
import * as moment from 'moment';

@Component({
  selector: 'app-form-expense',
  templateUrl: './form-expense.component.html',
  styleUrls: ['./form-expense.component.scss'],
})
export class FormExpenseComponent implements OnInit {
  constructor(
    private expenseService: ExpenseService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  model: any = {};
  expense_type = '';
  expense_type_array = [];

  async ngOnInit() {
    await this.getExpenseType();
  }

  onSubmit() {
    if (!this.model.expense_type || !this.model.invoice_date) {
      this.toastr.error('Please fill required field');
      return;
    }
    this.model.invoice_date = moment(this.model.invoice_date).format(
      'YYYY-MM-DD'
    );
    this.spinner.show();
    this.expenseService.addExpense(this.model).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.success) {
          this.toastr.success('Successfully Added');
          this.router.navigate(['/expense']);
        }
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    );
  }

  getExpenseType() {
    this.expenseService.getExpenseType().subscribe(
      (res) => {
        if (res.success) {
          this.expense_type_array = []
          for (let ele of res.data) {
            this.expense_type_array = [
              ... this.expense_type_array,
              {
                name: ele.expense_type,
                value: ele.expense_type,
              },
            ];
          }
          for (let i = 0; i < this.expense_type_array.length - 1; i++) {
            for (let j = 0; j < this.expense_type_array.length - i - 1; j++) {
              if (this.expense_type_array[j].name > this.expense_type_array[j + 1].name) {
                let temp = { ... this.expense_type_array[j] }
                this.expense_type_array[j] = this.expense_type_array[j + 1];
                this.expense_type_array[j + 1] = temp
              }
            }
          }
        }
      },
      (err) => {
        this.toastr.error(err.error.error);
      }
    );
  }

  addExpenseType() {
    let id = document.getElementById('modal-close-button');
    this.expenseService
      .addExpenseType({ expense_type: this.expense_type })
      .subscribe(
        (res) => {
          id.click();
          if (res.success) {
            this.expense_type_array = [
              { name: this.expense_type, value: this.expense_type },
              ...this.expense_type_array,
            ];
            this.expense_type = '';
            this.toastr.success('Expense type is added successfully');
          }
        },
        (err) => {
          id.click();
          this.toastr.error(err.error.error);
        }
      );
  }
}
