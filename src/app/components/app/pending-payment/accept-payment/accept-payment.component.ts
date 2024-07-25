import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SalesService } from 'src/app/services/sales.service';
import * as moment from 'moment';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-accept-payment',
  templateUrl: './accept-payment.component.html',
  styleUrls: ['./accept-payment.component.scss']
})
export class AcceptPaymentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private memberService: MemberService, private spinner: NgxSpinnerService,
    private router: Router, private toastr: ToastrService, private salesService: SalesService, private enumService: EnumService) { }
  model: any = {}
  param: any
  data: any = {}
/*   payment_method_array = [
    { value: 'cash', name: 'Cash' },
    { value: 'cheque', name: 'Cheque' },
    { value: 'credit-card', name: 'Credit Card' },
    { value: 'debit-card', name: 'Debit Card' },
    { value: 'paytm', name: 'Paytm' },
    { value: 'g-pay', name: 'GPay' },
    { value: 'phone-pe', name: ' PhonePe' },
    { value: 'amazon-pay', name: 'Amazon Pay' },
    { value: 'mobikwik', name: 'Mobikwik' },
    { value: 'free-charge', name: 'Free Charge' },
    { value: 'online-transfer', name: 'Online Transfer' },
    { value: 'neft/rtgs', name: 'NEFT/RTGS' },
    { value: 'imps', name: 'IMPS' },
  ]; */
  payment_method_array = []

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.getPaymentMethodEnums()
      if (param.id) {
        this.param = param
        if (param.type && param.type == 'package') {
          this.getMemberPackage(param.id)
        }
        else if (param.type && param.type == 'product') {
          this.getSales(param.id)
        }
      }
    })
  }

  changePaidAmount() {
    this.model.pending_amount =
      this.model.total_amount - (this.model.paid_amount + this.model.total_paid_amount);
  }

  
  getPaymentMethodEnums(){
    this.enumService.getPaymentMethodEnums().subscribe((res)=>{
      if(res.success){
        console.log(res)
        this.payment_method_array = res.data
      }
    })
  }
  
  getMemberPackage(id) {
    this.memberService.getMemberPackage(id).subscribe((res) => {
      if (res.success) {
        this.data = JSON.parse(JSON.stringify(res.data))
        this.model = {
          total_amount: this.data.total_amount,
          total_paid_amount: this.data.total_paid_amount,
          paid_amount: 0,
          pending_amount: this.data.pending_amount,
          next_payment_date: null,
          payment_date: new Date(),
          payment_method: 'cash',
          sales_type: 'package'
        }
      }
    })
  }

  getSales(id) {
    this.salesService.getSalesById(id).subscribe((res) => {
      if (res.success) {
        this.data = JSON.parse(JSON.stringify(res.data))
        this.model = {
          total_amount: this.data.total_amount,
          total_paid_amount: this.data.total_amount - this.data.due_amount,
          paid_amount: 0,
          pending_amount: this.data.due_amount,
          next_payment_date: null,
          payment_date: new Date(),
          payment_method: 'cash',
          sales_type: 'product'
        }
      }
    })
  }

  updateMemberPackage() {
    if (!this.model.payment_date) {
      this.toastr.error('Payment date is required')
      return
    }
    this.spinner.show()
    this.data.pending_amount = this.model.pending_amount;
    this.data.total_paid_amount += this.model.paid_amount;
    this.model.payment_date = moment(this.model.payment_date).format('YYYY-MM-DD')
    this.data.pending_amount != 0 ? this.model.next_payment_date = moment(this.model.next_payment_date).format('YYYY-MM-DD') : this.data.next_payment_date = null;
    this.data.next_payment_date = this.model.next_payment_date
    this.model.sales_package_id = Number(this.data.id)
    this.model.member_id = Number(this.data.member_id)
    this.model.parent_id = Number(this.data.parent_id)
    this.model.total_paid_amount += this.model.paid_amount

    let data = {
      package: this.data,
      transaction: this.model
    }
    this.memberService.updateMemberPackage(this.param.id, data).subscribe((res) => {
      this.spinner.hide()
      if (res.success) {
        this.router.navigate(['/pending-payment'])
        this.toastr.success('Success')
      }
    }, err => {
      this.spinner.hide()
      this.toastr.error(err.error.message)
    })
  }

  updateSales() {
    if (!this.model.payment_date) {
      this.toastr.error('Payment date is required')
      return
    }
    this.spinner.show()
    this.data.due_amount = this.model.pending_amount;
    this.data.pending_amount != 0 ? this.model.next_payment_date = moment(this.model.next_payment_date).format('YYYY-MM-DD') : this.data.next_payment_date = null;
    this.data.next_payment_date = this.model.next_payment_date
    this.model.payment_date = moment(this.model.payment_date).format('YYYY-MM-DD')
    this.model.sales_package_id = Number(this.data.id)
    this.model.member_id = Number(this.data.member_id)
    this.model.parent_id = Number(this.data.parent_id)
    this.model.total_paid_amount += this.model.paid_amount

    let data = {
      sales: this.data,
      transaction: this.model
    }
    this.salesService.updateSalesById(this.param.id, data).subscribe((res) => {
      this.spinner.hide()
      if (res.success) {
        this.router.navigate(['/pending-payment'])
        this.toastr.success('Success')
      }
    }, err => {
      this.spinner.hide()
      this.toastr.error(err.error.message)
    })
  }

  onSubmit(f: NgForm) {
    if (f.form.status != 'INVALID') {
      if (this.param.type == 'package') {
        this.updateMemberPackage()
      }
      else if (this.param.type == 'product') {
        this.updateSales()
      }
    }
  }
}
