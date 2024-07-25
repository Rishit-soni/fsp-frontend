import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}


  product_list = [];
  loading = true;

  async ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show();
      }
    }, 500);

    await this.getProducts('');
  }

  getProducts(search) {
    this.productService.getProduct(search).subscribe(
      (res) => {
        this.loading = false;
        this.spinner.hide();
        if (res.success) {
          this.product_list = res.data;
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
    this.getProducts(value);
  }

}
