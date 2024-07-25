import { Component, OnInit } from '@angular/core';
import { DietChartService } from 'src/app/services/diet-chart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-assign-diet',
  templateUrl: './assign-diet.component.html',
  styleUrls: ['./assign-diet.component.scss']
})
export class AssignDietComponent implements OnInit {

  constructor(
    private dietChartService: DietChartService,
    private router: Router,
    private memberService: MemberService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private enumService: EnumService
  ) { }
  package = false
  selectedDiet: any
  dietPlans = []
  model: any = { member_id : ''}

  categories: any = {

  }

  durationSpec: any = {
 
  }

  package_list: any = {}
  dietRadioIndex: any
  param: any
  url: any
  async ngOnInit() {
    this.url = sessionStorage.getItem('url')
    await this.getWorkoutEnums()
    this.route.params.subscribe((param) => {
      this.param = param
      if (param.type && param.type == 'member') {
        if (param.id) {
          this.getMember(param.id)
        }
      }
      if (param.type && param.type == 'diet') {
        if (param.id) {
          this.getMembers()
          this.model.diet_id = param.id
        }
      }
    })
    await this.getDietPlans()
  }

  getCategory(value) {
    return this.categories[value]
  }

  getDuration(value) {
    return this.durationSpec[value]
  }

  getWorkoutEnums() {
    this.enumService.getWorkoutEnums().subscribe((res) => {
      if (res.success) {
        this.categories = {}
        this.durationSpec = {}
        for (let ele of res.data.categories) {
          this.categories[`${ele.value}`] = ele.name
        }
        for (let ele of res.data.duration) {
          this.durationSpec[`${ele.value}`] = ele.name
        }
      }
    })
  }

  getDietPlans() {
    this.dietChartService.getDietPlansForModel().subscribe(
      (response) => {
        if (response.success) {
          console.log(response)
          this.dietPlans = JSON.parse(JSON.stringify(response.data))
          if (this.model.diet_id) {
            let index = this.dietPlans
              .map((ele) => {
                return ele.id
              })
              .indexOf(this.model.diet_id)
            this.package = true
            this.selectedDiet = JSON.parse(
              JSON.stringify(this.dietPlans[index])
            )
          }
        }
      },
      (err) => {
        console.log(err)
      }
    )
  }

  member_name = ''
  getMember(id) {
    this.memberService.getMemberById(id).subscribe((res) => {
      if (res.success) {
        if (res.data) {
          this.model.member_id = id
          this.member_name = res.data[0].first_name + ' ' + res.data[0].last_name
        }
      }
    })
  }


  members_list = []
  getMembers() {
    this.members_list = [{ name: 'Select Member', value: '' }]
    this.memberService.getMembersNameIdPair().subscribe(res => {
      if (res.success) {
        this.members_list = [...this.members_list, ...res.data]
      }
    })
  }


  changeDietRadio(i, event) {
    console.log(i, event.target.checked)
    if (event.target.checked) {
      this.dietRadioIndex = i
    }
  }

  changeStartDate() {
    switch (this.selectedDiet.duration_spec) {
      case 'days':
        this.model.diet_end_date = moment(this.model.diet_start_date)
          .add(this.selectedDiet.duration - 1, 'days')
          .toDate()
        break
      case 'weeks':
        this.model.diet_end_date = moment(this.model.diet_start_date)
          .add((this.selectedDiet.duration * 7) - 1, 'days')
          .toDate()
        break
      case 'months':
        this.model.diet_end_date = moment(this.model.diet_start_date)
          .add(this.selectedDiet.duration, 'month').subtract(1, 'days')
          .toDate()
        break
      case 'years':
        this.model.diet_end_date = moment(this.model.diet_start_date)
          .add(this.selectedDiet.duration, 'year').subtract(1, 'days')
          .toDate()
        break
    }
  }

  selectDiet() {
    console.log('seleeect', this.dietRadioIndex)
    if (this.dietRadioIndex != undefined) {
      this.package = true
      this.selectedDiet = this.dietPlans[this.dietRadioIndex]
      this.model.diet_id = this.selectedDiet.id
      this.dietRadioIndex = undefined
      if (this.package_list.member_package) {
        let data = this.package_list.member_package
        if (!this.model.diet_start_date && data.package_start_date) {
          this.model.diet_start_date = new Date(data.package_start_date)
          this.changeStartDate()
        }
      }
    }
  }

  setDate(data) {
    if (data.diet_start_date) {
      data.diet_start_date = new Date(
        moment(data.diet_start_date).format('MM/DD/YYYY')
      )
    }
    if (data.diet_end_date) {
      data.diet_end_date = new Date(
        moment(data.diet_end_date).format('MM/DD/YYYY')
      )
    }
    return data
  }

  onSubmit(f: NgForm) {
    if (f.form.status != 'INVALID') {
      this.model = this.setDate(this.model)
      this.spinner.show()
      this.model = this.setDate(this.model);
      this.memberService.addMemberDiet(this.model).subscribe((res) => {
        this.spinner.hide()
        if (res.success) {
          this.toastr.success('Diet is assigned successfully')
          this.router.navigate([this.url])
        }
      }, err => {
        this.spinner.hide()
        this.toastr.error(err.error.err)
      })

    }
  }

}
