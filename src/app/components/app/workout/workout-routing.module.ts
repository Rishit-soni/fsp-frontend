import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutComponent } from './workout.component';
import { FormWorkoutComponent } from './form-workout/form-workout.component';
import { WorkoutExpirationComponent } from './workout-expiration/workout-expiration.component';
import { AssignWorkoutComponent } from './assign-workout/assign-workout.component';

const routes: Routes = [
  {path:'', component: WorkoutComponent},
  { path: 'add-workout', component: FormWorkoutComponent},
  {path: 'expiration', component: WorkoutExpirationComponent},
  { path: 'edit/:edit_id', component: FormWorkoutComponent},
  { path: 'view/:view_id', component: FormWorkoutComponent},
  { path: 'assign-workout/:type/:id', component: AssignWorkoutComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutRoutingModule { }
