import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-pending-payment',
  templateUrl: './pending-payment.component.html',
  styleUrls: ['./pending-payment.component.scss']
})
export class PendingPaymentComponent implements OnInit {
  constructor(
    private paymentService: PaymentService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  payment_list = [];
  loading = true
  async ngOnInit(){
    this.loading = true;
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show();
      }
    }, 500);
    await this.getPendingPayment('')
  }

  getPendingPayment(search){
    this.paymentService.getPendingPayment(search).subscribe((res)=>{
      this.loading = false;
      this.spinner.hide()
      if(res.success){
        console.log(res)
        this.payment_list = res.data
        console.log(this.payment_list)
      }
    }, err => {
      this.toastr.error(err.error.error)
      this.loading = false;
      this.spinner.hide()
    })
  }

  search(event){
    let text = event.target.value.toLowerCase()
    this.getPendingPayment(text)
  }

}
