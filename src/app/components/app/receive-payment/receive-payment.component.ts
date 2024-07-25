import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-receive-payment',
  templateUrl: './receive-payment.component.html',
  styleUrls: ['./receive-payment.component.scss'],
})
export class ReceivePaymentComponent implements OnInit {
  constructor(
    private paymentService: PaymentService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private enumService: EnumService
  ) {}

  payment_list = [];
  loading = true
  payment_method = {}

  async ngOnInit(){
    this.loading = true;
    await this.getPaymentMethodEnums()
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show();
      }
    }, 500);
    await this.getReceivingPayment('')
  }

  getPaymentMethodEnums(){
    this.enumService.getPaymentMethodEnums().subscribe((res)=>{
      if(res.success){
        this.payment_method = {}
        for (let ele of res.data) {
          this.payment_method[`${ele.value}`] = ele.name
        }
        console.log(this.payment_method)
      }
    })
  }

  getPayment(key){
    return this.payment_method[key]
  }
  getReceivingPayment(search){
    this.paymentService.getRecevingPayment(search).subscribe((res)=>{
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
    this.getReceivingPayment(text)
  }
}


