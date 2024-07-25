import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MeasurementComponent } from './measurement.component'
import { FormMeasurementComponent } from './form-measurement/form-measurement.component'

const routes: Routes = [
  { path: '', component: MeasurementComponent },
  { path: 'add', component: FormMeasurementComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeasurementRoutingModule {}
