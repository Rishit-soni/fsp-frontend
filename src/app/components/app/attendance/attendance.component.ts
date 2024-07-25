import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AttendanceService } from 'src/app/services/attendance.service';
import { MemberService } from 'src/app/services/member.service';
import * as moment from 'moment';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  attendance_list = [];
  member_list = [];
  member_id: any = '';
  date: Date;
  loading = true;
  memberResult = true;
  dateResult = false;
  bsRangeValue: Date[] = [];
  att_radio = 'member';
  public fileURL: any;

  constructor(
    private memberService: MemberService,
    private attendanceService: AttendanceService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    let current_month = moment().month();
    let start_date, end_date;
    start_date = moment().month(current_month).date(1).toDate();
    end_date = moment().month(current_month).endOf('month').toDate();
    // this.bsRangeValue = [start_date, end_date];
  }

  async ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show();
      }
    }, 500);
    await this.getMembers();
  }

  getMembers() {
    this.member_list = [{ name: 'Select Member', value: '' }];
    this.memberService.getMembersNameIdPair().subscribe(
      (response) => {
        this.loading = false;
        this.spinner.hide();
        if (response.success) {
          console.log(response);
          this.member_list = [...this.member_list, ...response.data];
        }
      },
      (err) => {
        this.loading = false;
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    );
  }

  changeMember() {
    if (this.member_id != '') {
      this.spinner.show()
      this.date = null;
      this.attendance_list = [];
      this.memberService.getMemberPackageBYMember(this.member_id).subscribe((res) => {
        this.spinner.hide()
        if (res.success) {
          if (moment(res.data.package_start_date).toDate() > moment().toDate()) {
            this.toastr.info('Member is not Joined yet')
            return
          }
          let start_date = moment(res.data.package_start_date).toDate()
          let end_date = moment().toDate()
          this.bsRangeValue = [start_date, end_date]
          this.getAttendanceByMember();
        }
      }, err => {
        this.spinner.hide()
      })

    }
  }

  attRadioChange(value) {
    console.log(value);
    if (value == 'date') {
      this.member_id = '';
      this.bsRangeValue = [];
    } else {
      this.date = null;
    }
    this.attendance_list = []
    this.att_radio = value;
  }

  changeDate() {
    if (this.date) {
      this.getAttendanceByDate();
    }
  }

  changeDateInterval() {
    this.getAttendanceByMember();
  }

  present_day = 0;
  absent_day = 0;
  avg_time = '00:00:00'
  getAttendanceByMember() {
    this.spinner.show()
    let start_date = this.bsRangeValue[0] ? moment(this.bsRangeValue[0]).format('YYYY-MM-DD') : ''
    let end_date = this.bsRangeValue[1] ? moment(this.bsRangeValue[1]).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
    this.attendanceService
      .getAttendanceByMember(this.member_id, start_date, end_date)
      .subscribe(
        (response) => {
          this.spinner.hide();
          if (response.success) {
            this.date = null;
            this.memberResult = true;
            this.dateResult = false;
            this.attendance_list = response.data.attendance;
            let start_date = moment(this.bsRangeValue[0])
            let end_date = moment(this.bsRangeValue[1])

            if (end_date > moment()) {
              end_date = moment()
            }
            this.present_day = response.data.present_day;
            this.absent_day = end_date.diff(start_date, 'days') + 1 - this.present_day
            let avg_time = moment.duration('00:00:00')
            this.attendance_list.map((ele: any) => {
              if (ele.time_spend) {
                avg_time = moment.duration(avg_time).add(moment.duration(ele.time_spend))
              }
            })
  
            if (moment.duration(avg_time).asMilliseconds() == 0) {
              this.avg_time = '00:00:00'
              return
            }
            let milliseconds = Math.trunc(moment.duration(avg_time).asMilliseconds() / this.present_day)
            var s = Math.trunc((milliseconds / 1000) % 60);
            var m = Math.trunc((milliseconds / (1000 * 60)) % 60)
            var h = Math.trunc((milliseconds / (1000 * 60 * 60)) % 24);
            this.avg_time = (h.toString().length > 1 ? h : '0' + h) + ':'
              + (m.toString().length > 1 ? m : '0' + m) + ':' +
              (s.toString().length > 1 ? s : '0' + s)
          }
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err.error.error);
        }
      );
  }

  getAttendanceByDate() {
    this.spinner.show();
    let date = moment(this.date).format('YYYY-MM-DD');
    this.attendanceService.getAttendanceByDate(date).subscribe(
      (response) => {
        this.spinner.hide();
        if (response.success) {
          this.member_id = '';
          this.bsRangeValue = [];
          this.memberResult = false;
          this.dateResult = true;
          this.attendance_list = response.data;
          console.log(response);
        }
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    );
  }

  downloadPdf() {
    if (this.date) {
      this.downloadPdfByDate()
    }
    else if (this.member_id && this.bsRangeValue) {
      this.downloadPdfByMember()
    }
  }

  downloadPdfByDate() {
    this.spinner.show();
    let date = moment(this.date).format('YYYY-MM-DD');
    this.attendanceService.getAttendancePdfByDate(date).subscribe(
      (response) => {
        this.spinner.hide();
        var file = new Blob([response], { type: "application/pdf" });
        this.fileURL = URL.createObjectURL(file);
        window.open(this.fileURL, "_blank");
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    );
  }

  downloadPdfByMember() {
    this.spinner.show();
    let start_date = moment(this.bsRangeValue[0]).format('YYYY-MM-DD');
    let end_date = moment(this.bsRangeValue[1]).format('YYYY-MM-DD');
    this.attendanceService.getAttendancePdfByMember(this.member_id, start_date, end_date).subscribe(
      (response) => {
        this.spinner.hide();
        var file = new Blob([response], { type: "application/pdf" });
        this.fileURL = URL.createObjectURL(file);
        window.open(this.fileURL, "_blank");
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    );
  }

}
