import { Component, OnInit } from '@angular/core';
import { InquiryService } from 'src/app/services/inquiry.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss']
})
export class FollowUpComponent implements OnInit {

  constructor(private inquiryService: InquiryService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  followup_list = [];
  loading = true;
  fitness_goal_array = {
    body_building: 'Body Building',
    weight_gain: 'Weight Gain',
    weight_loss: 'Weight Loss',
    fat_loss: 'Fat Loss',
    strength: 'Strength',
    muscle_building: 'Muscle Building',
    flexibility: 'Flexibility',
    firming_and_toning: 'Firming and Toning',
    aerobic_fitness: 'Aerobic Fitness',
    endurance_training: 'Endurance Training',
    nutrition: 'Nutrition',
    stay_fit_and_healthy: 'Stay Fit and Healthy',
    stay_fit: 'Stay Fit',
    stay_healthy: 'Stay Healthy',
  };

  async ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show();
      }
    }, 500);

    await this.getFollowUp('');
  }

  getFollowUp(search){
    this.inquiryService.getFollowUps(search).subscribe(
      (res) => {
        this.loading = false;
        this.spinner.hide();
        if (res.success) {
          this.followup_list = res.data;
        }
      },
      (err) => {
        this.loading = false;
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    );
  }
 
  getFitnessGoal(goal) {
    return this.fitness_goal_array[`${goal}`]
  }
  
  search(e) {
    let value = e.target.value;
    this.getFollowUp(value);
  }

}
