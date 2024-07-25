import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  currentUser: any = {};

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {

    this.subscription = await this.auth.loggedInUser.subscribe(
      (response: any) => {
        if (response) {
          this.currentUser = response.user
          console.log('current', this.currentUser)
          // if (!this.currentUser.is_active) {
          //   this.router.navigate(['/dashboard'])
          // }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
