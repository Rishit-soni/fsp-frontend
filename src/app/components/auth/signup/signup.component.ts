import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  userRole: String = 'owner'

  changeRadio(event) {
    this.userRole = event.target.value
  }

  nextStep() {
    let user = { role: this.userRole }
    let item = JSON.stringify(user)
    localStorage.setItem('user', item)
    this.router.navigate(['/create-account/step-2'])
  }
}
