import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-step-two',
  templateUrl: './signup-step-two.component.html',
  styleUrls: ['./signup-step-two.component.scss'],
})
export class SignupStepTwoComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService, private spinner: NgxSpinnerService, private toastr: ToastrService) {}
  model: any = {}

  ngOnInit(): void {
    let step = JSON.parse(localStorage.getItem('user'))
    this.model = { ...this.model, ...step }
  }

  onSubmit() {
    this.spinner.show()
    this.auth.signup(this.model).subscribe(
      (response) => {
        this.spinner.hide()
        if (response.success) {
          if (this.auth.cookie('FSP_MEDIA')) {
            localStorage.setItem(
              '_fsp_front_app',
              this.auth.cookie('FSP_MEDIA')
            )
            localStorage.removeItem('user')
            this.router.navigate(['/create-account/step-3'])
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
