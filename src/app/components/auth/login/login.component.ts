import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  model: any = {}
  ngOnInit(): void {
      let token = localStorage.getItem('_fsp_front_app')
      console.log('token',token)
     if (token == '' || token == null || token == undefined) {
       
     } 
     else{
      this.router.navigate(['/dashboard'])
     }
  }

  onSubmit() {
    this.spinner.show()
    this.auth.login(this.model).subscribe(
      (response) => {
        this.spinner.hide()
        if (response.success) {
          if (this.auth.cookie('FSP_MEDIA')) {
            localStorage.setItem(
              '_fsp_front_app',
              this.auth.cookie('FSP_MEDIA')
            )
            document.cookie =
              'FSP_MEDIA' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'

            this.router.navigate(['/dashboard'])
          } else {
            this.router.navigate(['/'])
          }
        }
      },
      (err) => {
        this.spinner.hide()
        this.toastr.error(err.error.error.message, 'Error')
      }
    )
  }
}
