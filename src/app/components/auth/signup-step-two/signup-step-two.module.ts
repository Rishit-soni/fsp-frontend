import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupStepTwoRoutingModule } from './signup-step-two-routing.module';
import { SignupStepTwoComponent } from './signup-step-two.component';
import { FormsModule } from '@angular/forms'
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [SignupStepTwoComponent],
  imports: [
    CommonModule,
    SignupStepTwoRoutingModule,
    FormsModule,
    NgxSpinnerModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SignupStepTwoModule { }
