import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPurchaseComponent } from './form-purchase/form-purchase.component';
import { PurchaseComponent } from './purchase.component';

const routes: Routes = [
  { path: '', component: PurchaseComponent },
  { path: 'add', component: FormPurchaseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseRoutingModule {}
