import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RegisterComponent } from './register.component'
import { AddMemberStepOneComponent } from './add-member-step-one/add-member-step-one.component'
import { AddMemberStepTwoComponent } from './add-member-step-two/add-member-step-two.component'
import { AddMemberStepThreeComponent } from './add-member-step-three/add-member-step-three.component'
import { AddMemberStepFourComponent } from './add-member-step-four/add-member-step-four.component'
import { AddMemberStepFiveComponent } from './add-member-step-five/add-member-step-five.component'
import { BasicComponent } from './basic/basic.component';
import { SalesComponent } from './sales/sales.component';
import { WorkoutComponent } from './workout/workout.component';
import { DietComponent } from './diet/diet.component';
import { MeasurementComponent } from './measurement/measurement.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'add-member/step-1', component: AddMemberStepOneComponent },
  { path: 'add-member/step-2', component: AddMemberStepTwoComponent },
  { path: 'add-member/step-3', component: AddMemberStepThreeComponent },
  { path: 'add-member/step-4', component: AddMemberStepFourComponent },
  { path: 'add-member/step-5', component: AddMemberStepFiveComponent },
  { path: 'basic/:id', component: BasicComponent },
  { path: 'sales/:id', component: SalesComponent },
  { path: 'workout/:id', component: WorkoutComponent },
  { path: 'diet/:id', component: DietComponent },
  { path: 'measurement/:id', component: MeasurementComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule { }
