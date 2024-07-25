import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InquiryRoutingModule } from './inquiry-routing.module';
import { InquiryComponent } from './inquiry.component';
import { FormInquiryComponent } from './form-inquiry/form-inquiry.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FollowUpComponent } from './follow-up/follow-up.component';

@NgModule({
  declarations: [InquiryComponent, FormInquiryComponent, FollowUpComponent],
  imports: [
    CommonModule,
    InquiryRoutingModule,
    FormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InquiryModule {}
