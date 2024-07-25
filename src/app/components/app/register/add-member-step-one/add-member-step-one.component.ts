import { Component, OnInit, ɵConsole } from "@angular/core";
import { Router } from "@angular/router";
import csc from "country-state-city";
import { MemberService } from "src/app/services/member.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { GymProfileService } from "src/app/services/gym-profile.service";
import { NgxSpinnerService } from "ngx-spinner";
import { EnumService } from 'src/app/services/enum.service';
@Component({
  selector: "app-add-member-step-one",
  templateUrl: "./add-member-step-one.component.html",
  styleUrls: ["./add-member-step-one.component.scss"],
})
export class AddMemberStepOneComponent implements OnInit {
  gender_array: Array<Object> = [
    {
      name: "Male",
      value: "male",
    },
    {
      name: "Female",
      value: "female",
    },
    {
      name: "Other",
      value: "other",
    },
  ];

  fitness_goal_array: Array<Object> = [];

  model: any = {};

  country_array: any = csc.getAllCountries();
  state_array: any = [];
  city_array: any = [];
  locality_array: any = [];
  checkMemberExits: boolean = true;

  constructor(
    private router: Router,
    private memberService: MemberService,
    private toastr: ToastrService,
    private gymProfile: GymProfileService,
    private spinner: NgxSpinnerService,
    private enumService: EnumService
  ) {}

  ngOnInit() {
    let data: any = localStorage.getItem("_FSP_MEMBER_DATA");
    this.getFitnessGoal()
    if (data) {
      data = JSON.parse(data);
      if (data.birth_date) {
        data.birth_date = new Date(
          moment(data.birth_date).format("MM/DD/YYYY")
        );
      }
      this.model = { ...this.model, ...data };
    }
  }

  getFitnessGoal(){
    this.enumService.getFitnessGoalEnums().subscribe((res)=>{
      if(res.success){
        this.fitness_goal_array = res.data
      }
    })
  }
  countryChange(e) {
    if (this.state_array.length > 0) {
      this.state_array = [];
      this.model.state = "";
      this.model.city = "";
    }
    console.log(e.isoCode);
    this.state_array = csc.getStatesOfCountry(e.isoCode);
  }

  stateChange(e) {
    if (this.city_array.length > 0) {
      this.city_array = [];
      this.model.city = "";
    }
    this.city_array = csc.getCitiesOfState(e.countryCode, e.isoCode);
  }

  changePincode() {
    if (this.model.pincode.length == 6) {
      this.locality_array = [];
      this.gymProfile.getLocality(this.model.pincode).subscribe(
        (res) => {
          res = res[0];
          console.log(res);
          if (res.Status == "Success") {
            let data = res.PostOffice;

            for (let ele of data) {
              this.locality_array = [
                ...this.locality_array,
                { name: ele.Name },
              ];
            }
            console.log(this.locality_array);
          } else {
            this.toastr.error("Enter valid pincode");
          }
        },
        (err) => {
          this.toastr.error("Enter valid pincode");
        }
      );
    }
  }

  checkContact(event) {
    this.spinner.show();
    let contact = event.target.value;
    this.checkMemberExits = false;
    this.memberService
      .checkMemberExistByNumber({ mobile_no: contact })
      .subscribe(
        (res: any) => {
          if (res.success && res.data) {
            this.model = res.data;
            this.model.fitness_goal = JSON.parse(this.model.fitness_goal);
          } else {
            this.model = {};
            this.model.mobile_no = contact
          }
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err.error.error.message, "Error");
        }
      );
  }

  onSubmit() {
    console.log(this.model.fitness_goal);

    if (this.model.birth_date) {
      this.model.birth_date = moment(this.model.birth_date).format(
        "YYYY/MM/DD"
      );
    }
    localStorage.setItem("_FSP_MEMBER_DATA", JSON.stringify(this.model));
    this.router.navigate(["/register/add-member/step-2"]);
  }
}
