import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExpenseService } from 'src/app/services/expense.service';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  constructor(
    private expenseService: ExpenseService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}


  expense_list = [];
  loading = true;

  async ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show();
      }
    }, 500);

    await this.getExpense('');
  }

  getExpense(search) {
    this.expenseService.getExpenses(search).subscribe(
      (res) => {
        this.loading = false;
        this.spinner.hide();
        if (res.success) {
          this.expense_list = res.data;
        }
      },
      (err) => {
        this.loading = false;
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    );
  }

  search(e) {
    let value = e.target.value;
    this.getExpense(value);
  }
}
