import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SignupStepThreeRoutingModule } from './signup-step-three-routing.module'
import { SignupStepThreeComponent } from './signup-step-three.component'
import { FormsModule } from '@angular/forms'
import { NgxSpinnerModule } from 'ngx-spinner'
import * as firebase from 'firebase'
import { environment } from 'src/environments/environment'
firebase.initializeApp(environment.firebaseConfig)
@NgModule({
  declarations: [SignupStepThreeComponent],
  imports: [
    CommonModule,
    SignupStepThreeRoutingModule,
    FormsModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignupStepThreeModule {}
