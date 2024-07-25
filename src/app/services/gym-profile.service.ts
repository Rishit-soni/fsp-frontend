import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class GymProfileService {
  constructor(private http: HttpClient) {}

  url = environment.API.url

  saveStepOne(data) {
    return this.http.post<any>(this.url + 'gym-profile/basic-information', data)
  }

  getGymList(){
    return this.http.get<any>(this.url + 'gym-profile')
  }

  switchGym(id){
    return this.http.get<any>(this.url + 'gym-profile/switch-profile' + id)
  }

  getGymProfile(id){
    return this.http.get<any>(this.url + 'gym-profile/get-gym/'+id)
  }

  
  getGymProfileByUserId(){
    return this.http.get<any>(this.url + 'gym-profile/get-gym')
  }

  getGymProfileBySuperAdmin(id){
    return this.http.get<any>(this.url + 'gym-profile/get-gym-list/'+id)
  }

  updateGymProfile(data, id){
    return this.http.put<any>(this.url + 'gym-profile/'+id, data)
  }

  getLocality(pincode){
    return this.http.get<any>('https://api.postalpincode.in/pincode/'+ pincode)
  }
}
