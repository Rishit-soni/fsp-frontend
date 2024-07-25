import { Component, OnInit } from '@angular/core'
import { MeasurementService } from 'src/app/services/measurement.service'
import { Router } from '@angular/router'
import { MemberService } from 'src/app/services/member.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-form-measurement',
  templateUrl: './form-measurement.component.html',
  styleUrls: ['./form-measurement.component.scss'],
})
export class FormMeasurementComponent implements OnInit {
  constructor(
    private measurementservice: MeasurementService,
    private memberService: MemberService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  model: any = {
    member_name: '',
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
    member_id: '',
  }

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
  }

  async ngOnInit() {
    await this.getMembers()
  }

  members_list = [{name:'Select Member', value:''}]

  getMembers() {
    this.memberService.getMembers('').subscribe(
      (response) => {
        console.log(response)
        if (response.success) {
          console.log(response.data)
          this.members_list = [{name:'Select Member', value:''}]
          for (let ele of response.data) {
            this.members_list.push({
              name: ele.first_name + ' ' + ele.last_name,
              value: ele.id,
            })
          }
        }
      },
      (err) => {
        console.log(err)
        this.toastr.error(err.error.error)
      }
    )
  }

  onSubmit() {
    this.spinner.show()
    let tempModel = JSON.parse(JSON.stringify(this.model))
    for (let key of Object.keys(this.unitModel)) {
      if (tempModel[key]) {
        tempModel[key] = tempModel[key] + ' ' + this.unitModel[key]
      }
    }
    console.log(tempModel)

    this.measurementservice.addMeasurement(tempModel).subscribe(
      (response) => {
        this.spinner.hide()
        if (response.success) {
          this.router.navigate(['/measurement'])
        }
      },
      (err) => {
        this.spinner.hide()
        console.log(err)
      }
    )
  }
}
