import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InquiryService } from 'src/app/services/inquiry.service';
import * as moment from 'moment';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-form-inquiry',
  templateUrl: './form-inquiry.component.html',
  styleUrls: ['./form-inquiry.component.scss'],
})
export class FormInquiryComponent implements OnInit {
  constructor(
    private inquiryService: InquiryService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private enumService: EnumService
  ) { }

  model: any = {
    inquiry_date: new Date()
  };
  gender_array: Array<Object> = [
    {
      name: 'Male',
      value: 'male',
    },
    {
      name: 'Female',
      value: 'female',
    },
    {
      name: 'Other',
      value: 'other',
    },
  ];

  fitness_goal_array = [
  ];

  promotional_source_array = [

  ];

  status_array = [

  ];

  stage_array = [

  ];

  ngOnInit(): void {
    this.enumService.getInquiryEnums().subscribe((res) => {
      if (res.success) {
        this.fitness_goal_array = res.data.fitness_goal_array
        this.promotional_source_array = res.data.promotional_source_array
        this.stage_array = res.data.stage_array
        this.status_array = res.data.status_array
      }
    })
  }

  onSubmit() {
    if (this.model.inquiry_date) {
      this.model.inquiry_date = moment(this.model.inquiry_date).format('YYYY-MM-DD')
    }
    if (this.model.followup_date) {
      this.model.followup_date = moment(this.model.followup_date).format('YYYY-MM-DD')
    }
    if (this.model.trial_date) {
      this.model.trial_date = moment(this.model.trial_date).format('YYYY-MM-DD')
    }
    this.spinner.show()
    this.inquiryService.addInquiry(this.model).subscribe(
      (res) => {
        this.spinner.hide()
        if (res.success) {
          this.toastr.success('Successfully Added');
          this.router.navigate(['/inquiry']);
        }
      },
      (err) => {
        this.spinner.hide()
        this.toastr.error(err.error.error);
      }
    );
  }
}
