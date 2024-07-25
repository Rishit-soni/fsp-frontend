import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private http: HttpClient) { }

  url = environment.API.url;

  getMemberAttendance(search) {
    return this.http.get<any>(this.url + 'attendance/' + search);
  }

  addAttendance(data) {
    return this.http.post<any>(this.url + 'attendance', data);
  }

  updateAttendance(data, id) {
    return this.http.put<any>(this.url + 'attendance/' + id, data);
  }

  getAttendanceByMember(id, start, end) {
    return this.http.get<any>(
      this.url + `attendance/member/${start}_${end}/` + id
    );
  }

  getAttendanceByDate(date) {
    return this.http.get<any>(this.url + 'attendance/date/' + date);
  }

  getAttendancePdfByDate(date): any {
    return this.http.get(this.url + 'attendance/download/date/' + date,
      {
        responseType: 'blob',
        headers: new HttpHeaders().append("Content-Type", "application/json"),
      }
    );
  }

  getAttendancePdfByMember(id, start, end) {
    return this.http.get(
      this.url + `attendance/download/member/${start}_${end}/` + id,
      {
        responseType: 'blob',
        headers: new HttpHeaders().append("Content-Type", "application/json"),
      }
    );
  }
}
