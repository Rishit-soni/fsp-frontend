import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Subject } from 'rxjs'
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  public url = environment.API.url
  public loggedInUser = new Subject<object>()

  signup(data) {
    return this.http.post<any>(this.url + 'user/auth/register', data)
  }

  login(data) {
    return this.http.post<any>(this.url + 'user/auth/login', data)
  }

  cookie = (key) =>
    (new RegExp((key || '=') + '=(.*?); ', 'gm').exec(
      document.cookie + '; '
    ) || ['', null])[1]

  loggedIn() {
    return !!localStorage.getItem('_fsp_front_app')
  }

  getToken() {
    return localStorage.getItem('_fsp_front_app')
  }

  getMe() {
    this.http.get<any>(`${this.url}user/auth/me`).subscribe(
      (res) => {
        this.loggedInUser.next(res.data)
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login'])
            localStorage.removeItem('_fsp_front_app')
          }
        }
      }
    )
  }

  logout() {
    return this.http.get<any>(this.url + 'user/auth/logout')
  }

  getAllUsers(search) {
    return this.http.get<any>(this.url + 'user/auth/user-list/'+ search)
  }

  updateUserOTPStatus(id){
    return this.http.put<any>(this.url + 'user/auth/otp-status/'+ id, {})
  }

  updateUserStatus(status, id) {
    let data = { status: status }
    return this.http.put<any>(this.url + 'user/auth/status/' + id, data)
  }
}
