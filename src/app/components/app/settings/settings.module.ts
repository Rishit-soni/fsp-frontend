import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SettingsRoutingModule } from './settings-routing.module'
import { GymListComponent } from './gym-list/gym-list.component'
import { AddGymComponent } from './add-gym/add-gym.component'
import { FormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select'
import { NgxSpinnerModule } from 'ngx-spinner'

@NgModule({
  declarations: [GymListComponent, AddGymComponent],
  imports: [CommonModule, SettingsRoutingModule, FormsModule, NgSelectModule, NgxSpinnerModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsModule {}
