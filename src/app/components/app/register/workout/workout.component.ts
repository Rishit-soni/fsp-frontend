import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/app/services/workout.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  constructor(private workoutService: WorkoutService, private memberService: MemberService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  loading = true
  workout_list:any = []
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
        this.getWorkout(param.id)
      }
    })
  }

  getWorkout(id) {
    this.workoutService.getWorkoutPlanByMemberId(id).subscribe((res) => {
      this.loading = false;
      this.spinner.hide()
      console.log(res)
      if (res.success) {
        this.workout_list = res.data
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
