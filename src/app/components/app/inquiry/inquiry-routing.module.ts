import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormInquiryComponent } from './form-inquiry/form-inquiry.component';
import { InquiryComponent } from './inquiry.component';
import { FollowUpComponent } from './follow-up/follow-up.component';

const routes: Routes = [
  { path: '', component: InquiryComponent },
  { path: 'add', component: FormInquiryComponent },
  { path: 'follow-up', component: FollowUpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InquiryRoutingModule {}
