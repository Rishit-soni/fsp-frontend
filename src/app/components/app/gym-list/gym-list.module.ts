import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GymListRoutingModule } from './gym-list-routing.module';
import { GymListComponent } from './gym-list.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { GymDetailsComponent } from './gym-details/gym-details.component';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [GymListComponent, GymDetailsComponent],
  imports: [
    CommonModule,
    GymListRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    NgSelectModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GymListModule { }
