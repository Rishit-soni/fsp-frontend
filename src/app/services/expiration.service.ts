import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ExpirationService {
  constructor(private http: HttpClient) {}

  url = environment.API.url

  getWorkoutExpiration(search) {
    return this.http.get<any>(this.url + 'expiration/workout/' + search)
  }

  getDietExpiration(search) {
    return this.http.get<any>(this.url + 'expiration/diet/' + search)
  }

  getMembershipPackageExpiration(search) {
    return this.http.get<any>(this.url + 'expiration/membership-package/' + search)
  }


}
