import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import csc from 'country-state-city';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  constructor(private memberService: MemberService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }
  model: any = {}
  loading = true

  gender_array: Array<Object> = [
    {
      name: 'Male',
      value: 'male',
    },
    {
      name: 'Female',
      value: 'female',
    },
    {
      name: 'Other',
      value: 'other',
    },
  ];

  fitness_goal_array: Array<Object> = [
    { name: 'Body Building', value: 'body_building' },
    { name: 'Weight Gain', value: 'weight_gain' },
    { name: 'Weight Loss', value: 'weight_loss' },
    { name: 'Fat Loss', value: 'fat_loss' },
    { name: 'Strength', value: 'strength' },
    { name: 'Muscle Building', value: 'muscle_building' },
    { name: 'Flexibility', value: 'flexibility' },
    { name: 'Firming and Toning', value: 'firming_and_toning' },
    { name: 'Aerobic Fitness', value: 'aerobic_fitness' },
    { name: 'Endurance Training', value: 'endurance_training' },
    { name: 'Nutrition', value: 'nutrition' },
    { name: 'Stay Fit and Healthy', value: 'stay_fit_and_healthy' },
    { name: 'Stay Fit', value: 'stay_fit' },
    { name: 'Stay Healthy', value: 'stay_healthy' },
  ];

  country_array: any = []
  state_array: any = [];
  city_array: any = [];
  param:any
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (param.id) {
        this.param = param
        this.loading = true;
        setTimeout(() => {
          if (this.loading) {
            this.spinner.show();
          }
        }, 500);
        this.getMember(param.id)
      }
    })
  }

  getMember(id) {
    this.memberService.getMemberById(id).subscribe((res) => {
      this.loading = false;
      this.spinner.hide()
      console.log(res)
      if (res.success) {
        this.model = res.data[0]
        console.log(this.model)

      }
    }, err => {
      this.loading = false;
      this.spinner.hide()
    })
  }


  countryChange(e) {
    if (this.state_array.length > 0) {
      this.state_array = [];
      this.model.state = '';
      this.model.city = '';
    }
    console.log(e.isoCode);
    this.state_array = csc.getStatesOfCountry(e.isoCode);
  }

  stateChange(e) {
    if (this.city_array.length > 0) {
      this.city_array = [];
      this.model.city = '';
    }
    this.city_array = csc.getCitiesOfState(e.countryCode, e.isoCode);
  }
}
