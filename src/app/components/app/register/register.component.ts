import { Component, OnInit } from '@angular/core'
import { MemberService } from 'src/app/services/member.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private memberService: MemberService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  loading = true

  async ngOnInit() {
    this.loading = true
    setTimeout(() => {
      if (this.loading) {
        this.spinner.show()
      }
    }, 500)
    await this.getMembers('')
    localStorage.removeItem('_FSP_MEMBER_DATA')
    localStorage.removeItem('_FSP_MEMBERSHIP_DATA')
    localStorage.removeItem('_FSP_MEASUREMENT_DATA')
  }

  members_list = []

  savePath(){
    sessionStorage.setItem('url', location.pathname)
  }
  
  getMembers(search) {
    this.memberService.getMembers(search).subscribe(
      (response) => {
        this.loading = false
        this.spinner.hide()
        if (response.success) {
          this.members_list = response.data
          console.log(this.members_list)
        }
      },
      (err) => {
        this.loading = false
        this.spinner.hide()
        console.log(err)
        this.toastr.error(err.error.error)
      }
    )
  }

  search(e) {
    let text = e.target.value
    this.getMembers(text)
  }
}
