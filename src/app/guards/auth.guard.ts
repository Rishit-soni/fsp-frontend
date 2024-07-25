import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      return true
    } else {
      localStorage.removeItem('_fsp_front_app')
      console.log('not found')
      this.router.navigate(['/'])
      return false
    }
  }
}
