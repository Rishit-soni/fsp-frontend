import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AddGymRoutingModule } from './add-gym-routing.module'
import { StepOneComponent } from './step-one/step-one.component'
import { FormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select'
import { NgxSpinnerModule } from 'ngx-spinner'

@NgModule({
  declarations: [StepOneComponent],
  imports: [CommonModule, AddGymRoutingModule, FormsModule, NgSelectModule, NgxSpinnerModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AddGymModule {}
