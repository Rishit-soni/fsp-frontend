import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingPaymentRoutingModule } from './pending-payment-routing.module';
import { PendingPaymentComponent } from './pending-payment.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AcceptPaymentComponent } from './accept-payment/accept-payment.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [PendingPaymentComponent, AcceptPaymentComponent],
  imports: [
    CommonModule,
    PendingPaymentRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PendingPaymentModule { }
