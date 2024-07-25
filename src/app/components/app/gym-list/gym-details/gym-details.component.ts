import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GymProfileService } from 'src/app/services/gym-profile.service';
import csc from 'country-state-city';

@Component({
  selector: 'app-gym-details',
  templateUrl: './gym-details.component.html',
  styleUrls: ['./gym-details.component.scss']
})
export class GymDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private gymProfileService: GymProfileService) { }

  param: any
  model: any
  country_array: any = csc.getAllCountries();
  state_array: any = [];
  city_array: any = [];
  locality_array: any = []
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.param = param
      if (param.user_id && param.gym_id) {
        this.getGymById(param.gym_id)
      }
    })
  }

  getGymById(id) {
    this.gymProfileService.getGymProfile(id).subscribe((res) => {
      if (res.success) {
        this.model = res.data
      }
    })
  }

  countryChange(e) {
    if (this.state_array.length > 0) {
      this.state_array = [];
      this.model.gym_state = '';
      this.model.gym_city = '';
    }
    this.state_array = csc.getStatesOfCountry(e.isoCode);
  }

  stateChange(e) {
    if (this.city_array.length > 0) {
      this.city_array = [];
      this.model.gym_city = '';
    }
    this.city_array = csc.getCitiesOfState(e.countryCode, e.isoCode);
  }

  changePincode() {
    if (this.model.gym_pincode.length == 6) {
      this.locality_array = []
      this.gymProfileService.getLocality(this.model.gym_pincode).subscribe((res) => {
        res = res[0]
        console.log(res)
        if (res.Status == 'Success') {
          let data = res.PostOffice

          for (let ele of data) {
            this.locality_array = [...this.locality_array, { name: ele.Name }]
          }
          console.log(this.locality_array)
        }
        else {

        }
      }, err => {

      })
    }
  }

}
