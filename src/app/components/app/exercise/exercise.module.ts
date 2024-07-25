import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExerciseRoutingModule } from './exercise-routing.module';
import { ExerciseComponent } from './exercise.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormExerciseComponent } from './form-exercise/form-exercise.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ExerciseComponent, FormExerciseComponent],
  imports: [
    CommonModule,
    ExerciseRoutingModule,
    NgxSpinnerModule,
    NgSelectModule,
    FormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ExerciseModule { }
