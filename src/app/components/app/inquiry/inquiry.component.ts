import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InquiryService } from 'src/app/services/inquiry.service';
import { Router } from '@angular/router';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss'],
})
export class InquiryComponent implements OnInit {
  constructor(
    private inquiryService: InquiryService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private enumService: EnumService
  ) { }

  fitness_goal = {
  };

  promotional_source = {

  }

  inquiry_list = [];
  loading = true;
  async ngOnInit() {
    this.loading = true;
    this.getInquiryEnums()
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show();
      }
    }, 500);

    await this.getInquiry('');
  }

  getInquiry(search) {
    this.inquiryService.getInquiry(search).subscribe(
      (res) => {
        this.loading = false;
        this.spinner.hide();
        if (res.success) {
          console.log(res)
          this.inquiry_list = res.data;
        }
      },
      (err) => {
        this.loading = false;
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    );
  }

  getInquiryEnums() {
    this.enumService.getInquiryEnums().subscribe((res) => {
      if (res.success) {

        this.fitness_goal = {}

        for (let ele of res.data.fitness_goal_array) {
          this.fitness_goal[`${ele.value}`] = ele.name
        }

        this.promotional_source = {}
        for (let ele of res.data.promotional_source_array) {
          this.promotional_source[`${ele.value}`] = ele.name
        }
        console.log(this.promotional_source)
      }
    })
  }

  getFitnessGoal(goal) {
    return this.fitness_goal[`${goal}`]
  }

  getPromotionalSource(key) {
    return this.promotional_source[key]
  }

  search(e) {
    let value = e.target.value;
    this.getInquiry(value);
  }

  async createMember(index) {
    let inq = { ...this.inquiry_list[index] }
    let data = {
      first_name: inq.first_name,
      last_name: inq.last_name,
      gender: inq.gender,
      mobile_no: inq.mobile_no,
      fitness_goal: inq.fitness_goal,
      inquiry_id: inq.id,
      email: inq.email
    }
    await localStorage.setItem('_FSP_MEMBER_DATA', JSON.stringify(data));
    this.router.navigate(['/register/add-member/step-1'])
  }
}
