import { Component, OnInit } from '@angular/core';
import { MembershipPackageService } from 'src/app/services/membership-package.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-form-membership',
  templateUrl: './form-membership.component.html',
  styleUrls: ['./form-membership.component.scss'],
})
export class FormMembershipComponent implements OnInit {
  constructor(
    private membershipSerice: MembershipPackageService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) { }

  model: any = {
    transferable: false,
    freezable: false,
  };

  duration_array = [
    { value: 'days', name: 'Days' },
    { value: 'weeks', name: 'Weeks' },
    { value: 'months', name: 'Months' },
    { value: 'years', name: 'Years' },
  ];

  boolean_array = [
    { value: true, name: 'Yes' },
    { value: false, name: 'No' },
  ];

  membership_array = [
    { name: 'Single', value: 'single' },
    { name: 'Couple', value: 'couple' },
    { name: 'Family', value: 'family' },
    { name: 'Group', value: 'group' },
    { name: 'Personal Training', value: 'personal_training' },
    { name: 'GPT', value: 'gpt' },
  ];

  editId: any;
  viewId: any;
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (param.edit_id) {
        this.editId = param.edit_id;
        this.getMembershipOnEdit(this.editId)
      } else if (param.view_id) {
        this.viewId = param.view_id;
        this.getMembershipOnEdit(this.viewId)
      }
    });
  }

  getMembershipOnEdit(id) {
    this.membershipSerice.getMembershipPackageById(id).subscribe((response) => {
      if (response.success) {
        this.model = response.data
        
      }
    })
  }

  reset() {
    this.model = {};
  }

  changeAmount() {
    if (this.model.amount && this.model.tax) {
      this.model.total_amount =
        this.model.amount + this.model.amount * this.model.tax * 0.01;
    } else {
      this.model.total_amount = this.model.amount;
    }
  }

  changeFreezable() {
    if (!this.model.freezable) {
      delete this.model.freezable_days;
      delete this.model.freezable_allowed;
    }
  }

  total_member_disabled = true;
  changeMembership() {
    switch (this.model.membership_type) {
      case 'single':
        this.model.total_member = 1;
        this.total_member_disabled = true;
        break;
      case 'couple':
        this.model.total_member = 2;
        this.total_member_disabled = true;
        break;
      case 'personal_training':
        this.model.total_member = 1;
        this.total_member_disabled = true;
        break;
      default:
        this.total_member_disabled = false;
    }
  }

  changeDuration() {
    this.model.total_duration =
      (this.model.duration || '') +
      ' ' +
      (this.model.duration_spec || '') +
      ' ' +
      (this.model.offer_duration || '') +
      ' ' +
      (this.model.offer_duration_spec || '');
  }

  changeOffer(e) {
    this.model.is_offer = e.target.checked;
    this.model.offer_duration = null
    delete this.model.offer_duration_spec
    this.model.total_duration =
      (this.model.duration || '') + ' ' + (this.model.duration_spec || '');
  }

  changeTax(e) {
    this.model.is_tax = e.target.checked;
    this.model.tax = null
    this.model.total_amount = this.model.amount;
  }

  onSubmit() {
    this.spinner.show();
    console.log(this.model);
    if (!this.editId) {
      this.membershipSerice.addMembershipPackage(this.model).subscribe(
        (res) => {
          this.spinner.hide();
          if (res.success) {
            this.toastr.success('Membership Package is added successfully');
            this.router.navigate(['/membership-package']);
          }
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err.error.error);
        }
      );
    }else{
      this.membershipSerice.updateMembershipPackageById(this.model, this.editId).subscribe(
        (res) => {
          this.spinner.hide();
          if (res.success) {
            this.toastr.success('Membership Package is updated successfully');
            this.router.navigate(['/membership-package']);
          }
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err.error.error);
        }
      );
    }
  }
}
