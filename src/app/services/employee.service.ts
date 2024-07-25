import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  url = environment.API.url;

  getEmployeeByMobileNo(mobile_no){
   return this.http.get<any>(this.url+ 'employee/get-employee/mobile_no/'+mobile_no)
  }

  addEmployee(data){
     return this.http.post<any>(this.url+ 'employee', data)
  }

  getEmployees(search){
    return this.http.get<any>(this.url+ 'employee/' + search)
  }

}