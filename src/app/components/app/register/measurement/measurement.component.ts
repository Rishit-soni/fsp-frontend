import { Component, OnInit } from '@angular/core';
import { MeasurementService } from 'src/app/services/measurement.service';
import { MemberService } from 'src/app/services/member.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss']
})
export class MeasurementComponent implements OnInit {

  constructor(private measurementService: MeasurementService, private memberService: MemberService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  loading = true
  diet_list: any = []
  param: any
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (param.id) {
        this.param = param
        this.loading = true;
        setTimeout(() => {
          if (this.loading) {
            this.spinner.show();
          }
        }, 500);
        this.getMember(param.id)
        this.getMeasurement(param.id)
      }
    })
  }

  member: any = {}

  getMember(id) {
    this.memberService.getMemberById(id).subscribe((res) => {
      if (res.success) {
        this.member = res.data[0]
      }
    }, err => {
    })
  }

  measurements: any = []
  measurement_index: any = []

  getMeasurement(id) {
    this.spinner.show();
    this.measurementService.getMeasurementsById(id).subscribe(
      (res) => {
        this.spinner.hide();
        this.loading = false
        if (res.success) {
          this.measurements = res.data;
          this.measurement_index = []
          for (let i = 0; i < this.measurements.length; i++) {
            this.measurement_index.push(i)
          }
        }
      },
      (err) => {
        this.spinner.hide();
        this.loading = false
      });
  }
}
