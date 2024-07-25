import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GymListComponent } from './gym-list.component';
import { GymDetailsComponent } from './gym-details/gym-details.component';

const routes: Routes = [
  {path:':user_id', component: GymListComponent},
  {path:':user_id/details/:gym_id', component: GymDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymListRoutingModule { }
