import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/services/exercise.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { getAllExercises } from 'src/app/utils/exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {
  constructor(
    private exerciseService: ExerciseService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  bodyPart: any = {
    abdominal: 'Abdominal',
    arms: 'Arms',
    back: 'Back',
    chest: 'Chest',
    legs: 'Legs',
    shoulders: 'Shoulders',
  };

  targetArea: any = {
    abs: 'ABS',
    biceps: 'Biceps',
    forearm: 'Forearm',
    triceps: 'Triceps',
    lower_back: 'Lower Back',
    middle_back: 'Middle Back',
    chest: 'Chest',
    calves: 'Calves',
    glute: 'Glute',
    hamstrings: 'Hamstrings',
    quads: 'Quads',
    lats: 'Lats',
    neck: 'Neck',
    shoulders: 'Shoulders',
    traps: 'Traps',
  };

  loading = true;
  async ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show();
      }
    }, 500);
    await this.getExercise();
  }

  exercise_list = [];
  tempExercise_list = []
  getExercise() {
    this.exerciseService.getExercise().subscribe(
      (response) => {
        this.loading = false;
        this.spinner.hide();
        if (response.success) {
          this.exercise_list = response.data;
          this.tempExercise_list = JSON.parse(JSON.stringify(this.exercise_list))
        }
      },
      (err) => {
        console.log(err);
        this.loading = false;
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    );
  }

  getBodyPart(value) {
    return this.bodyPart[value];
  }

  getTargetArea(value) {
    return this.targetArea[value]
  }

  search(text) {
    if (!text) {
      this.tempExercise_list = JSON.parse(JSON.stringify(this.exercise_list))
      return
    }
    this.tempExercise_list = []
    text = text.toLowerCase()
    for (let ele of this.exercise_list) {
      if (ele.target_area.toLowerCase().includes(text)) {
        this.tempExercise_list.push(ele)
      }
      else if (ele.body_part.toLowerCase().includes(text)) {
        this.tempExercise_list.push(ele)
      }
      else if (ele.exercise_name.toLowerCase().includes(text)) {
        this.tempExercise_list.push(ele)
      }
    }
  }
}
