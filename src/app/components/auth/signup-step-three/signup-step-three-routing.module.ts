import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SignupStepThreeComponent } from './signup-step-three.component';

const routes: Routes = [{ path: '', component: SignupStepThreeComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupStepThreeRoutingModule {}
