import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExerciseService } from 'src/app/services/exercise.service';
import * as EXER from 'src/app/utils/exercise';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-form-exercise',
  templateUrl: './form-exercise.component.html',
  styleUrls: ['./form-exercise.component.scss'],
})
export class FormExerciseComponent implements OnInit {
  constructor(
    private exerciseService: ExerciseService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private enumService: EnumService
  ) { }

  model: any = {};

  bodyPart: any = [];

  targetArea: any = [];

  ngOnInit(): void {
    this.getBodyPart()
  }

  changeBodyPart() {
    this.model.target_area = '';
    this.enumService.getTargetAreaEnums(this.model.body_part).subscribe((res: any) => {
      if (res.success) {
        this.targetArea = []
        this.targetArea = res.data
      }
    })
  }

  getBodyPart() {
    this.enumService.getBodyPartEnums().subscribe((res: any) => {
      if (res.success) {
        this.bodyPart = []
        this.bodyPart = res.data
      }
    })
  }

  onSubmit() {
    this.spinner.show()
    this.exerciseService.addExercise(this.model).subscribe((res) => {
      this.spinner.hide()
      if (res.success) {
        this.toastr.success('Successfully added')
        this.router.navigate(['/exercise'])
      }
    }, err => {
      this.toastr.error(err.error.error)
    })
  }
}
