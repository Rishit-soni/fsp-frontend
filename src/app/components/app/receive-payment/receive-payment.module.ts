import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceivePaymentRoutingModule } from './receive-payment-routing.module';
import { ReceivePaymentComponent } from './receive-payment.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [ReceivePaymentComponent],
  imports: [
    CommonModule,
    ReceivePaymentRoutingModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReceivePaymentModule { }
