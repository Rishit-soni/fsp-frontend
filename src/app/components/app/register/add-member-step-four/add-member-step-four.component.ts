import { Component, OnInit } from '@angular/core'
import { DietChartService } from 'src/app/services/diet-chart.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { MemberService } from 'src/app/services/member.service'
import * as moment from 'moment'
import { NgForm } from '@angular/forms'
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-add-member-step-four',
  templateUrl: './add-member-step-four.component.html',
  styleUrls: ['./add-member-step-four.component.scss'],
})
export class AddMemberStepFourComponent implements OnInit {
  constructor(
    private dietChartService: DietChartService,
    private router: Router,
    private memberService: MemberService,
    private toastr: ToastrService,
    private enumService: EnumService
  ) {}
  package = false
  selectedDiet: any
  dietPlans = []
  model: any = {}

  categories: any = {
  }
  
durationSpec: any = {

  }

  package_list: any = {}
  session_id :any
  async ngOnInit() {
    let data: any = localStorage.getItem('_FSP_MEMBERSHIP_DATA');
    this.session_id = sessionStorage.getItem('id')
    await this.getWorkoutEnums()
      this.package_list = JSON.parse(data)
      if (this.package_list?.member_diet) {
      data = this.package_list.member_diet
      data = this.setDate(data);
      this.model = { ...this.model, ...data };
    }
    await this.getDietPlans()
  }

  getCategory(value){
    return this.categories[value]
  }

  getDuration(value){
    return this.durationSpec[value]
  }
  
    
  getWorkoutEnums() {
    this.enumService.getCatgoriesEnums().subscribe((res) => {
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
          else if(this.session_id){
            let index = this.dietPlans
            .map((ele) => {
              return ele.id
            })
            .indexOf(this.session_id)
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

  dietRadioIndex: any

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
        let data =  this.package_list.member_package
        if (!this.model.diet_start_date && data.package_start_date) {
          this.model.diet_start_date = new Date(data.package_start_date)
          this.changeStartDate()
        }
      }
    }
  }

  setDate(data){
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

  addDiet(){
    sessionStorage.setItem('url', location.pathname)
  }

  back(){
    this.model = this.setDate(this.model)
    this.package_list.member_diet = this.model
    localStorage.setItem('_FSP_MEMBERSHIP_DATA', JSON.stringify(this.package_list));
  }

  onSubmit(f: NgForm) {
    if (f.form.status != 'INVALID') {
      this.model = this.setDate(this.model)
      this.package_list.member_diet = this.model
      localStorage.setItem('_FSP_MEMBERSHIP_DATA', JSON.stringify(this.package_list));
      this.router.navigate(['/register/add-member/step-5'])
    }
  }
}
