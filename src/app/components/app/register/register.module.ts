import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select'

import { RegisterRoutingModule } from './register-routing.module'
import { RegisterComponent } from './register.component'
import { AddMemberStepOneComponent } from './add-member-step-one/add-member-step-one.component'
import { AddMemberStepTwoComponent } from './add-member-step-two/add-member-step-two.component'
import { AddMemberStepThreeComponent } from './add-member-step-three/add-member-step-three.component'
import { AddMemberStepFourComponent } from './add-member-step-four/add-member-step-four.component'
import { AddMemberStepFiveComponent } from './add-member-step-five/add-member-step-five.component'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BasicComponent } from './basic/basic.component';
import { SalesComponent } from './sales/sales.component';
import { WorkoutComponent } from './workout/workout.component';
import { DietComponent } from './diet/diet.component';
import { MeasurementComponent } from './measurement/measurement.component'
@NgModule({
  declarations: [
    RegisterComponent,
    AddMemberStepOneComponent,
    AddMemberStepTwoComponent,
    AddMemberStepThreeComponent,
    AddMemberStepFourComponent,
    AddMemberStepFiveComponent,
    BasicComponent,
    SalesComponent,
    WorkoutComponent,
    DietComponent,
    MeasurementComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterModule {}
