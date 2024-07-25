import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DietChartService } from 'src/app/services/diet-chart.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EnumService } from 'src/app/services/enum.service';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-diet-chart',
  templateUrl: './diet-chart.component.html',
  styleUrls: ['./diet-chart.component.scss'],
})
export class DietChartComponent implements OnInit {
/*   categories: Object = {
    body_building: 'Body Building',
    weight_gain: 'Weight Gain',
    weight_loss: 'Weight Loss',
    fat_loss: 'Fat Loss',
    strength: 'Strength',
    muscle_building: 'Muscle Building',
    flexibility: 'Flexibility',
    firming_and_toning: 'Firming And Toning',
    aerobic_fitness: 'Aerobic Fitness',
    endurance_training: 'Endurance Training',
    nutrition: 'Nutrition',
    stay_fit_and_healthy: 'Stay Fit and Healthy',
    stay_fit: 'Stay Fit',
    stay_healthy: 'Stay Healthy',
  }; */

  categories: Object = {}
  constructor(
    private dietChartService: DietChartService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private enumService: EnumService
  ) {}

  dietPlans: any = [];
  tempDietPlans: any = [];
  loading = true
  async ngOnInit() {
    sessionStorage.setItem('url', '')
    await this.getCategories()
    this.loading = true;
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show();
      }
    }, 500);
    await this.getDietPlans('');
    
  }

  savePath(){
    sessionStorage.setItem('url', location.pathname)
  }

  getCategories() {
    this.enumService.getCatgoriesEnums().subscribe((res) => {
      if (res.success) {
        this.categories = {}
        for (let ele of res.data) {
          this.categories[`${ele.value}`] = ele.name
        }
        console.log(this.categories)
      }
    })
  }

  getDietPlans(search) {
    this.dietChartService.getDietPlans(search).subscribe(
      (response) => {
        this.loading = false;
        this.spinner.hide();
        if (response.success) {
          console.log(response);
          this.dietPlans = JSON.parse(JSON.stringify(response.data));
          this.tempDietPlans = response.data;
        }
      },
      (err) => {
        console.log(err);
        this.loading = false;
        this.spinner.hide();
      }
    );
  }

  getCategoryName(key) {
    return this.categories[key];
  }

  search(e) {
    let value = e.target.value.toLowerCase();
    this.getDietPlans(value);
  }

  editDiet(id) {
    this.router.navigate([`/diet-chart/edit/${id}`]);
  }
}
