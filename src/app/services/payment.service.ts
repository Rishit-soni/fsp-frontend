import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  url = environment.API.url;

  getRecevingPayment(interval) {
    return this.http.get<any>(this.url + 'members/payment/' + interval);
  }

  getPendingPayment(interval) {
    return this.http.get<any>(this.url + 'members/pending-payment/' + interval);
  }
}
