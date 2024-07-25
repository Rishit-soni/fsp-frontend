import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MembershipPackageComponent } from './membership-package.component'
import { ExpirationPackageComponent } from './expiration-package/expiration-package.component'
import { FormMembershipComponent } from './form-membership/form-membership.component';
import { AssignPackageComponent } from './assign-package/assign-package.component';

const routes: Routes = [
  { path: '', component: MembershipPackageComponent },
  { path: 'add', component:FormMembershipComponent},
  { path: 'expiration', component: ExpirationPackageComponent },
  { path: 'edit/:edit_id', component:FormMembershipComponent},
  { path: 'view/:view_id', component:FormMembershipComponent},
  { path: 'assign-membership-package/:type/:id', component: AssignPackageComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembershipPackageRoutingModule {}
