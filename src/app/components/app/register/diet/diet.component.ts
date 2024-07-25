import { Component, OnInit } from '@angular/core';
import { DietChartService } from 'src/app/services/diet-chart.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.scss']
})
export class DietComponent implements OnInit {

  constructor(private dietService: DietChartService, private memberService: MemberService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  loading = true
  diet_list:any = []
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
        this.getDiet(param.id)
      }
    })
  }

  getDiet(id) {
    this.dietService.getDietPlanByMemberId(id).subscribe((res) => {
      this.loading = false;
      this.spinner.hide()
      console.log(res)
      if (res.success) {
        this.diet_list = res.data
      }
    }, err => {
      this.loading = false;
      this.spinner.hide()
    })
  }


  member:any = {}

  getMember(id) {
    this.memberService.getMemberById(id).subscribe((res) => {
      if (res.success) {
        this.member = res.data[0]

      }
    }, err => {
    })
  }
}
