import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportSalesRoutingModule } from './report-sales-routing.module';
import { ReportSalesComponent } from './report-sales.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [ReportSalesComponent],
  imports: [
    CommonModule,
    ReportSalesRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportSalesModule { }
