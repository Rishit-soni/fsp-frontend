import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from 'ngx-spinner'
import { WindowService } from 'src/app/services/window.service'
import * as firebase from 'firebase'
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-signup-step-three',
  templateUrl: './signup-step-three.component.html',
  styleUrls: ['./signup-step-three.component.scss'],
})
export class SignupStepThreeComponent implements OnInit {
  windowRef: any
  verificationCode: string = ''
  send_otp = false
  loading = true

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private win: WindowService
  ) {}

  model: any = {}
  user: any
  ngOnInit(): void {
    this.windowRef = this.win.windowRef
    this.auth.getMe()
    this.auth.loggedInUser.subscribe((res:any)=>{
      this.user = res.user
      this.model.mobile_no = res.user.mobile_no
    })
    this.spinner.show('captcha')
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        callback: (response) => {
          this.send_otp = true
        },
        'expired-callback': (response) => {
          this.send_otp = false
          this.windowRef.confirmationResult = ''
          this.verificationCode = ''
          document.getElementById('recaptcha-container').style.display =
            'hidden'
        },
      }
    )
    this.windowRef.recaptchaVerifier.render().then(() => {
      this.loading = false
      this.spinner.hide('captcha')
    })
  }

  sendLoginCode() {
    document.getElementById('recaptcha-container').style.display = 'none'
    const appVerifier = this.windowRef.recaptchaVerifier

    const num = `+91${this.model.mobile_no}`
    this.spinner.show('otp')
    firebase
      .auth()
      .signInWithPhoneNumber(num, appVerifier)
      .then((result) => {
        this.windowRef.confirmationResult = result
        this.spinner.hide('otp')
      })
      .catch((error) => {
        this.spinner.hide('otp')
        console.log(error)
      })
  }

  verifyLoginCode() {
    this.spinner.hide('otp')
    this.spinner.show('verify')
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then((result) => {
       this.auth.updateUserOTPStatus(this.user.id).subscribe((res)=>{
         if(res.success){
          this.spinner.hide('otp')
          this.spinner.hide('verify')
          this.toastr.success('OTP is verified successfully.')
          this.router.navigate(['/add-gym/basic-information'])
         }
       },err=>{
        this.spinner.hide('otp')
        this.spinner.hide('verify')
        this.toastr.error(err.error.message)
       })
      })
      .catch((error) => {
        this.spinner.hide('verify')
        this.toastr.error('Incorrect code entered?')
      })
  }
}
