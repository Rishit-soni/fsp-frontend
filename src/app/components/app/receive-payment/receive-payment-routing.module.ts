import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceivePaymentComponent } from './receive-payment.component';

const routes: Routes = [
  {path:'', component: ReceivePaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceivePaymentRoutingModule { }
