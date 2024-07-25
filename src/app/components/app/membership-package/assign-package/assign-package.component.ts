import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MembershipPackageService } from 'src/app/services/membership-package.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-assign-package',
  templateUrl: './assign-package.component.html',
  styleUrls: ['./assign-package.component.scss']
})
export class AssignPackageComponent implements OnInit {

  package = false;
  memberships = [];
  selectedPackage: any;

  model: any = {
    member_id: '',
    total_amount: 0,
    paid_amount: 0,
    pending_amount: 0,
    total_paid_amount: 0,
    payment_method: 'cash',
    referance_no: '',
    package_id: null,
  };

  payment_method_array = [
  ];
  constructor(
    private membershipService: MembershipPackageService,
    private router: Router,
    private memberService: MemberService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private enumService: EnumService
  ) { }

  membershipType = {
 
  };

  param: any
  url: any
  async ngOnInit() {
    this.url = sessionStorage.getItem('url')
    this.getMembershipEnums()
    this.route.params.subscribe((param) => {
      this.param = param
      if (param.type && param.type == 'member') {
        if (param.id) {
          this.getMember(param.id)
        }
      }
      if (param.type && param.type == 'member-package') {
        if (param.id) {
          this.getMembers()
          this.model.package_id = param.id
        }
      }
    })
    await this.getMemberships();

    this.model.payment_method = this.payment_method_array[0].value;
  }

  member_name = ''
  getMember(id) {
    this.memberService.getMemberById(id).subscribe((res) => {
      if (res.success) {
        if (res.data) {
          this.model.member_id = id
          this.member_name = res.data[0].first_name + ' ' + res.data[0].last_name
        }
      }
    })
  }


  member_list = []
  getMembers() {
    this.member_list = [{ name: 'Select Member', value: '' }]
    this.memberService.getMembersNameIdPair().subscribe(res => {
      if (res.success) {
        this.member_list = [...this.member_list, ...res.data]
      }
    })
  }

  getMembershipEnums(){
    this.enumService.getMembershipEnums().subscribe((res)=>{
      if(res.success){
        console.log(res.data)
        this.payment_method_array = res.data.payment_method
        this.membershipType = {}
        console.log(res)
        for (let ele of res.data.membership_type) {
          this.membershipType[`${ele.value}`] = ele.name
        }
      }
    })
  }

  getMemberships() {
    this.membershipService.getMembershipPackagesForModel().subscribe(
      (response: any) => {
        if (response.success) {
          this.memberships = response.data;
          console.log(this.memberships);
          if (this.model.package_id) {
            let index = this.memberships
              .map((ele) => {
                return ele.id;
              })
              .indexOf(this.model.package_id);
            this.package = true;
            this.selectedPackage = JSON.parse(
              JSON.stringify(this.memberships[index])
            );
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  packageRadioIndex: any;

  changePackageRadio(i, event) {
    if (event.target.checked) {
      this.packageRadioIndex = i;
    }
  }

  changePaidAmount() {
    if (this.model.paid_amount != '') {
      this.model.pending_amount =
        this.model.total_amount - this.model.paid_amount;
    }
  }

  changeStartDate() {
    switch (this.selectedPackage.duration_spec) {
      case 'days':
        this.model.package_end_date = moment(this.model.package_start_date)
          .add(this.selectedPackage.duration - 1, 'days')
          .toDate();
        break;
      case 'weeks':
        this.model.package_end_date = moment(this.model.package_start_date)
          .add(this.selectedPackage.duration * 7 - 1, 'days')
          .toDate();
        break;
      case 'months':
        this.model.package_end_date = moment(this.model.package_start_date)
          .add(this.selectedPackage.duration, 'month')
          .subtract(1, 'days')
          .toDate();
        break;
      case 'years':
        this.model.package_end_date = moment(this.model.package_start_date)
          .add(this.selectedPackage.duration, 'year')
          .toDate();
        break;
    }

    switch (this.selectedPackage.offer_duration_spec) {
      case 'days':
        this.model.package_end_date = moment(this.model.package_end_date)
          .add(this.selectedPackage.offer_duration, 'days')
          .toDate();
        break;
      case 'weeks':
        this.model.package_end_date = moment(this.model.package_end_date)
          .add(this.selectedPackage.offer_duration * 7, 'days')
          .toDate();
        break;
      case 'months':
        this.model.package_end_date = moment(this.model.package_end_date)
          .add(this.selectedPackage.offer_duration, 'month')
          .toDate();
        break;
      case 'years':
        this.model.package_end_date = moment(this.model.package_end_date)
          .add(this.selectedPackage.offer_duration, 'year')
          .toDate();
        break;
    }

    this.changeEndDate();
  }

  changeEndDate() {
    let end_date = moment(this.model.package_end_date).format('YYYY-MM-DD');
    let start_date = moment(this.model.package_start_date).format('YYYY-MM-DD');
    this.model.session =
      moment(end_date, 'YYYY-MM-DD').diff(
        moment(start_date, 'YYYY-MM-DD'),
        'days'
      ) + 1;
  }

  selectPackage() {
    if (this.packageRadioIndex != undefined) {
      this.package = true;
      this.selectedPackage = JSON.parse(
        JSON.stringify(this.memberships[this.packageRadioIndex])
      );
      this.model.package_id = this.selectedPackage.id;
      this.model.total_amount = this.selectedPackage.total_amount;
      this.packageRadioIndex = undefined;
    }
  }

  setDate(data) {
    if (data.registration_date) {
      data.registration_date = new Date(
        moment(data.registration_date).format('MM/DD/YYYY')
      );
    }
    if (data.package_end_date) {
      data.package_end_date = new Date(
        moment(data.package_end_date).format('MM/DD/YYYY')
      );
    }
    if (data.package_start_date) {
      data.package_start_date = new Date(
        moment(data.package_start_date).format('MM/DD/YYYY')
      );
    }
    return data;
  }

  getMembershipType(value) {
    return this.membershipType[value]
  }

  onSubmit(f: NgForm) {
    if (f.form.status != 'INVALID') {
      this.model.total_paid_amount = this.model.paid_amount
      this.spinner.show()
      this.model = this.setDate(this.model);
      this.memberService.addMemberPackage(this.model).subscribe((res) => {
        this.spinner.hide()
        if (res.success) {
          this.toastr.success('Membership Package is assigned successfully')
          this.router.navigate([this.url])
        }
      }, err => {
        this.spinner.hide()
        this.toastr.error(err.error.err)
      })

    }
  }

}
