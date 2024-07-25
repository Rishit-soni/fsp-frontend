import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingPaymentComponent } from './pending-payment.component';
import { AcceptPaymentComponent } from './accept-payment/accept-payment.component';

const routes: Routes = [
  { path: '', component: PendingPaymentComponent },
  { path: 'accept/:type/:id', component: AcceptPaymentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingPaymentRoutingModule { }
