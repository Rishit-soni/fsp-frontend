import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseComponent } from './exercise.component';
import { FormExerciseComponent } from './form-exercise/form-exercise.component';

const routes: Routes = [
  { path: '', component: ExerciseComponent },
  { path: 'add', component: FormExerciseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciseRoutingModule {}
