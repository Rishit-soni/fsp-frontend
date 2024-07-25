import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { FormPurchaseComponent } from './form-purchase/form-purchase.component';
import { PurchaseComponent } from './purchase.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [FormPurchaseComponent, PurchaseComponent],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    FormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
  ],
})
export class PurchaseModule {}
