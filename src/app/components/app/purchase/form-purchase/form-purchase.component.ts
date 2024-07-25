import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MemberService } from 'src/app/services/member.service';
import { ProductService } from 'src/app/services/product.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import * as moment from 'moment';
import { Calculations } from 'src/app/utils/calculate-tax';
import { Router } from '@angular/router';
import csc from 'country-state-city';

@Component({
  selector: 'app-form-purchase',
  templateUrl: './form-purchase.component.html',
  styleUrls: ['./form-purchase.component.scss'],
})
export class FormPurchaseComponent implements OnInit {
  constructor(
    private memberService: MemberService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private productService: ProductService,
    private auth: AuthService,
    private purchaseService: PurchaseService,
    private router: Router
  ) {}

  loading = true;
  vendor_list = [];
  vendor_name = '';
  state_name = '';
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
    taxable_value: 0,
    total_amount: 0,
    total_cgst: 0,
    total_sgst: 0,
    total_igst: 0,
    total_discount: 0,
    total_tax: 0,
  };

  async ngOnInit() {
    await this.getAccount();
    await this.getVednors();
    await this.getProducts();
  }

  subscription: Subscription;
  account: any;
  async getAccount() {
    await this.auth.getMe();
    this.subscription = this.auth.loggedInUser.subscribe((res: any) => {
      this.account = res.gym_profile;
    });
  }

  getVednors() {
    this.memberService.getVendors().subscribe(
      (response) => {
        this.loading = false;
        this.spinner.hide();
        if (response.success) {
          this.vendor_list = [...response.data];
          this.getStates();
        }
      },
      (err) => {
        this.loading = false;
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    );
  }

  addVendor() {
    let id = document.getElementById('modal-close-button');
    this.memberService
      .addVendor({ vendor_name: this.vendor_name, state: this.state_name })
      .subscribe(
        (res) => {
          id.click();
          if (res.success) {
            this.vendor_name = '';
            this.state_name = '';
            let data = {
              name: res.data.vendor_name,
              value: res.data.id,
              state: res.data.state,
            };
            console.log(res, data);
            this.vendor_list = [...this.vendor_list, {...data }];
            this.toastr.success('Vendor is added successfully');
          }
        },
        (err) => {
          id.click();
          this.toastr.error(err.error.error);
        }
      );
  }

  state_array = [];
  getStates() {
    this.state_array = csc.getStatesOfCountry('IN');
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

  selectProduct(index) {
    let pro = this.model.product_details[index];
    let i = this.product_list
      .map((e) => {
        return e.id;
      })
      .indexOf(pro.product_id);
    let temp = this.product_list[i];

    let obj = {
      hsn_code: temp.hsn_code,
      product_unit: temp.product_unit,
      product_rate: temp.purchase_price,
      product_tax: temp.gst_purchase,
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

 /*  tax_applied = 'cgst_sgst';
  taxTypeChange(tax) {
    this.model.tax_type = tax;
    if (tax != 'out_of_tax') {
      if (this.model.vednor_id != undefined) {
        let index = this.vendor_list.findIndex((e) => {
          return e.value == this.model.member_id;
        });
        if (this.account.state == this.vendor_list[index].state) {
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
 /*    for (let product of this.model.product_details) {
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
       // this.tax_applied
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

  /*   if (this.tax_applied === 'cgst_sgst' && this.all_tax.length > 0) {
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

    this.model.total_tax = this.model.total_tax.toFixed(2);

    var mainAmount;

    if (this.model.tax_type != 'out_of_tax') {
      mainAmount =
        Number(this.model.taxable_value) + Number(this.model.total_tax);
    } else {
      mainAmount = Number(this.model.taxable_value);
    } */
    if (this.all_tax.length > 0) {
      this.all_tax.forEach((item) => {
        this.model.total_tax += Number(item.tax_amount)
      });
    } 

    var mainAmount =
    Number(this.model.taxable_value) + Number(this.model.total_tax)
    this.model.total_amount = Number(mainAmount) || 0;
    this.model.total_amount = this.model.total_amount.toFixed(2);
  }

  onSubmit() {
    this.spinner.show();
    if (!this.model.product_details[0].product_qty) {
      this.toastr.error('Enter products properly');
      this.spinner.hide();
      return;
    }
    if (this.model.vendor_id == undefined || this.model.vendor_id == '') {
      this.toastr.error('Please select vendor');
      this.spinner.hide();
      return;
    }
    this.model.invoice_date = moment(this.model.invoice_date).format(
      'YYYY-MM-DD'
    );
    if (this.model.due_date) {
      this.model.due_date = moment(this.model.due_date).format('YYYY-MM-DD');
    }
    this.purchaseService.addPurchase(this.model).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.success) {
          this.toastr.success('Successfully added');
          this.router.navigate(['/purchase']);
        }
      },
      (err) => {
        this.toastr.error(err.error.error);
      }
    );
  }
}
