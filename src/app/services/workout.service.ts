import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) {}

  url = environment.API.url

  getWorkoutPlans(search) {
    return this.http.get<any>(this.url + 'workout/' + search)
  }

  getWorkoutPlansForModel() {
    return this.http.get<any>(this.url + 'workout/workout-model')
  }

  addWorkoutPlan(data) {
    return this.http.post<any>(this.url + 'workout', data)
  }

  getWorkoutPlanById(id) {
    return this.http.get<any>(this.url + 'workout/get-workout/' + id)
  }

  getWorkoutPlanByMemberId(id) {
    return this.http.get<any>(this.url + 'workout/get-workout/member/' + id)
  }


  updateWorkoutPlanById(data,id) {
    return this.http.put<any>(this.url + 'workout/' + id, data)
  }
}
