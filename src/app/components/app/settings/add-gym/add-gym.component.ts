import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import csc from 'country-state-city';
import { GymProfileService } from 'src/app/services/gym-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-gym',
  templateUrl: './add-gym.component.html',
  styleUrls: ['./add-gym.component.scss'],
})
export class AddGymComponent implements OnInit {
  currentUser: any = {};
  subscription: Subscription;
  model = {
    gym_name: '',
    gym_mobile_no: '',
    gym_phone_no: '',
    gym_email: '',
    gym_address: '',
    gym_pincode: '',
    gym_locality:'',
    gym_city: '',
    gym_state: '',
    gym_country: '',
  };

  country_array: any = csc.getAllCountries();
  state_array: any = [];
  city_array: any = [];
  editId;

  constructor(
    private auth: AuthService,
    private gymProfile: GymProfileService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit() {
    await this.auth.getMe();

    this.subscription = await this.auth.loggedInUser.subscribe(
      (response: any) => {
        if (response) {
          this.currentUser = response.user;
        }
      },
      (err) => {
        console.log(err);
      }
    );

    this.route.params.subscribe((param) => {
      if (param.id) {
        this.editId = param.id;
        this.gymProfile.getGymProfile(param.id).subscribe((res) => {
          if (res.success) {
            this.model = res.data;
            this.changePincode()
          }
        });
      }
    });
  }

  locality_array = []

  changePincode(){
    if(this.model.gym_pincode.length == 6){
      this.locality_array = []
    this.gymProfile.getLocality(this.model.gym_pincode).subscribe((res)=>{
      res = res[0]
      console.log(res)
        if(res.Status == 'Success'){
          let data = res.PostOffice
         
          for(let ele of data){
            this.locality_array = [...this.locality_array, {name: ele.Name}]
          }
          console.log( this.locality_array)
        }
        else{
          this.toastr.error('Enter valid pincode')
        }
    }, err =>{
      this.toastr.error('Enter valid pincode')
    })
  }
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

  onSubmit() {
    this.spinner.show();
    if (this.editId != undefined) {
      this.gymProfile.updateGymProfile(this.model, this.editId).subscribe(
        (response: any) => {
          this.spinner.hide();
          if (response.success) {
            this.toastr.success('Gym Profile is updated successfully');
            this.router.navigate(['/settings/gym-list']);
          }
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err.error.error);
          console.error(err);
        }
      );
    } else {
      this.gymProfile.saveStepOne(this.model).subscribe(
        (response: any) => {
          this.spinner.hide();
          if (response.success) {
            this.toastr.success('Gym Profile is added successfully');
            this.router.navigate(['/settings/gym-list']);
          }
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err.error.error);
          console.error(err);
        }
      );
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
