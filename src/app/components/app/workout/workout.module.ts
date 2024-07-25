import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { WorkoutRoutingModule } from './workout-routing.module'
import { WorkoutComponent } from './workout.component'
import { FormWorkoutComponent } from './form-workout/form-workout.component'
import { WorkoutExpirationComponent } from './workout-expiration/workout-expiration.component'
import { FormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { NgxSpinnerModule } from 'ngx-spinner';
import { AssignWorkoutComponent } from './assign-workout/assign-workout.component'

@NgModule({
  declarations: [
    WorkoutComponent,
    FormWorkoutComponent,
    WorkoutExpirationComponent,
    AssignWorkoutComponent,
  ],
  imports: [
    CommonModule,
    WorkoutRoutingModule,
    FormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkoutModule { }
