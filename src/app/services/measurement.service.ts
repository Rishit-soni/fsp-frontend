import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  constructor(private http: HttpClient) {}

  url = environment.API.url

  getMeasurementsById(id) {
    return this.http.get<any>(this.url + 'measurement/'+ id)
  }

  addMeasurement(data) {
    return this.http.post<any>(this.url + 'measurement', data)
  }
}
