import { Component, OnInit } from '@angular/core'
import { WorkoutService } from 'src/app/services/workout.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { MemberService } from 'src/app/services/member.service'
import * as moment from 'moment'
import { NgForm } from '@angular/forms';
import { EnumService } from 'src/app/services/enum.service';
@Component({
  selector: 'app-add-member-step-three',
  templateUrl: './add-member-step-three.component.html',
  styleUrls: ['./add-member-step-three.component.scss'],
})
export class AddMemberStepThreeComponent implements OnInit {
  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private memberService: MemberService,
    private toastr: ToastrService,
    private enumService: EnumService
  ) { }

  package = false
  workoutPlans = []
  selectedWorkout: any
  model: any = {}
  categories: any = {
  }
  

  durationSpec: any = {
  }
  package_list: any = {}
  session_id: any
  async ngOnInit() {
    let data: any = localStorage.getItem('_FSP_MEMBERSHIP_DATA');
    this.session_id = sessionStorage.getItem('id')
    this.package_list = JSON.parse(data)
   await this.getWorkoutEnums()
    if (this.package_list ?.member_workout) {
      data = this.package_list.member_workout
      data = this.setDate(data);
      this.model = { ...this.model, ...data };
    }
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
            this.package = true
            this.selectedWorkout = JSON.parse(
              JSON.stringify(this.workoutPlans[index])
            )
          } else if (this.session_id) {
            let index = this.workoutPlans.map((ele) => { return ele.id }).indexOf(this.session_id)
            this.package = true
            this.selectedWorkout = JSON.parse(
              JSON.stringify(this.workoutPlans[index])
            )
            sessionStorage.setItem('id','')
          }
        }
      },
      (err) => {
        console.log(err)
      }
    )
  }

  workoutRadioIndex: any

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

      if (this.package_list.member_package) {
        let data = this.package_list.member_package
        if (!this.model.workout_start_date && data.package_start_date) {
          this.model.workout_start_date = new Date(data.package_start_date)
          this.changeStartDate()
        }
      }
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


  addWorkout() {
    sessionStorage.setItem('url', location.pathname)
  }

  back(){
    this.model = this.setDate(this.model)
    this.package_list.member_workout = this.model
    localStorage.setItem('_FSP_MEMBERSHIP_DATA', JSON.stringify(this.package_list));
  }

  onSubmit(f: NgForm) {
    if (f.form.status != 'INVALID') {
      this.model = this.setDate(this.model)
      this.package_list.member_workout = this.model
      localStorage.setItem('_FSP_MEMBERSHIP_DATA', JSON.stringify(this.package_list));
      this.router.navigate(['/register/add-member/step-4'])
    }
  }
}
