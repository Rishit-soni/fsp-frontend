import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { StepOneComponent } from './step-one/step-one.component'

const routes: Routes = [
  { path: 'basic-information', component: StepOneComponent },
  { path: 'basic-information/:id', component: StepOneComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGymRoutingModule {}
