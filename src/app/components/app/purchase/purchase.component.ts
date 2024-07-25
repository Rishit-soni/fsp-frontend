import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  constructor(
    private purchaseService: PurchaseService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  loading = true
  async ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show();
      }
    }, 500);
    await this.getPurchases('')
  }

  purchase_list = []

  getPurchases(search) {
    this.purchaseService.getPurchases(search).subscribe(
      (response) => {
        this.loading = false
        this.spinner.hide()
        if (response.success) {
          this.purchase_list = response.data
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

  search(e){
    let value = e.target.value
    this.getPurchases(value)
  }


}
