import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private enumService: EnumService
  ) {}

  model: any = {};

  product_unit_array = [
  ];

  async ngOnInit() {
    this.getProductUnit()
  }

  getProductUnit(){
    this.enumService.getProductEnums().subscribe((res)=>{
      if(res.success){
        this.product_unit_array = res.data
      }
    })
  }
  onSubmit() {
    this.spinner.show();
    this.productService.addProduct(this.model).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.success) {
          this.toastr.success('Successfully Added');
          this.router.navigate(['/product']);
        }
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    );
  }
}
