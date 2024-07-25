import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MeasurementService } from 'src/app/services/measurement.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss'],
})
export class MeasurementComponent implements OnInit {
  constructor(
    private memberService: MemberService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private measurementService: MeasurementService
  ) {}

  loading = true;
  member_list = [{ name: 'Select Member', value: '' }];
  member_id = '';
  measurements = [];
  measurement_index = [];
  async ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show();
      }
    }, 500);
    this.getMembers();
  }

  getMembers() {
    this.memberService.getMembersNameIdPair().subscribe(
      (res) => {
        this.loading = false;
        this.spinner.hide();
        if (res.success) {
          this.member_list = [{ name: 'Select Member', value: '' }];
          this.member_list = [...this.member_list, ...res.data];
        }
      },
      (err) => {
        this.loading = false;
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    );
  }

  getMeasurements() {
    if (this.member_id) {
      this.spinner.show();
      this.measurementService.getMeasurementsById(this.member_id).subscribe(
        (res) => {
          this.spinner.hide();
          if (res.success) {
            this.measurements = res.data;
            console.log(res.data)
            this.measurement_index = []
            for (let i = 0; i < this.measurements.length; i++) {
              this.measurement_index.push(i)
            }
          }
        },
        (err) => {
          this.toastr.error(err.error.error);
        }
      );
    }
  }
}
