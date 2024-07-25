import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSalesComponent } from './form-sales/form-sales.component';
import { SalesComponent } from './sales.component';

const routes: Routes = [
  { path: '', component: SalesComponent },
  { path: 'add', component: FormSalesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}
