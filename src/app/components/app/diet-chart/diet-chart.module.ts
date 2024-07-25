import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DietChartRoutingModule } from './diet-chart-routing.module';
import { DietChartComponent } from './diet-chart.component';
import { DietExpirationComponent } from './diet-expiration/diet-expiration.component';
import { FormDietComponent } from './form-diet/form-diet.component';
import { FormsModule } from '@angular/forms';
import { TimePipe } from 'src/app/pipes/time.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalculateKcalPipe } from 'src/app/pipes/calculate-kcal.pipe';
import { AssignDietComponent } from './assign-diet/assign-diet.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    DietChartComponent,
    DietExpirationComponent,
    FormDietComponent,
    TimePipe,
    CalculateKcalPipe,
    AssignDietComponent
  ],
  imports: [
    CommonModule,
    DietChartRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    NgSelectModule,
    BsDatepickerModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DietChartModule { }
