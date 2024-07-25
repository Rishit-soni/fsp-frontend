import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  url = environment.API.url

  getExercise() {
    return this.http.get<any>(this.url + 'exercise')
  }

  addExercise(data) {
    return this.http.post<any>(this.url + 'exercise', data)
  }
}
