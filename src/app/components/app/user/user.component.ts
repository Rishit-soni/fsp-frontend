import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  users = [];
  loading = true;

  async ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show();
      }
    }, 500);
    await this.getUsersList('');
  }

  getUsersList(search) {
    this.authService.getAllUsers(search).subscribe(
      (res) => {
        this.loading = false;
        this.spinner.hide();
        if (res.success) {
          this.users = res.data;
        }
      },
      (err) => {
        this.loading = false;
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  changeUserStatus(id, status, i) {
    this.authService.updateUserStatus(status, id).subscribe(
      (res) => {
        if (res.success) {
          this.toastr.success('User status is successfully chnaged');
          this.users[i] = res.data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  search(e){
    let  value = e.target.value
    this.getUsersList(value)
  }
}
