import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as EXER from 'src/app/utils/exercise';
import { WorkoutService } from 'src/app/services/workout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExerciseService } from 'src/app/services/exercise.service';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: "app-form-workout",
  templateUrl: "./form-workout.component.html",
  styleUrls: ["./form-workout.component.scss"],
})
export class FormWorkoutComponent implements OnInit {
  days = [
    { name: "Monday", value: "monday", position: 0, isUsed: false },
    { name: "Tuesday", value: "tuesday", position: 1, isUsed: false },
    { name: "Wednesday", value: "wednesday", position: 2, isUsed: false },
    { name: "Thursday", value: "thursday", position: 3, isUsed: false },
    { name: "Friday", value: "friday", position: 4, isUsed: false },
    { name: "Saturday", value: "saturday", position: 5, isUsed: false },
    { name: "Sunday", value: "sunday", position: 6, isUsed: false },
  ];

  dayInner: any = {
    body_part: "",
    target_area: "",
    exercise_name: "",
    sets_size: 0,
    sets_desc: [],
    rest: "",
  };

  model: any = {
    workout_name: "",
    category: "",
    duration: 0,
    duration_spec: "days",
    workout_desc: "",
    exercise_array: [],
  };

  categories = [,
  ];

  durationSpec: any = [
  ];

  bodyPart: any = [
    { value: "abdominal", name: "Abdominal" },
    { value: "arms", name: "Arms" },
    { value: "back", name: "Back" },
    { value: "chest", name: "Chest" },
    { value: "legs", name: "Legs" },
    { value: "shoulders", name: "Shoulders" },
  ];

  sets: any = [
    { name: "1", value: 1 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 },
    { name: "6", value: 6 },
    { name: "7", value: 7 },
    { name: "8", value: 8 },
  ];

  targetArea: any;
  exercises: any;

  constructor(
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private enumService: EnumService
  ) { }

  editId: any;
  viewId: any;
  url: any;
  async ngOnInit() {
    this.getEnum()
    this.getBodyPart()
    this.getUrl();
    this.route.params.subscribe(async (param) => {
      if (param.edit_id) {
        this.editId = param.edit_id;
        await this.getWorkoutOnEdit(this.editId);
      } else if (param.view_id) {
        this.viewId = param.view_id;
        await this.getWorkoutOnEdit(this.viewId);
      }
    });
  }

  getUrl() {
    this.url = sessionStorage.getItem("url");
  }

  getEnum(){
    this.enumService.getWorkoutEnums().subscribe((res)=>{
      if(res.success){
        this.categories = res.data.categories
        this.durationSpec = res.data.duration
      }
    })
  }

  async  getWorkoutOnEdit(id) {
    await this.workoutService.getWorkoutPlanById(id).subscribe((response) => {
      if (response.success) {
        this.model = response.data;
        for (const key in this.model.exercise_array) {
          if (Object.prototype.hasOwnProperty.call(this.model.exercise_array, key)) {
            const element = this.model.exercise_array[key];
            for (const key_child in element.value) {
              if (Object.prototype.hasOwnProperty.call(element.value, key_child)) {
                this.setTargetArea(key, key_child);
                this.setExercise(key, key_child);
              }
            }
          }
        }

        for (let exer of this.model.exercise_array) {
          this.days.map((e) => {
            if (e.value == exer.day) {
              e.isUsed = true;
            }
          });
        }
      }
    });
  }


  getBodyPart() {
    this.enumService.getBodyPartEnums().subscribe((res: any) => {
      if (res.success) {
        this.bodyPart = []
        this.bodyPart = res.data
      }
    })
  }

  changeBodyPart(event, i, j) {
    this.model.exercise_array[i].value[j].target_area = "";
    this.model.exercise_array[i].value[j].exercise_name = "";
  }

  setTargetArea(i, j) {
    if (this.model.exercise_array[i].value[j].body_part == "") {
      this.targetArea = [];
    } else {
      this.enumService.getTargetAreaEnums(this.model.exercise_array[i].value[j].body_part).subscribe((res: any) => {
        if (res.success) {
          this.targetArea = []
          this.targetArea = res.data
        }
      })
    }
  }

  changeTargetArea(event, i, j) {
    this.model.exercise_array[i].value[j].exercise_name = "";
  }

  setExercise(i, j) {
    if (this.model.exercise_array[i].value[j].target_area == "") {
      this.exercises = [];
    } else {
      this.enumService.getExercisesEnums(this.model.exercise_array[i].value[j].target_area).subscribe((res: any) => {
        if (res.success) {
          this.exercises = []
          this.exercises = res.data
        }
      })
    }
  }

  changeBottomDaysCheckbox(daysIndex, event) {
    this.days[daysIndex].isUsed = event.target.checked;
    if (event.target.checked) {
      let tempObj = JSON.parse(JSON.stringify(this.dayInner));
      this.model.exercise_array.push({
        day: this.days[daysIndex].value,
        value: [tempObj],
      });
    } else {
      let index = this.model.exercise_array
        .map((e) => {
          return e.day;
        })
        .indexOf(this.days[daysIndex].value);
      this.model.exercise_array.splice(index, 1);
    }
  }

  changeTopDaysCheckbox(day, i, event) {
    if (!event.target.checked) {
      this.model.exercise_array.splice(i, 1);
      this.days.map((e) => {
        if (e.value == day) {
          e.isUsed = false;
        }
      });
    }
  }

  changeSets(i, j) {
    this.model.exercise_array[i].value[j].sets_desc = [];
    let size = this.model.exercise_array[i].value[j].sets_size;
    let tempArray = [];
    for (let n = 0; n < size; n++) {
      tempArray.push({ set: "" });
    }
    this.model.exercise_array[i].value[j].sets_desc = [...tempArray];
  }

  addInnerRow(i) {
    let tempObj = JSON.parse(JSON.stringify(this.dayInner));
    this.model.exercise_array[i].value.push(tempObj);
  }

  removeInnerRow(i, j) {
    if (this.model.exercise_array[i].value.length > 1) {
      this.model.exercise_array[i].value.splice(j, 1);
    } else {
      window.alert("You can not delete");
    }
  }

  onSubmit() {
    this.spinner.show();
    if (!this.editId) {
      this.workoutService.addWorkoutPlan(this.model).subscribe(
        (response) => {
          this.spinner.hide();
          if (response.success) {
            this.toastr.success("Workout is added successfully");
            if (this.url) {
              sessionStorage.setItem("id", response.data.id);
            }
            this.router.navigate([this.url ? this.url : "/workout"]);
          }
        },
        (err) => {
          this.spinner.hide();
          this.toastr.success(err.error.error);
        }
      );
    } else {
      this.workoutService
        .updateWorkoutPlanById(this.model, this.editId)
        .subscribe(
          (response: any) => {
            this.spinner.hide();
            if (response.success) {
              this.toastr.success("Workout is updated successfully");
              this.router.navigate(["/workout"]);
            }
          },
          (err) => {
            this.spinner.hide();
            this.toastr.success(err.error.error);
          }
        );
    }
  }
}
