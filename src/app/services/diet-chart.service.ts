import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class DietChartService {
  constructor(private http: HttpClient) {}

  url = environment.API.url

  getDietPlans(search) {
    return this.http.get<any>(this.url + 'diet/' + search)
  }

  addDietPlan(data) {
    return this.http.post<any>(this.url + 'diet', data)
  }

  getDietPlanById(id){
    return this.http.get<any>(this.url + 'diet/get-diet/' + id)
  }

  getDietPlanByMemberId(id){
    return this.http.get<any>(this.url + 'diet/get-diet/member/' + id)
  }

  getDietPlansForModel() {
    return this.http.get<any>(this.url + 'diet/diet-model')
  }

  updateDietPlanById(data, id){
    return this.http.put<any>(this.url + 'diet/' + id, data)
  }
}
