import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';
import { MemberService } from 'src/app/services/member.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {



  constructor(private salesService: SalesService, private memberService: MemberService,
    private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  loading = true
  sales_list: any = []
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
        this.getSales(param.id)
      }
    })
  }

  getSales(id) {
    this.salesService.getSalesByMember(id).subscribe((res) => {
      this.loading = false;
      this.spinner.hide()
      console.log(res)
      if (res.success) {
        this.sales_list = res.data
      }
    }, err => {
      this.loading = false;
      this.spinner.hide()
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
}
