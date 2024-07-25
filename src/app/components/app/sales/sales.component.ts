import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MemberService } from 'src/app/services/member.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  constructor(
    private salesService: SalesService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  loading = true
  async ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show();
      }
    }, 500);
    await this.getSales('')
  }

  sales_list = []

  getSales(search) {
    this.salesService.getSales(search).subscribe(
      (response) => {
        this.loading = false
        this.spinner.hide()
        if (response.success) {
          this.sales_list = response.data
        }
      },
      (err) => {
        console.log(err)
        this.loading = false
        this.spinner.hide()
        this.toastr.error(err.error.error)
      }
    )
  }

  search(e) {
    let value = e.target.value
    this.getSales(value)
  }

  fileURL: any
  downloadInvoice(id) {
    this.spinner.show();
    this.salesService.downloadSales(id).subscribe(
      (response) => {
        this.spinner.hide();
        var file = new Blob([response], { type: "application/pdf" });
        this.fileURL = URL.createObjectURL(file);
        window.open(this.fileURL, "_blank");
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    );
  }

}
