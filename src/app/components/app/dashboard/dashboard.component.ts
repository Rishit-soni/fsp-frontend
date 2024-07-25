import { Component, OnDestroy, OnInit } from "@angular/core";
import { MemberService } from "src/app/services/member.service";
import { ToastrService } from "ngx-toastr";
import { AttendanceService } from "src/app/services/attendance.service";
import * as moment from "moment";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DashboardService } from "src/app/services/dashboard.service";
import { ChartColor, ChartLabel } from "@rinminase/ng-charts";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  currentUser: any = {};

  // Profit Loss chart
  chartData = [{ data: [], label: "Expense" }, { data: [], label: 'Revenue' }];
  chartLabels: ChartLabel;
  chartOptions = {
    responsive: true,
  };
  chartColors: ChartColor = [
    {
      borderColor: "red",
      backgroundColor: "rgba(255,0,0,0.3)",
    },
    {
      borderColor: "green",
      backgroundColor: "rgba(20,255,0,0.3)",
    },
  ];
  chartLegend = true;
  chartPlugins = [];

  // Promotional Chart

  chartLabelsPromotional = [];
  chartDataPromotional = [];
  chartColorsPromotional = [{
    backgroundColor: [],
    borderColor: []
  }];


  // Product Selling

  chartOptionsPS = {
    responsive: true,
  };
  chartLabelsPS = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  chartLegendPS = true;
  chartPluginsPS = [];

  chartDataPS = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  loading = true;
  revenue = 0;
  task_list = [];
  attendance_list = [];
  expense = 0;
  pending_amount = 0;
  receival_amount = 0;
  new_members = 0;
  renew_members = 0;
  active_members = 0;
  inactive_members = 0;
  total_members = 0;
  expired_members = 0;
  constructor(
    private memberService: MemberService,
    private attendanceService: AttendanceService,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private dashboard: DashboardService
  ) { }

  async ngOnInit() {
    await this.auth.getMe();
    this.subscription = await this.auth.loggedInUser.subscribe(
      async (response: any) => {
        if (response) {
          this.currentUser = response.user;
          if (this.currentUser.is_active) {
            this.loading = true;
            setTimeout(() => {
              if (this.loading) {
                this.spinner.show();
              }
            }, 500);
            await this.getTask("");
            await this.getAttendance("");
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );

    await this.getRevenue("");
    await this.getExpense("");
    await this.getPendingReceivalPayment("");
    await this.getNewRenewMembers("");
    await this.getActiveInActiveMembers("");
    await this.getProfitLossChart("this-year");
    await this.getPromotionalChart("this-month");
    await this.getProductSellingChart("this-month");
  }

  getTask(search) {
    this.dashboard.getTask(search).subscribe(
      (response) => {
        this.loading = false;
        this.spinner.hide();
        if (response.success) {
          this.task_list = response.data;
        }
      },
      (err) => {
        this.loading = false;
        this.spinner.hide();
        console.log(err);
        this.toastr.error(err.error.error);
      }
    );
  }

  getAttendance(search) {
    this.loading = true;
    this.spinner.show();
    this.attendanceService
      .getMemberAttendance(search)
      .pipe(
        map((res) => {
          res.data.map((r) => {
            if (r.start_time && r.end_time) {
              r.diff_time = moment
                .utc(
                  moment(r.end_time, "HH:mm:ss").diff(
                    moment(r.start_time, "HH:mm:ss")
                  )
                )
                .format("HH:mm:ss");
            }
          });
          return res;
        })
      )
      .subscribe(
        (response: any) => {
          this.loading = false;
          this.spinner.hide();
          if (response.success) {
            console.log(response.data);
            this.attendance_list = response.data;
          }
        },
        (err) => {
          this.loading = false;
          this.spinner.hide();
          console.log(err);
          this.toastr.error(err.error.error);
        }
      );
  }

  startTimer(i, role) {
    let data: any
    if (role == 'member') {
      data = {
        member_id: this.attendance_list[i].member_id,
        role: role,
        date: moment(new Date()).format("YYYY/MM/DD"),
        start_time: moment().format("HH:mm:ss"),
      };
    }
    else if (role == 'employee') {
      data = {
        emp_id: this.attendance_list[i].emp_id,
        role: role,
        date: moment(new Date()).format("YYYY/MM/DD"),
        start_time: moment().format("HH:mm:ss"),
      };
    }
    this.attendanceService.addAttendance(data).subscribe(
      (response) => {
        if (response.success) {
          console.log(response.data);
          this.attendance_list[i] = {
            ...this.attendance_list[i],
            ...response.data,
          };
        }
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.error);
      }
    );
  }

  endTimer(i, role) {
    let data: any
    if (role == 'member') {
      data = {
        member_id: this.attendance_list[i].member_id,
        role: role,
        end_time: moment().format("HH:mm:ss"),
      };
    }
    else if (role == 'employee') {
      data = {
        emp_id: this.attendance_list[i].emp_id,
        role: role,
        end_time: moment().format("HH:mm:ss"),
      };
    }
    this.attendanceService
      .updateAttendance(data, this.attendance_list[i].id)
      .subscribe(
        (response) => {
          if (response.success) {
            response.data.diff_time = moment
              .utc(
                moment(response.data.end_time, "HH:mm:ss").diff(
                  moment(response.data.start_time, "HH:mm:ss")
                )
              )
              .format("HH:mm:ss");
            this.attendance_list[i] = {
              ...this.attendance_list[i],
              ...response.data,
            };
            console.log(this.attendance_list[i]);
          }
        },
        (err) => {
          console.log(err);
          this.toastr.error(err.error.error);
        }
      );
  }

  searchTask(e) {
    let text = e.target.value.toLowerCase();
    this.getTask(text);
  }

  searchAttendance(e) {
    let text = e.target.value.toLowerCase();
    this.getAttendance(text);
  }

  getRevenue(interval) {
    this.dashboard.getRevenue(interval).subscribe(
      (res) => {
        if (res.success) {
          this.revenue = res.data.sales + res.data.package;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getExpense(interval) {
    this.dashboard.getExpense(interval).subscribe(
      (res) => {
        if (res.success) {
          this.expense = res.data.expense + res.data.purchase;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getPendingReceivalPayment(interval) {
    this.dashboard.getPendingReceivalPayment(interval).subscribe(
      (res) => {
        if (res.success) {
          this.pending_amount = res.data.pending;
          this.receival_amount = res.data.receival;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getNewRenewMembers(interval) {
    this.dashboard.getNewRenewMembers(interval).subscribe(
      (res) => {
        if (res.success) {
          this.new_members = res.data.new;
          this.renew_members = res.data.renew;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getActiveInActiveMembers(interval) {
    this.dashboard.getActiveInActiveMembers(interval).subscribe(
      (res) => {
        if (res.success) {
          this.active_members = res.data.active;
          this.inactive_members = res.data.inactive;
          this.expired_members = res.data.expired;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getProfitLossChart(interval) {
    this.dashboard.getProfitLossChart(interval).subscribe((res) => {
      if (res.success) {
        let data = res.data;
        let labels = [];

        data.forEach((element) => {
          labels.push(element.month);

          if(element.expense != '0') {
            this.chartData[0].data.push(element.expense);
          } else {
            this.chartData[0].data.push(element.expense);
          }

          if(element.revenue != '0') {
            this.chartData[1].data.push(element.revenue);
          } else {
            this.chartData[1].data.push(element.revenue);
          }
        });

        console.log(this.chartData)

        this.chartLabels = labels;
      }
    });
  }

  getPromotionalChart(interval) {
    this.dashboard.getPromotionalChart(interval).subscribe((res) => {
      if (res.success) {
        let data = res.data;

        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            this.chartLabelsPromotional.push(key);
            this.chartDataPromotional.push(data[key]);

            let randomColor = Math.floor(Math.random() * 16777215).toString(16);
            this.chartColorsPromotional[0].backgroundColor.push("#" + randomColor);
            this.chartColorsPromotional[0].borderColor.push("#" + randomColor);
          }
        }
      }
    });
  }

  getProductSellingChart(interval) {
    this.dashboard.getPrductSellingChart(interval).subscribe((res) => {
      if (res.success) {
        console.log("getProductSellingChart -->", res.data);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
