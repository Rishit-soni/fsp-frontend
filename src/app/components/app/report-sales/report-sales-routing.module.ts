import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportSalesComponent } from './report-sales.component';

const routes: Routes = [
  {path:'', component: ReportSalesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportSalesRoutingModule { }
