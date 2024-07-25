import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MembershipPackageRoutingModule } from './membership-package-routing.module'
import { MembershipPackageComponent } from './membership-package.component'
import { ExpirationPackageComponent } from './expiration-package/expiration-package.component'
import { FormMembershipComponent } from './form-membership/form-membership.component'
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule } from '@angular/forms'
import { NgxSpinnerModule } from 'ngx-spinner';
import { AssignPackageComponent } from './assign-package/assign-package.component'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    MembershipPackageComponent,
    ExpirationPackageComponent,
    FormMembershipComponent,
    AssignPackageComponent,
  ],
  imports: [
    CommonModule,
    MembershipPackageRoutingModule,
    NgSelectModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MembershipPackageModule { }
