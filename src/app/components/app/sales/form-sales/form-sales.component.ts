import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MemberService } from 'src/app/services/member.service';
import { ProductService } from 'src/app/services/product.service';
import { SalesService } from 'src/app/services/sales.service';
import { Calculations } from 'src/app/utils/calculate-tax';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-form-sales',
  templateUrl: './form-sales.component.html',
  styleUrls: ['./form-sales.component.scss'],
})
export class FormSalesComponent implements OnInit {
  constructor(
    private memberService: MemberService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private productService: ProductService,
    private auth: AuthService,
    private salesService: SalesService,
    private router: Router,
    private enumService: EnumService
  ) {}

  loading = true;
  member_list = [];
  payment_method_array:any = []

  model: any = {
    product_details: [
      {
        product_id: '',
        hsn_code: '',
        product_qty: 0,
        product_unit: '',
        product_rate: 0,
        product_discount: 0,
        product_taxable_val: 0,
        product_tax: 0,
      },
    ],
    tax_type: 'exclusive_tax',
    payment_method: 'cash',
    taxable_value: 0,
    total_amount: 0,
    total_cgst: 0,
    total_sgst: 0,
    total_igst: 0,
    total_discount: 0,
    total_tax: 0,
    paid_amount: 0,
    due_amount: 0
  };

  async ngOnInit() {
    await this.getAccount();
    await this.getMembers();
    await this.getProducts();
    await this.getPaymentMethodEnums()
  }

  subscription: Subscription;
  account: any;
  async getAccount() {
    await this.auth.getMe();
    this.subscription = this.auth.loggedInUser.subscribe((res: any) => {
      this.account = res.gym_profile;
      console.log(this.account)
      this.model.bill_no = this.account.sales_bill_no
    });
  }

