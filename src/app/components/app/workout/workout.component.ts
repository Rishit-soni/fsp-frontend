import { Component, OnInit } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { WorkoutService } from 'src/app/services/workout.service'
import { Router } from '@angular/router';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit {
  categories: Object = {
  }

  constructor(private workoutService: WorkoutService, private spinner: NgxSpinnerService, private router: Router, private enumService: EnumService) { }

  workoutPlans: any = []
  tempWorkoutPlans: any = []
  loading = true
  async ngOnInit() {
    sessionStorage.setItem('url', '')
    await this.getCategories()
    this.loading = true;
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show();
      }
    }, 500);

    await this.getWorkoutPlans('')
  }

  savePath() {
    sessionStorage.setItem('url', location.pathname)
  }

  getCategories() {
    this.enumService.getCatgoriesEnums().subscribe((res) => {
      if (res.success) {
        this.categories = {}
        console.log(res)
        for (let ele of res.data) {
          this.categories[`${ele.value}`] = ele.name
        }
        console.log(this.categories)
      }
    })
  }

  getWorkoutPlans(search) {
    this.workoutService.getWorkoutPlans(search).subscribe(
      (response) => {
        this.loading = false
        this.spinner.hide()
        if (response.success) {
          this.workoutPlans = JSON.parse(JSON.stringify(response.data))
          this.tempWorkoutPlans = response.data
        }
      },
      (err) => {
        this.loading = false
        this.spinner.hide()
        console.log(err)
      }
    )
  }

  getCategoryName(key) {
    return this.categories[key]
  }

  search(e) {
    let value = e.target.value
    this.getWorkoutPlans(value)
  }

  editWorkout(id) {
    this.router.navigate([`/workout/edit/${id}`])
  }
}
