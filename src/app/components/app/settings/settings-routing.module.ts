import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GymListComponent } from './gym-list/gym-list.component'
import { AddGymComponent } from './add-gym/add-gym.component'

const routes: Routes = [
  { path: 'gym-list', component: GymListComponent },
  { path: 'add-gym/basic-information', component: AddGymComponent },
  { path: 'edit-gym/basic-information/:id', component: AddGymComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
