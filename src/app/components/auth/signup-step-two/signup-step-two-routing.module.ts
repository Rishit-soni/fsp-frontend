import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupStepTwoComponent } from './signup-step-two.component';

const routes: Routes = [
  {path:"", component: SignupStepTwoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupStepTwoRoutingModule { }
