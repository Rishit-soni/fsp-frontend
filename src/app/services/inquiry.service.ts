import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InquiryService {
  constructor(private http: HttpClient) {}

  url = environment.API.url;

  addInquiry(data) {
    return this.http.post<any>(this.url + 'inquiry', data);
  }

  getInquiry(search){
    return this.http.get<any>(this.url + 'inquiry/'+search);
  }


  getFollowUps(search){
    return this.http.get<any>(this.url + 'inquiry/follow-up/'+search);
  }
}
