import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MemberService } from '../../../../services/member.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-member-step-five',
  templateUrl: './add-member-step-five.component.html',
  styleUrls: ['./add-member-step-five.component.scss'],
})
export class AddMemberStepFiveComponent implements OnInit {
  model: any = {
    date: '',
    bmi: '',
    smm: '',
    bfp: '',
    bfm: '',
    weight: '',
    height: '',
    shoulder: '',
    chest: '',
    bust: '',
    midriff: '',
    abdomen: '',
    waist: '',
    upper_arm: '',
    fore_arm: '',
    hips: '',
    upper_thigh: '',
    buttocks: '',
    mid_thigh: '',
    lower_thigh: '',
    member_id: null,
  };

  unitModel: any = {
    weight: 'kg',
    height: 'cm',
    shoulder: 'cm',
    chest: 'cm',
    bust: 'cm',
    midriff: 'cm',
    abdomen: 'cm',
    waist: 'cm',
    upper_arm: 'cm',
    fore_arm: 'cm',
    hips: 'cm',
    upper_thigh: 'cm',
    buttocks: 'cm',
    mid_thigh: 'cm',
    lower_thigh: 'cm',
  };

  constructor(
    private router: Router,
    private memberService: MemberService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }


  ngOnInit(): void {
  

   let data:any = localStorage.getItem('_FSP_MEASUREMENT_DATA')
    if(data){
      data = JSON.parse(data);
      this.model = data.measurement
      this.model.date = new Date(moment(this.model.date).format('MM-DD-YYYY'))
      this.unitModel = data.unit
    }
    else{
     data = JSON.parse(localStorage.getItem('_FSP_MEMBERSHIP_DATA'));
      data = data?.member_package
      if (data ?.package_start_date) {
        this.model.date = new Date(moment(data.package_start_date).format('MM-DD-YYYY'))
      } else {
        this.model.date = new Date(moment().format('MM-DD-YYYY'))
      }
    }
  }

  storeInLocalStorage(){
    let data = {
      measurement: this.model,
      unit: this.unitModel
    }
    localStorage.setItem('_FSP_MEASUREMENT_DATA', JSON.stringify(data))
  }

  onSubmit() {
    this.spinner.show();
    let addMeasure = false;
    let tempModel = JSON.parse(JSON.stringify(this.model));
    for (let key of Object.keys(this.unitModel)) {
      if (tempModel[key]) {
        tempModel[key] = tempModel[key] + ' ' + this.unitModel[key];
        addMeasure = true;
      }
    }
    if (tempModel['bmi'] || tempModel['smm'] || tempModel['bfp'] || tempModel['bfm']) {
      addMeasure = true
    }
    if (addMeasure) {
      if (!tempModel.date) {
        this.toastr.error('Date is required');
        this.spinner.hide()
        return;
      }
    }

    let localStore = localStorage.getItem('_FSP_MEMBER_DATA');
    let member;
    try {
      member = JSON.parse(localStore);
    } catch (e) {
      this.spinner.hide();
    }

    this.memberService.addMember(member).subscribe(
      (res: any) => {
        this.spinner.hide()
        if (res.success) {
          let member = res.data;
          
          let localStore: any = localStorage.getItem('_FSP_MEMBERSHIP_DATA');

          if (localStore && member) {
            localStore = JSON.parse(localStore);
            localStore.member_id = member.id;
            if (addMeasure) {
              this.spinner.show()
              this.memberService.addMemberPackageDetails(localStore).subscribe(
                (response: any) => {
                  this.spinner.hide()
                  if (response.success) {
                    this.model.member_id = member.id;
                    this.spinner.show()
                    this.memberService.addMeasurement(this.model).subscribe(
                      (response: any) => {
                        this.spinner.hide();
                        if (response.success) {
                          localStorage.removeItem('_FSP_MEMBER_DATA');
                          localStorage.removeItem('_FSP_MEMBERSHIP_DATA');
                          localStorage.removeItem('_FSP_MEASUREMENT_DATA')
                          this.toastr.success(
                            'Registered successfully',
                            'Success'
                          );
                          this.router.navigate(['/register']);
                        }
                      },
                      (err) => {
                        this.spinner.hide();
                        this.toastr.error(err.error.error.message, 'Error');
                      }
                    );
                  } else {
                    this.spinner.hide();
                  }
                },
                (err) => {
                  this.spinner.hide();
                  this.toastr.error(err.error.error.message, 'Error');
                }
              );
            } else {
              this.memberService
                .addMemberPackageDetails(localStore)
                .subscribe((response: any) => {
                  this.spinner.hide();
                  if (response.success) {
                    localStorage.removeItem('_FSP_MEMBER_DATA');
                    localStorage.removeItem('_FSP_MEMBERSHIP_DATA');
                    localStorage.removeItem('_FSP_MEASUREMENT_DATA')
                    this.toastr.success(
                      'Registered successfully',
                      'Success')

                    this.router.navigate(['/register']);
                  }
                }, (err) => {
                  this.spinner.hide();
                  this.toastr.error(err.error.error.message, 'Error');
                }
                );
            }
          }
        }
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.error.message, 'Error');
      }
    );
  }
}
