import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SalesService } from 'src/app/services/sales.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MemberService } from 'src/app/services/member.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-sales',
  templateUrl: './report-sales.component.html',
  styleUrls: ['./report-sales.component.scss']
})
export class ReportSalesComponent implements OnInit {

  constructor(private salesService: SalesService, private memberService: MemberService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  loading = true
  sales_list: any = []
  param: any
  bsRangeValue: Date[] = [];
  ngOnInit(): void {
        this.loading = true;
        setTimeout(() => {
          if (this.loading) {
            this.spinner.show();
          }
        }, 500);

        let start_date, end_date;
        start_date = moment().toDate();
        end_date = moment().toDate();
        this.bsRangeValue = [start_date, end_date]
        let interval = moment(this.bsRangeValue[0]).format('YYYY-MM-DD')+'_'+ moment(this.bsRangeValue[1]).format('YYYY-MM-DD')
        this.getSales(interval,'')
  }

  getSales(interval,search) {
    this.salesService.getAllSales(interval, search).subscribe((res) => {
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

  changeDateInterval() {
    let interval = moment(this.bsRangeValue[0]).format('YYYY-MM-DD')+'_'+ moment(this.bsRangeValue[1]).format('YYYY-MM-DD')
    this.getSales(interval, this.search_text);
  }

  search_text = ''
  search(event){
    let text = event.target.value.toLowerCase()
    this.search_text = text
    if(!this.bsRangeValue[0] || !this.bsRangeValue[1]){
      this.toastr.info('Please Select Date Interval')
      return 
    }
    let interval = moment(this.bsRangeValue[0]).format('YYYY-MM-DD')+'_'+ moment(this.bsRangeValue[1]).format('YYYY-MM-DD')
    this.getSales(interval, this.search_text)
  }
  
}
