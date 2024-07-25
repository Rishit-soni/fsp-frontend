import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/app/services/workout.service';
import { MemberService } from 'src/app/services/member.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-assign-workout',
  templateUrl: './assign-workout.component.html',
  styleUrls: ['./assign-workout.component.scss']
})
export class AssignWorkoutComponent implements OnInit {
  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private memberService: MemberService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private enumService: EnumService
  ) { }

  package = false
  workoutPlans = []
  selectedWorkout: any
  model: any = { member_id: '' }
  categories: any = {

  }

  durationSpec: any = {

  }
  package_list: any = {}
  param: any
  workoutRadioIndex: any
  url:any
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
      if (param.type && param.type == 'workout') {
        if (param.id) {
          this.getMembers()
          this.model.workout_id = param.id
        }
      }
    })
    await this.getWorkoutPlans()
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
  getWorkoutPlans() {
    this.workoutService.getWorkoutPlansForModel().subscribe(
      (response) => {
        if (response.success) {
          this.workoutPlans = JSON.parse(JSON.stringify(response.data))
          console.log(this.workoutPlans)
          if (this.model.workout_id) {
            let index = this.workoutPlans.map((ele) => { return ele.id }).indexOf(this.model.workout_id)
            this.package = true;
            this.selectedWorkout = JSON.parse(
              JSON.stringify(this.workoutPlans[index])
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

  member_list = []
  getMembers() {
    this.member_list = [{ name: 'Select Member', value: '' }]
    this.memberService.getMembersNameIdPair().subscribe(res => {
      if (res.success) {
        this.member_list = [...this.member_list, ...res.data]
      }
    })
  }



  changeWorkoutRadio(i, event) {
    if (event.target.checked) {
      this.workoutRadioIndex = i
    }
  }

  changeStartDate() {
    console.log('change')
    switch (this.selectedWorkout.duration_spec) {
      case 'days':
        this.model.workout_end_date = moment(this.model.workout_start_date)
          .add(this.selectedWorkout.duration - 1, 'days')
          .toDate()
        break
      case 'weeks':
        this.model.workout_end_date = moment(this.model.workout_start_date)
          .add((this.selectedWorkout.duration * 7) - 1, 'days')
          .toDate()
        break
      case 'months':
        this.model.workout_end_date = moment(this.model.workout_start_date)
          .add(this.selectedWorkout.duration, 'month').subtract(1, 'days')
          .toDate()
        break
      case 'years':
        this.model.workout_end_date = moment(this.model.workout_start_date)
          .add(this.selectedWorkout.duration, 'year').subtract(1, 'days')
          .toDate()
        break
    }

  }

  selectWorkout() {
    if (this.workoutRadioIndex != undefined) {
      this.package = true
      this.selectedWorkout = this.workoutPlans[this.workoutRadioIndex]
      this.model.workout_id = this.selectedWorkout.id
 /*      if (this.package_list.member_package) {
        let data = this.package_list.member_package
        if (!this.model.workout_start_date && data.package_start_date) {
          this.model.workout_start_date = new Date(data.package_start_date)
          this.changeStartDate()
        }
      } */
      this.workoutRadioIndex = undefined
    }
  }

  setDate(data) {
    if (data.workout_start_date) {
      data.workout_start_date = new Date(moment(data.workout_start_date).format('MM/DD/YYYY'))
    }
    if (data.workout_end_date) {
      data.workout_end_date = new Date(moment(data.workout_end_date).format('MM/DD/YYYY'))
    }
    return data
  }




  onSubmit(f: NgForm) {
    if (f.form.status != 'INVALID') {
      this.model = this.setDate(this.model)
      this.spinner.show()
      this.model = this.setDate(this.model);
      this.memberService.addMemberWorkout(this.model).subscribe((res) => {
        this.spinner.hide()
        if (res.success) {
          this.toastr.success('Workout is assigned successfully')
          this.router.navigate([this.url])
        }
      }, err => {
        this.spinner.hide()
        this.toastr.error(err.error.err)
      })

    }
  }
}
