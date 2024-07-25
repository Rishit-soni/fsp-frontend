import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MembershipPackageService } from 'src/app/services/membership-package.service';
import { Router } from '@angular/router';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-membership-package',
  templateUrl: './membership-package.component.html',
  styleUrls: ['./membership-package.component.scss'],
})
export class MembershipPackageComponent implements OnInit {
  constructor(
    private membershipService: MembershipPackageService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private enumService: EnumService
  ) {}

  memberships: any = [];
  tempMemberShips: any = [];

  loading = true;
  membershipType = {
   
  };

  async ngOnInit() {
    this.loading = true;
    await this.getMembershipType()
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show();
      }
    }, 500);
    await this.getMemberships('');
  }

  
  getMembershipType() {
    this.enumService.getMembershipTypeEnums().subscribe((res) => {
      if (res.success) {
        this.membershipType = {}
        console.log(res)
        for (let ele of res.data) {
          this.membershipType[`${ele.value}`] = ele.name
        }
      }
    })
  }

  savePath(){
    sessionStorage.setItem('url', location.pathname)
  }
  
  getMemberships(search) {
    this.membershipService.getMembershipPackages(search).subscribe(
      (response: any) => {
        this.loading = false;
        this.spinner.hide();
        if (response.success) {
          console.log(response.data);
          this.memberships = response.data;
          this.tempMemberShips = JSON.parse(JSON.stringify(response.data));
        }
      },
      (err) => {
        this.loading = false;
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  getMembershipTypeName(key) {
    return this.membershipType[key];
  }

  search(e) {
    let value = e.target.value
    this.getMemberships(value)
  }

  editMemberShip(id){
    this.router.navigate([`/membership-package/edit/${id}`])
  }
}
