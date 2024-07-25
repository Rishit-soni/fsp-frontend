import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class MembershipPackageService {
  constructor(private http: HttpClient) {}

  url = environment.API.url

  getMembershipPackages(search) {
    return this.http.get<any>(this.url + 'membership/' + search)
  }

  addMembershipPackage(data) {
    return this.http.post<any>(this.url + 'membership/', data)
  }

  getMembershipPackageById(id) {
    return this.http.get<any>(this.url + 'membership/get-membership/' + id)
  }

  getMembershipPackagesForModel() {
    return this.http.get<any>(this.url + 'membership/membership-model')
  }

  updateMembershipPackageById(data, id) {
    return this.http.put<any>(this.url + 'membership/' + id, data)
  }
}