  getMembers() {
    this.memberService.getMembersNameIdPair().subscribe(
      (response) => {
        this.loading = false;
        this.spinner.hide();
        if (response.success) {
          console.log(response);
          this.member_list = [...response.data];
        }
      },
      (err) => {
        this.loading = false;
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    );
  }

  product_list = [];
  product_list_array = [];
  getProducts() {
    this.product_list_array = [];
    this.productService.getProduct('').subscribe((res) => {
      if (res.success) {
        this.product_list = res.data;
        for (let pro of res.data) {
          this.product_list_array = [
            ...this.product_list_array,
            {
              name: pro.product_name,
              value: pro.id,
            },
          ];
        }
      }
    });
  }

  getPaymentMethodEnums(){
    this.enumService.getPaymentMethodEnums().subscribe((res)=>{
      if(res.success){
        console.log(res)
        this.payment_method_array = res.data
      }
    })
  }

  changePaidAmount(){
    this.model.due_amount = Number((Number(this.model.total_amount) - Number(this.model.paid_amount)))
  }

  selectProduct(index) {
    let pro = this.model.product_details[index];
    let i = this.product_list
      .map((e) => {
        return e.id;
      })
      .indexOf(pro.product_id);
    let temp = this.product_list[i];
    console.log(temp);
    let obj = {
      hsn_code: temp.hsn_code,
      product_unit: temp.product_unit,
      product_rate: temp.sales_price,
      product_tax: temp.gst_sales,
    };
    this.model.product_details[index] = { ...pro, ...obj };
    this.calculate()
  }
 
  changeMember() {
    //this.taxTypeChange(this.model.tax_type);
  } 

  addProductRow() {
    this.model.product_details.push({
      product_id: '',
      hsn_code: '',
      product_qty: 0,
      product_unit: '',
      product_rate: 0,
      product_discount: 0,
      product_taxable_val: 0,
      product_tax: 0,
    });
  }

  removeProductRow(i) {
    if (this.model.product_details.length > 1) {
      this.model.product_details.splice(i, 1);
    }
  }

/*   tax_applied = 'cgst_sgst';
  taxTypeChange(tax) {
    this.model.tax_type = tax;
    if (tax != 'out_of_tax') {
      if (this.model.member_id != undefined) {
        let index = this.member_list.findIndex((e) => {
          return e.value == this.model.member_id;
        });
        if (this.account.state == this.member_list[index].state) {
          this.tax_applied = 'cgst_sgst';
        } else {
          this.tax_applied = 'igst';
        }
      } else {
        this.tax_applied = 'cgst_sgst';
      }
    } else {
      this.tax_applied = '';
    }
    console.log(this.model.tax_type);
    this.calculate();
  } */

  all_tax = [];
  calculate() {
    this.all_tax = [];
/*     for (let product of this.model.product_details) {
      if (this.model.tax_type === 'exclusive_tax') {
        let calculatedObj = Calculations.calculateExclusiveTax(
          product,
          this.tax_applied
        );
        this.all_tax.push(calculatedObj.tax_obj);
        product = calculatedObj.product;
      }

      if (this.model.tax_type === 'inclusive_tax') {
        let calculatedObj = Calculations.calculateInclusiveTax(
          product,
          this.tax_applied
        );
        this.all_tax.push(calculatedObj.tax_obj);
        product = calculatedObj.product;
      }

      if (this.model.tax_type === 'out_of_tax') {
        let calculatedObj = Calculations.calculateOutOfTax(product);
        product = calculatedObj;
        this.all_tax = [];
      }
    } */
    for (let product of this.model.product_details) {
        let calculatedObj = Calculations.calculateExclusiveTax(
          product
          //this.tax_applied
        );
        this.all_tax.push(calculatedObj.tax_obj);
        product = calculatedObj.product;
    }
    this.finalCalculations();
  }

  finalCalculations() {
    this.model.taxable_value = 0;
    this.model.total_amount = 0;
    this.model.total_cgst = 0;
    this.model.total_sgst = 0;
    this.model.total_igst = 0;
    this.model.total_discount = 0;
    this.model.total_tax = 0;

    this.model.product_details.forEach((item) => {
      if (item.product_taxable_val) {
        this.model.taxable_value += Number(item.product_taxable_val);
      }
      this.model.total_discount += Number(item.discount_val);
    });

    this.model.taxable_value = this.model.taxable_value.toFixed(2);

/*     if (this.tax_applied === 'cgst_sgst' && this.all_tax.length > 0) {
      this.all_tax.forEach((item) => {
        this.model.total_cgst += Number(item.tax_amount);
        this.model.total_sgst += Number(item.tax_amount);
      });
      this.model.total_tax = this.model.total_cgst + this.model.total_sgst;
    } else if (this.tax_applied === 'igst' && this.all_tax.length > 0) {
      this.all_tax.forEach((item) => {
        this.model.total_igst += Number(item.tax_amount);
      });
      this.model.total_tax = this.model.total_igst;
    }
    this.model.total_tax = this.model.total_tax.toFixed(2); */

    if (this.all_tax.length > 0) {
      this.all_tax.forEach((item) => {
        this.model.total_tax += Number(item.tax_amount)
      });
    } 

    var mainAmount;

 /*    if (this.model.tax_type != 'out_of_tax') {
      mainAmount =
        Number(this.model.taxable_value) + Number(this.model.total_tax);
    } else {
      mainAmount = Number(this.model.taxable_value);
    } */

    mainAmount =
    Number(this.model.taxable_value) + Number(this.model.total_tax)

    console.log(mainAmount);
    this.model.total_amount = Number(mainAmount) || 0;
    this.model.paid_amount = Number(mainAmount) || 0;
    this.model.paid_amount = this.model.paid_amount.toFixed(2);
    this.model.total_amount = this.model.total_amount.toFixed(2);
    this.changePaidAmount()
  }


  onSubmit() {
    this.spinner.show();
    if (!this.model.product_details[0].product_qty) {
      this.toastr.error('Enter products properly');
      this.spinner.hide();
      return;
    }
    if (this.model.member_id == undefined || this.model.member_id == '') {
      this.toastr.error('Please select member');
      this.spinner.hide();
      return;
    }
    this.model.invoice_date = moment(this.model.invoice_date).format('YYYY-MM-DD')
    if(this.model.due_date){
      this.model.due_date = moment(this.model.due_date).format('YYYY-MM-DD')
    }
    this.salesService.addSales(this.model).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.success) {
          this.toastr.success('Successfully added');
          this.router.navigate(['/sales'])
        }
      },
      (err) => {
        this.toastr.error(err.error.error);
      }
    );
  }
}
