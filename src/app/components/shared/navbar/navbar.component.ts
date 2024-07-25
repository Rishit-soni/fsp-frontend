import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'
import { GymProfileService } from 'src/app/services/gym-profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscription: Subscription
  currentUser: any = {}

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private gymProfileService: GymProfileService
  ) { }

  async ngOnInit() {
    await this.auth.getMe()

    this.subscription = await this.auth.loggedInUser.subscribe(
      (response: any) => {
        if (response) {
          this.currentUser = response.user
          this.getGymProfile()
          if (this.currentUser.role == 'owner') {
            this.getGymList()
          }
          
          if (
            !this.currentUser.is_active &&
            [
              '/dashboard',
              '/settings/gym-list',
              '/add-gym/basic-information',
              '/edit-gym/basic-information',
            ].indexOf(this.router.url) < 1
          ) {
            this.router.navigate(['/dashboard'])
          } else {
            console.log("I'm here")
          }
        }
      },
      (err) => {
        console.log(err)
      }
    )
  }

  logout() {
    this.auth.logout().subscribe(
      (response: any) => {
        if (response.success) {
          localStorage.removeItem('_fsp_front_app')
          this.router.navigate(['/'])
        }
      },
      (err) => {
        this.toastr.error(err.error.error, 'Error')
      }
    )
  }

  gym_list = []
  getGymList() {
    this.gymProfileService.getGymList().subscribe((res) => {
      if (res.success) {
        this.gym_list = res.data
      }
    })
  }

  gym_profile:any
  getGymProfile(){
    this.gymProfileService.getGymProfileByUserId().subscribe((res)=>{
      if(res.success){
        this.gym_profile = res.data
      }
    })
  }

  gym_radio_index = null
  companyRadioChange(i){
    this.gym_radio_index = i
  }

  switchGym() {
    if(this.gym_radio_index != null){
    this.gymProfileService.switchGym(this.gym_radio_index).subscribe((res) => {
      if (res.success) {
        if (this.auth.cookie('FSP_MEDIA')) {
          localStorage.setItem(
            '_fsp_front_app',
            this.auth.cookie('FSP_MEDIA')
          )
        }
        location.reload()
      }
    })
  }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
